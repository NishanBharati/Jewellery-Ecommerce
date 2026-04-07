import Joi from "joi";

export const createReviewSchema = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  comment: Joi.string().optional(),
}).min(1);

export const reviewSchema = createReviewSchema;

export const deleteReviewSchema = Joi.object({
  id: Joi.string().required(),
});