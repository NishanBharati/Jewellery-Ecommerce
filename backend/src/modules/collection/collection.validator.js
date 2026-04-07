import Joi from "joi";

export const createCollectionSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
});

export const updateCollectionSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
}).min(1).message("At least one field must be provided to update");

export const addProductToCollectionSchema = Joi.object({
  collectionId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const removeProductFromCollectionSchema = Joi.object({
  collectionId: Joi.string().required(),
  productId: Joi.string().required(),
});