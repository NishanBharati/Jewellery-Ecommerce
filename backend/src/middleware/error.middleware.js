const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === "development";

  // Log error in development
  if (isDevelopment) {
    console.error("Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only expose stack trace in development
    ...(isDevelopment && { stack: err.stack }),
  });
};

export default errorHandler;