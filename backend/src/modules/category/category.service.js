import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};

export const createCategory = async (data) => {

  const slug = generateSlug(data.name);

  const existing = await prisma.category.findUnique({
    where: { slug }
  });

  if (existing) {
    throw new ApiError(409, "Category already exists");
  }

  return prisma.category.create({
    data: {
      name: data.name,
      slug
    }
  });

};

export const getCategories = async (page = 1, limit = 10, search = "") => {

  let filter = {};
  if (search) {
    filter.name = {
      contains: search,
      mode: "insensitive"
    };
  }

  const skip = (page - 1) * limit;

  const [categories, total] = await prisma.$transaction([
    prisma.category.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.category.count({ where: filter })
  ]);

  return {
    data: categories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

export const getCategoryById = async (id) => {

  return prisma.category.findUnique({
    where: { id },
    include: { products: true }
  });

};

export const updateCategory = async (id, data) => {

  const slug = generateSlug(data.name);

  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug
    }
  });

};

export const deleteCategory = async (id) => {

  const productCount = await prisma.product.count({
    where: { categoryId: id }
  });

  if (productCount > 0) {
    throw new ApiError(400, "Cannot delete category with products");
  }

  return prisma.category.delete({
    where: { id }
  });

};

export const getProductsByCategory = async (slug) => {

  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: true
    }
  });

};