import express from "express";
import * as wishlistController from "./wishlist.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { addToWishlistSchema } from "./wishlist.validator.js";

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management
 */
const router = express.Router();

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["productId"]
 *             properties:
 *               productId: { type: string }
 *     responses:
 *       201:
 *         description: Product added
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, validate(addToWishlistSchema), wishlistController.addToWishlist);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, wishlistController.getWishlist);

/**
 * @swagger
 * /wishlist/clear:
 *   delete:
 *     summary: Clear entire wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared
 *       401:
 *         description: Unauthorized
 */
router.delete("/clear", authMiddleware, wishlistController.clearWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product removed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not in wishlist
 */
router.delete("/:productId", authMiddleware, wishlistController.removeFromWishlist);

export default router;