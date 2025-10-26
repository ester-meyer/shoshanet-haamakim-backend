const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;

const sendMail = async (req, res) => {
  const { name, message, email, phone } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email not provided' });
  }

  try {
    // מייל אליך
    await sgMail.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `הודעה מ${name}, מהאתר שושנת העמקים`,
      html: `
        <p style="direction: rtl; text-align: right;">${message}</p>
        <p style="direction: rtl; text-align: right;">אפשר להשיב לכתובת: <a href="mailto:${email}">${email}</a></p>
        <p style="direction: rtl; text-align: right;">מספר טלפון: ${phone}</p>
      `,
    });

    // מייל חזרה ללקוח
    await sgMail.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'תודה על פנייתך לשושנת העמקים',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; direction: rtl; text-align: right;">
          <p>הי ${name}!</p>
          <p>תודה על פנייתך.</p>
          <p>ניצור איתך קשר בהקדם האפשרי.</p>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
          <a href="${process.env.FRONTEND_URL}" style="font-size:0.9em; color:#777;">בקרו באתר שלנו</a>
        </div>`,
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error('Error in sendMail:', err);
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
};

module.exports = { sendMail };
