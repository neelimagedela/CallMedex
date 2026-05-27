const transporter = require("../../../config/mail");

const sendOtpEmail = async ({ to, otp, name }) => {
  const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER;

  if (!isSmtpConfigured) {
    console.log(`\n--- [LOCAL DEVELOPMENT OTP FALLBACK] ---`);
    console.log(`To: ${to} (${name})`);
    console.log(`OTP: ${otp}`);
    console.log(`-----------------------------------------\n`);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: "CallMedex Email Verification OTP",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your CallMedex verification OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in ${process.env.OTP_EXPIRES_MINUTES || 5} minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error("SMTP sending failed, falling back to console log:", error);
    console.log(`\n--- [LOCAL DEVELOPMENT OTP FALLBACK (SMTP ERROR)] ---`);
    console.log(`To: ${to} (${name})`);
    console.log(`OTP: ${otp}`);
    console.log(`------------------------------------------------------\n`);
  }
};

module.exports = {
  sendOtpEmail,
};