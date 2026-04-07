import Joi from "joi";

export const createAttributeSchema = Joi.object({
  productId: Joi.string().required(),
  material: Joi.string().optional(),
  purity: Joi.string().optional(),
  weight: Joi.number().optional(),
  gemstoneType: Joi.string().optional(),
  gemstoneWeight: Joi.number().optional(),
  gemstoneColor: Joi.string().optional(),
  size: Joi.string().optional(),
});

export const updateAttributeSchema = Joi.object({
  material: Joi.string().optional(),
  purity: Joi.string().optional(),
  weight: Joi.number().optional(),
  gemstoneType: Joi.string().optional(),
  gemstoneWeight: Joi.number().optional(),
  gemstoneColor: Joi.string().optional(),
  size: Joi.string().optional(),
}).min(1).message("At least one field must be provided to update");
