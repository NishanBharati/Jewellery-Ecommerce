import * as wishlistService from "./wishlist.service.js";

export const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const item = await wishlistService.addToWishlist(userId, productId);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Product added to wishlist successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.getWishlist(req.user.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Wishlist retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    await wishlistService.removeFromWishlist(req.user.id, productId);

    res.json({
      success: true,
      statusCode: 200,
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const clearWishlist = async (req, res, next) => {
  try {
    await wishlistService.clearWishlist(req.user.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};