import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import * as attributeController from "./attribute.controller.js";
import { createAttributeSchema, updateAttributeSchema } from "./attribute.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attributes
 *   description: Product attributes APIs
 */

/**
 * @swagger
 * /attributes:
 *   post:
 *     summary: Create attribute (Admin)
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attribute'
 *     responses:
 *       201:
 *         description: Attribute created
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createAttributeSchema),
  attributeController.createAttribute
);

/**
 * @swagger
 * /attributes/{productId}:
 *   get:
 *     summary: Get attributes by product ID
 *     tags: [Attributes]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Attributes fetched
 */
router.get("/:productId", attributeController.getAttributesByProduct);

/**
 * @swagger
 * /attributes/{id}:
 *   put:
 *     summary: Update attribute (Admin)
 *     tags: [Attributes]
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
 *             $ref: '#/components/schemas/Attribute'
 *     responses:
 *       200:
 *         description: Attribute updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(updateAttributeSchema),
  attributeController.updateAttribute
);

/**
 * @swagger
 * /attributes/{id}:
 *   delete:
 *     summary: Delete attribute (Admin)
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Attribute deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  attributeController.deleteAttribute
);

export default router;