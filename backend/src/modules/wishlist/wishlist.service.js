import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";

export const addToWishlist = async (userId, productId) => {

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new ApiError(404, "Product not found");

  return prisma.wishlistItem.create({
    data: {
      userId,
      productId,
    },
    include: { product: true },
  });
};

export const getWishlist = async (userId) => {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
};

export const removeFromWishlist = async (userId, productId) => {
  return prisma.wishlistItem.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

export const clearWishlist = async (userId) => {
  return prisma.wishlistItem.deleteMany({
    where: { userId },
  });
};