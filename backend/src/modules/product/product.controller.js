import * as productService from "./product.service.js";

// ADMIN
export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};
// PUBLIC
export const getProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const category = req.query.category;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await productService.getAllProducts(
      keyword,
      category,
      minPrice,
      maxPrice,
      page,
      limit,
    );

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// PUBLIC
export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ADMIN
export const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ADMIN
export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
