import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().optional(),
  description: Joi.string().required(),
  price: Joi.number().min(1).required(),
  category: Joi.string().required(),
  brand: Joi.string().optional(),
  stock: Joi.number().min(0).required(),
  isFeatured: Joi.boolean().default(false),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().min(1).optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  stock: Joi.number().min(0).optional(),
  isFeatured: Joi.boolean().optional(),
}).min(1).message("At least one field must be provided to update");
