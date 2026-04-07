import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const SendEmailVerificationCode = async (email, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: `"Jewellery Store" <${process.env.EMAIL_USER}>`, 
      to: email, 
      subject: "Verify your email", 
      text: `Your verification code is: ${verificationCode}`, 
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`, 
    });
    console.log("Email Send Successfully", info);
    return info;
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
};

export const SendPasswordResetEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h3>Password Reset</h3>
      <p>Your reset OTP is:</p>
      <h2>${otp}</h2>
      <p>This OTP expires in 10 minutes.</p>
    `,
  });
};