import express from "express";
import * as controller from "./blog.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import { createBlogSchema, updateBlogSchema } from "./blog.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog & content management APIs
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Blogs fetched
 */
router.get("/", controller.getBlogs);

/**
 * @swagger
 * /blogs/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     tags: [Blog]
 */
router.get("/:slug", controller.getBlogBySlug);

/**
 * @swagger
 * /blogs/admin/all:
 *   get:
 *     summary: Get all blogs (Admin)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 */
router.get("/admin/all", authMiddleware, roleMiddleware("ADMIN"), controller.getAllBlogsAdmin);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create blog (Admin)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  upload.array("images", 5),
  validate(createBlogSchema),
  controller.createBlog
);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update blog (Admin)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  upload.array("images", 5),
  validate(updateBlogSchema),
  controller.updateBlog
);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete blog (Admin)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.deleteBlog
);

export default router;