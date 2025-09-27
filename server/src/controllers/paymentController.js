import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

dotenv.config();

const { PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, BASE_URL } = process.env;

// helper: ensure 2-decimal amount string
const formatAmount = (a) => Number(a).toFixed(2);

// Generate PayHere payload + hash with role-based customer handling
export const initiatePayHerePayment = async (req, res) => {
  try {
    const {
      order_id,
      amount,
      currency = "LKR",
      // Product/Cart details
      items,
      cart,
      productId,
      productName,
      size,
      color,
      quantity,
      unitPrice,
      totalAmount,
      // Customer details (for visitors)
      first_name,
      last_name,
      email,
      phone,
      address
    } = req.body;

    if (!order_id || !amount) {
      return res.status(400).json({ message: "Order ID and amount are required" });
    }

    const normalizedAmount = formatAmount(amount);

    let customerData = {};
    let customerType = 'visitor';
    let orderItems = [];

    // Check if user is authenticated (member)
    if (req.user) {
      // User is authenticated - member checkout
      customerType = 'member';
      
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      customerData = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: user.mobile,
        address: user.address
      };

      console.log(`Member checkout: ${user.email} (${user.leo_Id || user.admin_id})`);
    } else {
      // User is not authenticated - visitor checkout
      if (!first_name || !last_name || !email || !phone || !address) {
        return res.status(400).json({ message: "All customer details are required for visitor checkout" });
      }

      // Validate email format
      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Validate mobile number
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
      }

      customerData = {
        first_name,
        last_name,
        email,
        phone,
        address
      };

      console.log(`Visitor checkout: ${email}`);
    }

    // Process order items
    if (cart && Array.isArray(cart)) {
      // Cart checkout
      orderItems = cart.map(item => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        color: item.color || '',
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      }));
    } else if (productId && productName) {
      // Single product checkout
      orderItems = [{
        productId,
        name: productName,
        size,
        color: color || '',
        quantity: quantity || 1,
        unitPrice: unitPrice || amount,
        totalPrice: totalAmount || amount
      }];
    } else {
      // Default items description
      orderItems = [{ 
        productId: 'general',
        name: items || "Leo Club Products",
        size: 'N/A',
        color: '',
        quantity: 1,
        unitPrice: amount,
        totalPrice: amount
      }];
    }

    // Create order in database
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
        leo_Id: req.user?.leo_Id || null
      },
      items: orderItems,
      payment: {
        amount: parseFloat(normalizedAmount),
        currency,
        status: 'pending'
      }
    });

    await order.save();

    // Create items summary for PayHere
    const itemsSummary = orderItems.map(item => 
      `${item.name}${item.size !== 'N/A' ? ` (${item.size})` : ''}${item.color ? `, ${item.color}` : ""} x${item.quantity}`
    ).join(", ");

    const payherePayload = {
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: `${process.env.FRONTEND_URL}/order-success?order_id=${order_id}&name=${customerData.first_name}&amount=${normalizedAmount}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      notify_url: `${BASE_URL}/api/payment/payhere-notify`,
      order_id,
      items: itemsSummary,
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
      custom_1: customerType, // Store customer type for reference
      custom_2: req.user?._id || 'visitor'
    };

    // MD5 signature per PayHere docs
    const merchantSecretMd5 = crypto
      .createHash("md5")
      .update(PAYHERE_MERCHANT_SECRET || "")
      .digest("hex")
      .toUpperCase();

    const md5sig = crypto
      .createHash("md5")
      .update(
        payherePayload.merchant_id +
          payherePayload.order_id +
          payherePayload.amount +
          payherePayload.currency +
          merchantSecretMd5
      )
      .digest("hex")
      .toUpperCase();

    payherePayload.hash = md5sig;
     await sendEmail(
        order.customer.email,
        "Leo Club Registration Successful",
        `<h2>Hi ${order.customer.firstName}!</h2>
         <p>Your registration request is under review by admin. You have successfully registered and your payment is confirmed.</p>
         <p>Thank you for joining Leo Club!</p>`
      );

    console.log(`Payment initialized for order: ${order_id}, Customer type: ${customerType}, Amount: ${normalizedAmount}`);

    return res.json(payherePayload);

  } catch (err) {
    console.error("initiatePayHerePayment error:", err);
    
    // Handle duplicate order ID
    if (err.code === 11000) {
      return res.status(409).json({ message: "Order ID already exists" });
    }

    return res.status(500).json({ message: "Server error creating payment" });
  }
};

// Handle PayHere IPN callback
export const handlePayHereNotification = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      custom_1, // customer type
      custom_2, // user ID or 'visitor'
      payment_id,
      payhere_reference
    } = req.body;

    console.log("PayHere notification received:", { order_id, status_code, custom_1 });

    const merchantSecretMd5 = crypto
      .createHash("md5")
      .update(PAYHERE_MERCHANT_SECRET || "")
      .digest("hex")
      .toUpperCase();

    const localMd5 = crypto
      .createHash("md5")
      .update(
        String(merchant_id || "") +
          String(order_id || "") +
          String(payhere_amount || "") +
          String(payhere_currency || "") +
          String(status_code || "") +
          merchantSecretMd5
      )
      .digest("hex")
      .toUpperCase();

    if (localMd5 !== String(md5sig).toUpperCase()) {
      console.log(`❌ Invalid signature for order ${order_id}`);
      return res.sendStatus(200);
    }

    // Find and update the order
    const order = await Order.findOne({ order_id });
    if (!order) {
      console.error("Order not found:", order_id);
      return res.sendStatus(200);
    }

    // Update order based on payment status
    let paymentStatus = 'pending';
    let orderStatus = 'processing';

    if (Number(status_code) === 2) {
      // Payment successful
      paymentStatus = 'completed';
      orderStatus = 'confirmed';
      console.log(`✅ Payment successful for order ${order_id}`);
    } else if (Number(status_code) === 0) {
      // Payment pending
      paymentStatus = 'pending';
      orderStatus = 'processing';
      console.log(`⏳ Payment pending for order ${order_id}`);
    } else {
      // Payment failed or cancelled
      paymentStatus = 'failed';
      orderStatus = 'cancelled';
      console.log(`❌ Payment failed for order ${order_id}, status code: ${status_code}`);
    }

    // Update order
    order.payment.status = paymentStatus;
    order.payment.paymentId = payment_id;
    order.payment.transactionId = payhere_reference;
    order.orderStatus = orderStatus;
    
    await order.save();

    console.log(`Order ${order_id} updated: Payment ${paymentStatus}, Order ${orderStatus}`);

    // For successful payments, you could send confirmation emails here
    if (Number(status_code) === 2) {
      console.log(`Payment successful for ${custom_1}: ${order.customer.email}`);
      // TODO: Send confirmation email to customer
      // TODO: Notify admin of new order
    }

    // PayHere requires 200 OK always
    return res.sendStatus(200);
  } catch (err) {
    console.error("handlePayHereNotification error:", err);
    return res.sendStatus(200);
  }
};

// Get payment status for an order
export const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ order_id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user has permission to view this order
    if (req.user && order.customer.userId) {
      if (order.customer.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.json({
      success: true,
      order: {
        order_id: order.order_id,
        payment_status: order.payment.status,
        order_status: order.orderStatus,
        amount: order.payment.amount,
        customer_type: order.customer.type,
        created_date: order.createdAt
      }
    });

  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ message: "Error fetching payment status" });
  }
};