import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import {
  signupService,
  loginService,
  verifyEmailService,
  resendOtpService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";
import { generateTokens } from "../utils/jwt.js";
import {
  hashRefreshToken,
  generateRefreshTokenExpiry,
} from "../utils/auth.helpers.js";


// ===================== SIGNUP =====================
export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await signupService({ fullName, email, password });

    return res.status(201).json({
      message: "User created. Please verify your email.",
      user,
    });

  } catch (error) {
    next(error);
  }
};


// ===================== LOGIN =====================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      accessToken: result.tokens.accessToken,
      refreshToken: result.tokens.refreshToken,
    });

  } catch (error) {
    next(error);
  }
};


// ===================== VERIFY EMAIL =====================
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyEmailService({ email, otp });

    return res.status(200).json({
      message: "Email verified successfully",
      user: result.user,
      accessToken: result.tokens.accessToken,
      refreshToken: result.tokens.refreshToken,
    });

  } catch (error) {
    next(error);
  }
};


// ===================== RESEND OTP =====================
export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    await resendOtpService(email);

    return res.status(200).json({
      message: "OTP resent successfully",
    });

  } catch (error) {
    next(error);
  }
};


// ===================== FORGOT PASSWORD =====================
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    await forgotPasswordService(email);

    return res.status(200).json({
      message: "Password reset OTP sent to your email",
    });

  } catch (error) {
    next(error);
  }
};


// ===================== RESET PASSWORD =====================
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    await resetPasswordService({ email, otp, newPassword });

    return res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {
    next(error);
  }
};


// ===================== REFRESH TOKEN =====================
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // 1. Verify JWT signature
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // 2. Find user with current role
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        role: true,
        refreshToken: true,
        refreshTokenExpiry: true,
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // 3. Check if user has a refresh token stored
    if (!user.refreshToken) {
      const error = new Error("Refresh token not found");
      error.statusCode = 403;
      throw error;
    }

    // 4. Check expiry
    if (user.refreshTokenExpiry < new Date()) {
      const error = new Error("Refresh token expired");
      error.statusCode = 403;
      throw error;
    }

    // 5. Verify the token matches stored hash
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 403;
      throw error;
    }

    // 6. Generate new tokens (token rotation)
    const tokens = generateTokens(user);

    // 7. Store new refresh token in database
    const hashedRefreshToken = await hashRefreshToken(tokens.refreshToken);
    const refreshTokenExpiry = generateRefreshTokenExpiry();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
        refreshTokenExpiry,
      },
    });

    // 8. Return new tokens
    return res.status(200).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

  } catch (error) {
    next(error);
  }
};


// ===================== LOGOUT =====================
export const logout = async (req, res, next) => {
  try {
    const userId = req.user.id; // From auth middleware

    // Clear refresh token from database
    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
        refreshTokenExpiry: null,
      },
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};