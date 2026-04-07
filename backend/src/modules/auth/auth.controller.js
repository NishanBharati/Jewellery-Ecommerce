import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../config/db.js";
import {
  signupService,
  loginService,
  verifyEmailService,
  resendOtpService,
  forgotPasswordService,
  resetPasswordService,
} from "./auth.service.js";
import { generateTokens } from "../../utils/jwt.js";
import {
  hashRefreshToken,
  generateRefreshTokenExpiry,
} from "../../utils/auth.helpers.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await signupService({ fullName, email, password });

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User created. Please verify your email.",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });

  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyEmailService({ email, otp });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Email verified successfully",
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });

  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    await resendOtpService(email);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "OTP resent successfully",
    });

  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    await forgotPasswordService(email);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Password reset OTP sent to your email",
    });

  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    await resetPasswordService({ email, otp, newPassword });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Password reset successful",
    });

  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

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

    if (!user.refreshToken) {
      const error = new Error("Refresh token not found");
      error.statusCode = 403;
      throw error;
    }

    if (user.refreshTokenExpiry < new Date()) {
      const error = new Error("Refresh token expired");
      error.statusCode = 403;
      throw error;
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 403;
      throw error;
    }

    const tokens = generateTokens(user);

    const hashedRefreshToken = await hashRefreshToken(tokens.refreshToken);
    const refreshTokenExpiry = generateRefreshTokenExpiry();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
        refreshTokenExpiry,
      },
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Token refreshed successfully",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user.id; 

    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
        refreshTokenExpiry: null,
      },
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};