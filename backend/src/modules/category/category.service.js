import prisma from "../../config/db.js";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};


// CREATE CATEGORY
export const createCategory = async (data) => {

  const slug = generateSlug(data.name);

  const existing = await prisma.category.findUnique({
    where: { slug }
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  return prisma.category.create({
    data: {
      name: data.name,
      slug
    }
  });

};


// GET ALL CATEGORIES WITH PAGINATION AND SEARCH
export const getCategories = async (page = 1, limit = 10, search = "") => {
  // Build filter for search
  let filter = {};
  if (search) {
    filter.name = {
      contains: search,
      mode: "insensitive"
    };
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get categories and total count
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


// GET SINGLE CATEGORY
export const getCategoryById = async (id) => {

  return prisma.category.findUnique({
    where: { id },
    include: { products: true }
  });

};


// UPDATE CATEGORY
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


// DELETE CATEGORY
export const deleteCategory = async (id) => {

  const productCount = await prisma.product.count({
    where: { categoryId: id }
  });

  if (productCount > 0) {
    throw new Error("Cannot delete category with products");
  }

  return prisma.category.delete({
    where: { id }
  });

};


// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (slug) => {

  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: true
    }
  });

};