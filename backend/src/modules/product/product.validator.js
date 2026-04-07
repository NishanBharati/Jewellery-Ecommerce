import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name must be at least 2 characters',
  }),
  slug: Joi.string().optional(),
  description: Joi.string().min(10).required().messages({
    'string.empty': 'Product description is required',
    'string.min': 'Description must be at least 10 characters',
  }),
  price: Joi.number().min(1).required().messages({
    'number.min': 'Price must be greater than 0',
    'number.base': 'Price must be a valid number',
  }),
  categoryId: Joi.string().uuid().required().messages({
    'string.empty': 'Category ID is required',
  }),
  brand: Joi.string().optional(),
  stock: Joi.number().min(0).required().messages({
    'number.min': 'Stock cannot be negative',
    'number.base': 'Stock must be a valid number',
  }),
  isFeatured: Joi.boolean().optional(),
  images: Joi.forbidden().optional(), // Images handled by file upload middleware
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  slug: Joi.string().optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().min(1).optional(),
  categoryId: Joi.string().uuid().optional(),
  brand: Joi.string().optional(),
  stock: Joi.number().min(0).optional(),
  isFeatured: Joi.boolean().optional(),
}).min(1).message("At least one field must be provided to update");

export const paginationSchema = Joi.object({
  page: Joi.number().min(1).optional().messages({
    'number.min': 'Page must be greater than 0',
  }),
  limit: Joi.number().min(1).max(100).optional().messages({
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 100',
  }),
  keyword: Joi.string().optional(),
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  isFeatured: Joi.boolean().optional(),
  inStock: Joi.boolean().optional(),
});

export const searchProductSchema = Joi.object({
  keyword: Joi.string().optional(),
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  isFeatured: Joi.boolean().optional(),
  inStock: Joi.boolean().optional(),
  sort: Joi.string().valid('price_asc', 'price_desc', 'rating', 'newest').optional(),
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
});
