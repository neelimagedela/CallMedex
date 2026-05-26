const crypto = require("crypto");

const generateOtp = () => {

    return crypto
        .randomInt(100000, 999999)
        .toString();
};

const sendEmailOtp = async(email, otp) => {

    console.log(
        `Email OTP for ${email}: ${otp}`
    );
};

const sendPhoneOtp = async(phone, otp) => {

    console.log(
        `Phone OTP for ${phone}: ${otp}`
    );
};

const hashOtp = async(otp) => {
    return bcrypt.hash(otp, 10);
};

const compareOtp = async(otp, hash) => {
    return bcrypt.compare(otp, hash);
};

module.exports = {
    generateOtp,
    sendEmailOtp,
    sendPhoneOtp,
    hashOtp,
    compareOtp
};