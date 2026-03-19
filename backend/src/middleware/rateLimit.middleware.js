import rateLimit from "express-rate-limit";

// Login-specific rate limiter
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: {
    success: false,
    message: "Too many login attempts. Try again in 15 minutes."
  },
});

// Global rate limiter (general API protection)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
});