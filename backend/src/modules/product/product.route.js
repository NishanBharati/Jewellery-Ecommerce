import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import * as controller from "./product.controller.js";
import { createProductSchema } from "./product.validator.js";

const router = express.Router();

// ✅ PUBLIC ROUTES

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);


// ✅ ADMIN ROUTES

router.post(
  "/",
  validate(createProductSchema),
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.createProduct
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.deleteProduct
);

export default router;
