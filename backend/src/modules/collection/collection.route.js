import express from "express";
import * as controller from "./collection.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createCollectionSchema,
  updateCollectionSchema,
  addProductToCollectionSchema,
  removeProductFromCollectionSchema,
} from "./collection.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Product collections APIs
 */

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get collections
 *     tags: [Collections]
 */
router.get("/", controller.getCollections);

/**
 * @swagger
 * /collections/{slug}:
 *   get:
 *     summary: Get collection by slug
 *     tags: [Collections]
 */
router.get("/:slug", controller.getCollectionBySlug);

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create collection (Admin)
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, roleMiddleware("ADMIN"), validate(createCollectionSchema), controller.createCollection);

/**
 * @swagger
 * /collections/add-product:
 *   post:
 *     summary: Add product to collection (Admin)
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 */
router.post("/add-product", authMiddleware, roleMiddleware("ADMIN"), validate(addProductToCollectionSchema), controller.addProduct);

/**
 * @swagger
 * /collections/remove-product:
 *   post:
 *     summary: Remove product from collection (Admin)
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 */
router.post("/remove-product", authMiddleware, roleMiddleware("ADMIN"), validate(removeProductFromCollectionSchema), controller.removeProduct);

/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Delete collection (Admin)
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), controller.deleteCollection);

/**
 * @swagger
 * /collections/{id}:
 *   put:
 *     summary: Update collection (Admin)
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       200:
 *         description: Collection updated
 */
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), validate(updateCollectionSchema), controller.updateCollection);

export default router;