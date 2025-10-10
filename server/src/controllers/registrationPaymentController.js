import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

dotenv.config();

const { PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, BASE_URL } = process.env;

const formatAmount = (a) => Number(a).toFixed(2);

// Initiate registration payment
export const initiateRegistrationPayment = async (req, res) => {
  try {
    const { order_id, amount, currency = "LKR", first_name, last_name, email, phone, address } = req.body;

    if (!order_id || !amount) return res.status(400).json({ message: "Order ID and amount are required" });

    const normalizedAmount = formatAmount(amount);

    let customerData = {};
    let customerType = "visitor";

    if (req.user) {
      customerType = "member";
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      customerData = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: user.mobile,
        address: user.address,
      };
    } else {
      if (!first_name || !last_name || !email || !phone || !address)
        return res.status(400).json({ message: "All registration details are required" });

      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email format" });

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) return res.status(400).json({ message: "Phone number must be 10 digits" });

      customerData = { first_name, last_name, email, phone, address };
    }

    const order = new Order({
      order_id,
      customer: {
        type: customerType,
        userId: req.user?._id || null,
        firstName: customerData.first_name,
        lastName: customerData.last_name,
        email: customerData.email,
        mobile: customerData.phone,
        address: customerData.address,
        leo_Id: req.user?.leo_Id || null,
      },
      items: [
        {
          productId: "registration",
          name: "Leo Club Registration Fee",
          size: "N/A",
          color: "",
          quantity: 1,
          unitPrice: amount,
          totalPrice: amount,
        },
      ],
      payment: { amount: parseFloat(normalizedAmount), currency, status: "pending" },
    });

    await order.save();

    const payherePayload = {
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: `${process.env.FRONTEND_URL}/payment-success?order_id=${order_id}&name=${customerData.first_name}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      notify_url: `${BASE_URL}/api/registration/payhere-notify`,
      order_id,
      items: "Leo Club Registration Fee",
      amount: normalizedAmount,
      currency,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      city: "Colombo",
      country: "Sri Lanka",
      delivery_address: customerData.address,
      delivery_city: "Colombo",
      delivery_country: "Sri Lanka",
      custom_1: customerType,
      custom_2: req.user?._id || "visitor",
    };

    const merchantSecretMd5 = crypto.createHash("md5").update(PAYHERE_MERCHANT_SECRET || "").digest("hex").toUpperCase();

    payherePayload.hash = crypto
      .createHash("md5")
      .update(payherePayload.merchant_id + payherePayload.order_id + payherePayload.amount + payherePayload.currency + merchantSecretMd5)
      .digest("hex")
      .toUpperCase();

    await sendEmail(
      order.customer.email,
      "Leo Club Registration Successful",
      `<h2>Hi ${order.customer.firstName}!</h2>
       <p>Your registration request is under review by admin. You have successfully registered and your payment is confirmed.</p>
       <p>Thank you for joining Leo Club!</p>`
    );

    return res.json(payherePayload);
  } catch (err) {
    console.error("initiateRegistrationPayment error:", err);
    if (err.code === 11000) return res.status(409).json({ message: "Order ID already exists" });
    return res.status(500).json({ message: "Server error creating registration payment" });
  }
};


export const handleRegistrationNotification = async (req, res) => {
  try {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig, payment_id, payhere_reference } = req.body;

    const merchantSecretMd5 = crypto.createHash("md5").update(PAYHERE_MERCHANT_SECRET || "").digest("hex").toUpperCase();

    const localMd5 = crypto
      .createHash("md5")
      .update(String(merchant_id) + String(order_id) + String(payhere_amount) + String(payhere_currency) + String(status_code) + merchantSecretMd5)
      .digest("hex")
      .toUpperCase();

    if (localMd5 !== String(md5sig).toUpperCase()) return res.sendStatus(200);

    const order = await Order.findOne({ order_id });
    if (!order) return res.sendStatus(200);

    if (Number(status_code) === 2) {
      order.payment.status = "completed";
      order.orderStatus = "confirmed";
    } else if (Number(status_code) === 0) {
      order.payment.status = "pending";
      order.orderStatus = "processing";
    } else {
      order.payment.status = "failed";
      order.orderStatus = "cancelled";
    }

    order.payment.paymentId = payment_id;
    order.payment.transactionId = payhere_reference;

    await order.save();
    return res.sendStatus(200);
  } catch (err) {
    console.error("handleRegistrationNotification error:", err);
    return res.sendStatus(200);
  }
};


export const getRegistrationPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ order_id: orderId });
    if (!order) return res.status(404).json({ message: "Registration order not found" });

    if (req.user && order.customer.userId && order.customer.userId.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    res.json({
      success: true,
      order: {
        order_id: order.order_id,
        payment_status: order.payment.status,
        order_status: order.orderStatus,
        amount: order.payment.amount,
        customer_type: order.customer.type,
        created_date: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching registration payment status:", error);
    res.status(500).json({ message: "Error fetching registration payment status" });
  }
};
