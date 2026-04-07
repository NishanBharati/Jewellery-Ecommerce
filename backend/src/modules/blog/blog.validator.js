import Joi from "joi";

export const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().optional(),
  content: Joi.string().required(),
  excerpt: Joi.string().optional(),
  isPublished: Joi.boolean().optional(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().optional(),
  slug: Joi.string().optional(),
  content: Joi.string().optional(),
  excerpt: Joi.string().optional(),
  isPublished: Joi.boolean().optional(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
}).min(1);