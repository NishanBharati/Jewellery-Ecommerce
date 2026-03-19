import prisma from "../config/db.js";
import {
  generateOtp,
  hashOtp,
  hashPassword,
  comparePassword,
  verifyOtp,
  hashRefreshToken,
  generateRefreshTokenExpiry,
} from "../utils/auth.helpers.js";
import { generateTokens } from "../utils/jwt.js";
import {
  SendEmailVerificationCode,
  SendPasswordResetEmail,
} from "../utils/mailer.js";

// ===================== SIGNUP =====================
export const signupService = async (data) => {
  const { fullName, email, password } = data;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(password);

  const otp = generateOtp();
  const hashedOtp = await hashOtp(otp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiry,
    },
  });

  await SendEmailVerificationCode(email, otp);

  return {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    isVerified: newUser.isVerified
  }
};

// ===================== LOGIN =====================
export const loginService = async ({ email, password }) => 
  {
  const user = await prisma.user.findUnique({
     where: { email }
     });

  // Generic error message to prevent user enumeration attacks
  if (!user) throw new Error("Invalid email or password");

  if (!user.isVerified)
    throw new Error("Please verify your email before logging in");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");  // Same generic message

  const tokens = generateTokens(user);

  // Hash and store refresh token in database
  const hashedRefreshToken = await hashRefreshToken(tokens.refreshToken);
  const refreshTokenExpiry = generateRefreshTokenExpiry();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken: hashedRefreshToken,
      refreshTokenExpiry,
    },
  });

  return { user, tokens };
};

// ===================== VERIFY EMAIL =====================
export const verifyEmailService = async ({ email, otp }) => {
  const user = await prisma.user.findUnique({ 
    where: { email } 
  });
  if (!user) throw new Error("User not found");

  if (user.isVerified) throw new Error("Email already verified");

  if (!user.otp || user.otpExpiry < new Date()) throw new Error("OTP expired");

  const isValid = await verifyOtp(otp, user.otp);

  if (!isValid) throw new Error("Invalid OTP");

  const tokens = generateTokens(user);

  // Hash and store refresh token in database
  const hashedRefreshToken = await hashRefreshToken(tokens.refreshToken);
  const refreshTokenExpiry = generateRefreshTokenExpiry();

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      otp: null,
      otpExpiry: null,
      refreshToken: hashedRefreshToken,
      refreshTokenExpiry,
    },
  });

  return { user: updatedUser, tokens };
};

// ===================== RESEND OTP =====================
export const resendOtpService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");
  if (user.isVerified) throw new Error("Email already verified");

  const otp = generateOtp();
  const hashedOtp = await hashOtp(otp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: { otp: hashedOtp, otpExpiry },
  });

  await SendEmailVerificationCode(email, otp);
};

// ===================== FORGOT PASSWORD =====================
export const forgotPasswordService = async (email) => {
  const user = await prisma.user.findUnique({
     where: { email }
     });
  if (!user) throw new Error("User not found");

  const otp = generateOtp();
  const hashedOtp = await hashOtp(otp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: { resetToken: hashedOtp, resetTokenExpiry: otpExpiry },
  });

  await SendPasswordResetEmail(email, otp);
};

// ===================== RESET PASSWORD =====================
export const resetPasswordService = async ({ email, otp, newPassword }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  if (!user.resetToken || user.resetTokenExpiry < new Date())
    throw new Error("OTP expired");

  const isValid = await verifyOtp(otp, user.resetToken);
  if (!isValid) throw new Error("Invalid OTP");

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
};
