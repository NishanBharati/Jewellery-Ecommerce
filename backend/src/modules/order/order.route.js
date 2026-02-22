const express = require("express");
const router = express.Router();

const orderController = require("./order.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createOrderSchema } = require("./order.validation");


router.post(
  "/",
  authMiddleware,
  roleMiddleware("USER"),
  validate(createOrderSchema),
  orderController.createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("USER"),
  orderController.getMyOrders
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  orderController.getAllOrders
);

module.exports = router;
