import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

export const handlePayHereNotification = async (req, res) => {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
    custom_1, // email
    custom_2, // first name
  } = req.body;

  const merchantSecret = 'YOUR_MERCHANT_SECRET'; //  Replace with your actual secret

  const localMd5 = crypto.createHash('md5')
    .update(
      merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      crypto.createHash('md5').update(merchantSecret).digest('hex')
    )
    .digest('hex')
    .toUpperCase();

  if (localMd5 === md5sig && status_code === '2') {
    console.log("✅ Payment successful for order:", order_id);

    // 📧 Send confirmation email to user
    const emailBody = `
      <h3>Hello ${custom_2},</h3>
      <p>Your registration for Leo Club membership was <strong>successful</strong>.</p>
      <p>Your application is now under review by the admin.</p>
      <br />
      <p>Thank you!</p>
    `;

    try {
      await sendEmail(custom_1, 'Leo Club Registration - Under Review', emailBody);
      console.log('📨 Confirmation email sent to', custom_1);
    } catch (err) {
      console.error('❌ Failed to send email:', err);
    }

    // Optionally update MongoDB payment status here
  } else {
    console.log("❌ Invalid signature or payment failed.");
  }

  res.sendStatus(200); // PayHere requires 200 OK
};


