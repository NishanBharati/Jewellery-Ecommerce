import express from "express";
import * as controller from "./address.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createAddressSchema,
  updateAddressSchema,
  setDefaultAddressSchema,
} from "./address.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: User address management APIs
 */

/**
 * @swagger
 * /address:
 *   post:
 *     summary: Create new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 */
router.post("/", authMiddleware, validate(createAddressSchema), controller.createAddress);

/**
 * @swagger
 * /address:
 *   get:
 *     summary: Get all user addresses
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get("/", authMiddleware, controller.getAddresses);

/**
 * @swagger
 * /address/{id}:
 *   put:
 *     summary: Update address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated
 */
router.put("/:id", authMiddleware, validate(updateAddressSchema), controller.updateAddress);

/**
 * @swagger
 * /address/{id}:
 *   delete:
 *     summary: Delete address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Address deleted
 */
router.delete("/:id", authMiddleware, controller.deleteAddress);

/**
 * @swagger
 * /address/{id}/default:
 *   patch:
 *     summary: Set default address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Default address set
 */
router.patch("/:id/default", authMiddleware, validate(setDefaultAddressSchema), controller.setDefaultAddress);

export default router;