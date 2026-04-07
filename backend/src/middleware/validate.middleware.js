const validate = (schema) => {
  return (req, res, next) => {

    const result = schema.validate(req.body, {
      abortEarly: false,
      messages: {
        'string.required': '{#label} is required and must be a string',
        'number.required': '{#label} is required and must be a number',
        'number.min': '{#label} must be at least {#limit}',
        'number.max': '{#label} must not exceed {#limit}',
        'string.min': '{#label} must be at least {#limit} characters long',
        'string.max': '{#label} must not exceed {#limit} characters',
        'object.min': 'At least one field must be provided',
      },
    });

    if (result.error) {
      const errors = result.error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Validation error",
        errors,
      });
    }

    next();
  };
};

// Pagination validator for query parameters
export const validatePagination = (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  // Validation
  if (page < 1) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation error",
      errors: [{ field: "page", message: "Page must be greater than 0" }],
    });
  }

  if (limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation error",
      errors: [{ field: "limit", message: "Limit must be between 1 and 100" }],
    });
  }

  // Attach validated values to request
  req.pagination = { page, limit };
  next();
};

export default validate;