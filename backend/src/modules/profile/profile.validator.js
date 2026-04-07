import Joi from "joi";

export const updateProfileSchema = Joi.object({
  phone: Joi.string().optional(),
  avatar: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").optional(),
}).min(1).message("At least one field must be provided to update");

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
    "any.only": "Passwords do not match"
  })
});


