import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Category name is required',
    'string.min': 'Category name must be at least 2 characters',
    'string.max': 'Category name cannot exceed 50 characters',
  }),
  slug: Joi.string().optional(),
}).unknown(true);

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Category name is required',
    'string.min': 'Category name must be at least 2 characters',
    'string.max': 'Category name cannot exceed 50 characters',
  }),
  slug: Joi.string().optional(),
}).min(1).message("At least one field must be provided to update").unknown(true);

export const paginationSchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  search: Joi.string().optional(),
}).unknown(true);