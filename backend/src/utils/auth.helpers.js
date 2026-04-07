import bcrypt from "bcrypt";

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const generateOtpExpiry = () =>
  new Date(Date.now() + 10 * 60 * 1000);

export const generateRefreshTokenExpiry = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const hashOtp = async (otp) =>
  await bcrypt.hash(otp, 10);

export const hashRefreshToken = async (token) =>
  await bcrypt.hash(token, 10);

export const verifyOtp = async (enteredOtp, hashedOtp) =>
  await bcrypt.compare(enteredOtp, hashedOtp);

export const hashPassword = async (password) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (plainPassword, hashedPassword) =>
  await bcrypt.compare(plainPassword, hashedPassword);