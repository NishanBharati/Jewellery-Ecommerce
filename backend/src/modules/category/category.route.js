import express from "express";
import * as categoryController from "./category.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./category.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 */
router.post("/", authMiddleware, roleMiddleware("ADMIN"), validate(createCategorySchema), categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 */
router.get("/", categoryController.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 */
router.get("/:id", categoryController.getCategory);

/**
 * @swagger
 * /categories/slug/{slug}:
 *   get:
 *     summary: Get products by category slug
 *     tags: [Categories]
 */
router.get("/slug/:slug", categoryController.getProductsByCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), validate(updateCategorySchema), categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), categoryController.deleteCategory);

export default router;