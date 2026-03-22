const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// Send verification email
async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}

// Send email AFTER OTP is saved
OTPSchema.post("save", async function (doc) {
  console.log("New OTP document saved");

  if (doc) {
    await sendVerificationEmail(doc.email, doc.otp);
  }
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
