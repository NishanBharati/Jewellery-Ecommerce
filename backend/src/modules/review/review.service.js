import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";

const updateProductRating = async (productId, tx) => {
  const reviews = await tx.review.findMany({
    where: { productId },
  });

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const count = reviews.length;

  const avg = count === 0 ? 0 : total / count;

  await tx.product.update({
    where: { id: productId },
    data: {
      averageRating: avg,
      reviewCount: count,
    },
  });
};

export const upsertReview = async (userId, productId, data) => {
  return prisma.$transaction(async (tx) => {

    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new ApiError(404, "Product not found");

    const review = await tx.review.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: data,
      create: {
        userId,
        productId,
        ...data,
      },
    });

    await updateProductRating(productId, tx);

    return review;
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!review) throw new ApiError(404, "Review not found");

  return review;
};

export const getProductReviews = async (productId) => {
  return prisma.review.findMany({
    where: { productId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateReview = async (userId, reviewId, data) => {
  return prisma.$transaction(async (tx) => {
    const review = await tx.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) throw new ApiError(404, "Review not found");

    if (review.userId !== userId) {
      throw new ApiError(403, "Not authorized");
    }

    const updatedReview = await tx.review.update({
      where: { id: reviewId },
      data,
    });

    await updateProductRating(review.productId, tx);

    return updatedReview;
  });
};

export const deleteReview = async (userId, reviewId) => {
  return prisma.$transaction(async (tx) => {

    const review = await tx.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) throw new ApiError(404, "Review not found");

    if (review.userId !== userId) {
      throw new ApiError(403, "Not authorized");
    }

    await tx.review.delete({
      where: { id: reviewId },
    });

    await updateProductRating(review.productId, tx);
  });
};