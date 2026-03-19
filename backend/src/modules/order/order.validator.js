import Joi from "joi";

const orderItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

export const createOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
  paymentMethod: Joi.string().optional(),
  paymentStatus: Joi.string().optional(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid("PENDING", "CONFIRMED", "DELIVERED", "CANCELLED").required(),
});
