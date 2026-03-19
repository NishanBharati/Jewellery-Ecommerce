import express from "express";
import * as controller from "./category.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./category.validator.js";

const router = express.Router();


// ADMIN
router.post(
 "/",
 authMiddleware,
 roleMiddleware("ADMIN"),
 validate(createCategorySchema),
 controller.createCategory
);


router.put(
 "/:id",
 authMiddleware,
 roleMiddleware("ADMIN"),
 validate(updateCategorySchema),
 controller.updateCategory
);


router.delete(
 "/:id",
 authMiddleware,
 roleMiddleware("ADMIN"),
 controller.deleteCategory
);


// PUBLIC
router.get("/", controller.getCategories);

router.get("/:id", controller.getCategory);

router.get("/slug/:slug", controller.getProductsByCategory);

export default router;