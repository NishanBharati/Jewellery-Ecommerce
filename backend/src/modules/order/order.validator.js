import Joi from "joi";

export const createOrderSchema = Joi.object({
  paymentMethod: Joi.string().valid("CASH", "CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "KHALTI").optional(),
  addressId: Joi.string().uuid().optional(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("PENDING", "CONFIRMED", "DELIVERED", "CANCELLED")
    .required()
    .messages({
      "string.only": "Status must be one of PENDING, CONFIRMED, DELIVERED, or CANCELLED"
    }),
});
