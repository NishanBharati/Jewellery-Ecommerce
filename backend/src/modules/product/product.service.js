import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";

// 🔧 SLUG GENERATOR
const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ✅ CREATE PRODUCT
export const createProduct = async (data, imageUrls = []) => {
  if (!data.slug) {
    data.slug = generateSlug(data.name);
  }

  const existing = await prisma.product.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    data.slug = `${data.slug}-${Date.now()}`;
  }

  if (imageUrls.length > 0) {
    data.images = imageUrls;
  }

  const attributeData = data.attribute;
  delete data.attribute;

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.create({ data });

    if (attributeData) {
      await tx.attribute.create({
        data: {
          productId: product.id,
          ...attributeData,
        },
      });
    }

    return tx.product.findUnique({
      where: { id: product.id },
      include: { attribute: true, category: true },
    });
  });
};

export const searchProducts = async (params) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    isFeatured,
    inStock,
    sort,
    page = 1,
    limit = 10,
  } = params;

  const filters = {
    isActive: true, // ✅ ALWAYS filter active products
  };

  // 🔍 Search
  if (keyword) {
    filters.OR = [
      { name: { contains: keyword, mode: "insensitive" } },
      { description: { contains: keyword, mode: "insensitive" } },
      { brand: { contains: keyword, mode: "insensitive" } },
    ];
  }

  // 📂 Category
  if (category) {
    filters.categoryId = category;
  }

  // 💰 Price
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.gte = Number(minPrice);
    if (maxPrice) filters.price.lte = Number(maxPrice);
  }

  // ⭐ Featured
  if (isFeatured !== undefined) {
    filters.isFeatured = isFeatured === "true";
  }

  // 📦 Stock
  if (inStock === "true") {
    filters.stock = { gt: 0 };
  }

  // 🔄 SORTING
  let orderBy = { createdAt: "desc" };

  if (sort === "price_asc") orderBy = { price: "asc" };
  if (sort === "price_desc") orderBy = { price: "desc" };
  if (sort === "rating") orderBy = { averageRating: "desc" };

  const skip = (page - 1) * limit;

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: filters,
      skip,
      take: Number(limit),
      orderBy,
      include: {
        attribute: true,
        category: true,
      },
    }),
    prisma.product.count({ where: filters }),
  ]);

  return {
    products,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
};

export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { attribute: true, category: true },
  });

  if (!product) throw new ApiError(404, "Product not found");

  return product;
};



export const updateProduct = async (id, data) => {
  const existing = await prisma.product.findUnique({
    where: { id },
    include: { attribute: true },
  });

  if (!existing) throw new ApiError(404, "Product not found");

  if (data.name && !data.slug) {
    data.slug = generateSlug(data.name);
  }

  const attributeData = data.attribute;
  delete data.attribute;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.product.update({
      where: { id },
      data,
    });

    if (attributeData) {
      if (existing.attribute) {
        await tx.attribute.update({
          where: { productId: id },
          data: attributeData,
        });
      } else {
        await tx.attribute.create({
          data: { productId: id, ...attributeData },
        });
      }
    }

    return tx.product.findUnique({
      where: { id },
      include: { attribute: true },
    });
  });
};



export const deleteProduct = async (id) => {
  const existing = await prisma.product.findUnique({
    where: { id },
  });

  if (!existing) throw new ApiError(404, "Product not found");

  return prisma.product.update({
    where: { id },
    data: { isActive: false },
  });
};