import express from "express";
import * as controller from "./cart.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { addToCartSchema, updateCartItemSchema } from "./cart.validator.js";

const router = express.Router();

// Get cart
router.get("/", authMiddleware, controller.getCart);

// Add to cart with validation
router.post("/", authMiddleware, validate(addToCartSchema), controller.addToCart);

// Update cart item with validation
router.put("/:id", authMiddleware, validate(updateCartItemSchema), controller.updateCartItem);

// Remove item from cart
router.delete("/:id", authMiddleware, controller.removeCartItem);

// Clear entire cart
router.delete("/", authMiddleware, controller.clearCart);

export default router;