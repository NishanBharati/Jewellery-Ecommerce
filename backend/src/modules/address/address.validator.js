import Joi from "joi";

export const createAddressSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 2 characters',
  }),
  phone: Joi.string().regex(/^[0-9\-\+\s\(\)]+$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number format is invalid',
  }),
  state: Joi.string().min(2).required().messages({
    'string.empty': 'State is required',
  }),
  city: Joi.string().min(2).required().messages({
    'string.empty': 'City is required',
  }),
  area: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  isDefault: Joi.boolean().optional(),
});

export const updateAddressSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().regex(/^[0-9\-\+\s\(\)]+$/).optional(),
  state: Joi.string().min(2).optional(),
  city: Joi.string().min(2).optional(),
  area: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  isDefault: Joi.boolean().optional(),
}).min(1).message("At least one field must be provided to update");

export const setDefaultAddressSchema = Joi.object({}).unknown(true);