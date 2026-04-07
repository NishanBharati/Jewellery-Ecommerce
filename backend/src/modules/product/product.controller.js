import * as productService from "./product.service.js";
import { uploadMultipleFiles } from "../../utils/uploadHelper.js";

export const createProduct = async (req, res, next) => {
  try {
    // Convert string form data to proper types
    const data = {
      ...req.body,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock, 10),
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
    };

    const imageUrls = await uploadMultipleFiles(req.files);

    const product = await productService.createProduct(
      data,
      imageUrls
    );

    res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ USE SEARCH FUNCTION ONLY (remove old getAllProducts)
export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.searchProducts(req.query);

    res.json({
      success: true,
      data: result.products,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);

    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    // Convert string form data to proper types
    const data = { ...req.body };
    
    // Only convert if the values are provided
    if (data.price !== undefined) data.price = parseFloat(data.price);
    if (data.stock !== undefined) data.stock = parseInt(data.stock, 10);
    if (data.isFeatured !== undefined) data.isFeatured = data.isFeatured === 'true' || data.isFeatured === true;

    const product = await productService.updateProduct(
      req.params.id,
      data
    );

    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({
      success: true,
      message: "Product deactivated",
    });
  } catch (err) {
    next(err);
  }
};