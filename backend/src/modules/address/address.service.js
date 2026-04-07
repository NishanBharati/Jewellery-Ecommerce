import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";

export const createAddress = async (userId, data) => {
  return prisma.$transaction(async (tx) => {

    if (data.isDefault) {
      await tx.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return tx.address.create({
      data: {
        ...data,
        userId,
      },
    });
  });
};

export const getAddresses = async (userId) => {
  return prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateAddress = async (id, userId, data) => {
  return prisma.$transaction(async (tx) => {

    if (data.isDefault) {
      await tx.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    const result = await tx.address.updateMany({
      where: {
        id,
        userId, 
      },
      data,
    });

    if (result.count === 0) {
      throw new ApiError(404, "Address not found or you don't have permission to update it");
    }

    return result;
  });
};

export const deleteAddress = async (id, userId) => {
  const result = await prisma.address.deleteMany({
    where: {
      id,
      userId, 
    },
  });

  if (result.count === 0) {
    throw new ApiError(404, "Address not found or you don't have permission to delete it");
  }

  return result;
};

export const setDefaultAddress = async (id, userId) => {
  return prisma.$transaction(async (tx) => {

    await tx.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });

    const updated = await tx.address.updateMany({
      where: {
        id,
        userId,
      },
      data: { isDefault: true },
    });

    if (updated.count === 0) {
      throw new ApiError(404, "Address not found or not authorized");
    }

    return updated;
  });
};