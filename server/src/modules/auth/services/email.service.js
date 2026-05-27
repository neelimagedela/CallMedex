const transporter = require("../../../config/mail");

const sendOtpEmail = async ({ to, otp, name }) => {
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
};

module.exports = {
  sendOtpEmail,
};