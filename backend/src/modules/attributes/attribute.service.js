import prisma from "../../config/db.js";

export const createAttribute = async (data) => {
  return prisma.attribute.create({
    data
  });
};

export const getAttributesByProduct = async (productId) => {
  return prisma.attribute.findMany({
    where: { productId }
  });
};

export const updateAttribute = async (id, data) => {
  return prisma.attribute.update({
    where: { id },
    data
  });
};

export const deleteAttribute = async (id) => {
  return prisma.attribute.delete({
    where: { id }
  });
};