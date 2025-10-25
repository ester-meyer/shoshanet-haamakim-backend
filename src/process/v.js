const cron = require('node-cron');
const cloudinary = require('cloudinary').v2;
const { sendMail } = require('../utils/sendEmail');

cloudinary.config({
  secure: true,
});

async function checkCloudinaryUsage() {
  try {
    const usage = await cloudinary.api.usage();
    const percent = usage.credits.used_percent;

    console.warn('Cloudinary usage:', percent, '%');

    if (percent >= 80) {
      await sendMail(
        {
          body: {
            formName: 'מערכת אוטומטית',
            message: `השימוש ב-Cloudinary הגיע ל-${percent}%.`,
            fromEmail: process.env.EMAIL_USER,
          },
        },
        {
          status: () => ({
            code: 200,
            message: 'Email sent successfully',
          }),
        },
      );
    }
  } catch (err) {
    console.error('שגיאה בבדיקת Cloudinary:', err.message);
  }
}

// להריץ ב-15:00 ביום הראשון של כל חודש
cron.schedule('0 15 1 * *', checkCloudinaryUsage);