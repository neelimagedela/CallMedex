const { sendMail } = require("../../../config/mail");

const sendOtpEmail = async ({ to, otp, name }) => {
  try {
    await sendMail({
      to,
      subject: "CallMedex Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${name || "User"},</h2>
          <p>Your CallMedex verification OTP is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP will expire in ${
            process.env.OTP_EXPIRES_MINUTES || 5
          } minutes.</p>
          <p>If you did not request this, ignore this email.</p>
        </div>
      `,
      text: `Your CallMedex verification OTP is ${otp}.`,
    });

    console.log(`Email OTP sent successfully to ${to}`);
  } catch (error) {
    console.error("Brevo API OTP email failed:", error.response?.data || error.message);

    console.log(`\n--- [OTP FALLBACK - EMAIL SEND ERROR] ---`);
    console.log(`To: ${to} (${name || "User"})`);
    console.log(`OTP: ${otp}`);
    console.log(`----------------------------------------\n`);
  }
};

const sendPasswordResetOtp = async ({ to, name, otp }) => {
  try {
    await sendMail({
      to,
      subject: "CallMedex Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>
          <p>Hello ${name || "User"},</p>
          <p>Your OTP to reset your CallMedex password is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
      text: `Your CallMedex password reset OTP is ${otp}.`,
    });

    console.log(`Password reset OTP sent successfully to ${to}`);
  } catch (error) {
    console.error(
      "Brevo API password reset OTP failed:",
      error.response?.data || error.message
    );

    console.log(`\n--- [PASSWORD RESET OTP FALLBACK - EMAIL SEND ERROR] ---`);
    console.log(`To: ${to} (${name || "User"})`);
    console.log(`OTP: ${otp}`);
    console.log(`-----------------------------------------------------\n`);
  }
};

module.exports = {
  sendOtpEmail,
  sendPasswordResetOtp,
};