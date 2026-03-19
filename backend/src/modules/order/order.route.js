import express from "express";
import * as orderController from "./order.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validator.js";

const router = express.Router();

// Specific routes FIRST (before generic ones)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("CUSTOMER"),
  validate(createOrderSchema),
  orderController.createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("CUSTOMER"),
  orderController.getMyOrders
);

router.patch("/:id/cancel",
  authMiddleware,
  orderController.cancelOrder
);

router.get(
  "/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  orderController.getOrdersByStatus
);

router.put(
  "/status/:orderId",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(updateOrderStatusSchema),
  orderController.updateStatus
);

// Generic route LAST (to avoid conflicts)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  orderController.getAllOrders
);

export default router;
