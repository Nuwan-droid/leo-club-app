import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const { PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, BASE_URL } = process.env;

// helper: ensure 2-decimal amount string
const formatAmount = (a) => Number(a).toFixed(2);

// Generate PayHere payload + hash
export const initiatePayHerePayment = async (req, res) => {
  try {
    const { order_id, first_name, last_name, email, phone, address, amount } = req.body;

    if (!order_id || !first_name || !email || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const normalizedAmount = formatAmount(amount);

    const payherePayload = {
      merchant_id: PAYHERE_MERCHANT_ID,                               // << your sandbox ID
      return_url: `${BASE_URL}/payment-success`,
      cancel_url: `${BASE_URL}/`,
      notify_url: `${BASE_URL}/api/payment/payhere-notify`,
      order_id,
      items: "Leo Club Membership",
      amount: normalizedAmount,
      currency: "LKR",
      first_name,
      last_name: last_name || "",
      email,
      phone: phone || "",
      address: address || "",
      city: "Colombo",
      country: "Sri Lanka",
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

    return res.json(payherePayload);
  } catch (err) {
    console.error("initiatePayHerePayment error:", err);
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
    } = req.body;

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

    if (localMd5 === String(md5sig).toUpperCase() && Number(status_code) === 2) {
      console.log(`✅ Payment successful for order ${order_id}`);
      // TODO: update DB, mark membership as paid, send email, etc.
    } else {
      console.log(`❌ Invalid signature or payment failed for order ${order_id}`);
    }

    // PayHere requires 200 OK always
    return res.sendStatus(200);
  } catch (err) {
    console.error("handlePayHereNotification error:", err);
    return res.sendStatus(200);
  }
};
