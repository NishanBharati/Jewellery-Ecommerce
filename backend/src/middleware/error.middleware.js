const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    console.error("Error:", err);
  }

  // Standardized error response structure
  const errorResponse = {
    success: false,
    statusCode: statusCode,
    message: err.message || "Internal Server Error",
    ...(isDevelopment && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;