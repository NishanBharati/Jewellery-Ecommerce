import * as reviewService from "./review.service.js";

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews();

    res.json({
      success: true,
      statusCode: 200,
      message: "All reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const review = await reviewService.getReview(req.params.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = await reviewService.upsertReview(
      req.user.id,
      productId,
      { rating, comment }
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getProductReviews(
      req.params.productId
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Product reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const review = await reviewService.updateReview(
      req.user.id,
      req.params.id,
      { rating, comment }
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(
      req.user.id,
      req.params.id
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};