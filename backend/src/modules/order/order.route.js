import express from "express";
import * as orderController from "./order.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, roleMiddleware("CUSTOMER"), validate(createOrderSchema), orderController.createOrder);

/**
 * @swagger
 * /orders/my-orders:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/my-orders", authMiddleware, roleMiddleware("CUSTOMER"), orderController.getMyOrders);

/**
 * @swagger
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/cancel", authMiddleware, orderController.cancelOrder);

/**
 * @swagger
 * /orders/status:
 *   get:
 *     summary: Get orders by status (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/status", authMiddleware, roleMiddleware("ADMIN"), orderController.getOrdersByStatus);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id/status", authMiddleware, roleMiddleware("ADMIN"), validate(updateOrderStatusSchema), orderController.updateStatus);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, roleMiddleware("ADMIN"), orderController.getAllOrders);

export default router;