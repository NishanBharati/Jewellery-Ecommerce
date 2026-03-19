import prisma from "../../config/db.js";

// Helper function to generate slug from name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const createProduct = async (data) => {
  // Generate slug if not provided
  if (!data.slug) {
    data.slug = generateSlug(data.name);
  }

  // Always check slug uniqueness (whether auto-generated or manually provided)
  const existingProduct = await prisma.product.findUnique({
    where: { slug: data.slug }
  });

  if (existingProduct) {
    if (!data.slug.includes(generateSlug(data.name))) {
      // Custom slug that conflicts — reject it clearly
      const error = new Error(`Slug "${data.slug}" is already taken`);
      error.statusCode = 400;
      throw error;
    }
    // Auto-generated slug conflict — append timestamp to make it unique
    data.slug = `${data.slug}-${Date.now()}`;
  }

  return prisma.product.create({
    data
  });
};



export const getAllProducts = async (
  keyword,
  category,
  minPrice,
  maxPrice,
  page,
  limit
) => {

  let filter = {};

  // SEARCH BY PRODUCT NAME
  if (keyword) {
    filter.name = {
      contains: keyword,
      mode: "insensitive"
    };
  }

  // FILTER BY CATEGORY
  if (category) {
    filter.category = category;
  }

  // FILTER BY PRICE RANGE
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.lte = Number(maxPrice);
    }
  }

  // PAGINATION LOGIC
  const skip = (page - 1) * limit;

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count({ where: filter })
  ]);

  return { products, total, page, limit, totalPages: Math.ceil(total / limit) };

};

export const getProductById = async (id) => {

  return prisma.product.findUnique({
    where:{ id }
  });

};


export const updateProduct = async (id, data) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  // Regenerate slug if name is being updated and slug is not provided
  if (data.name && !data.slug) {
    data.slug = generateSlug(data.name);
    
    // Ensure slug is unique
    const existingProduct = await prisma.product.findFirst({
      where: { 
        slug: data.slug,
        NOT: { id: id }
      }
    });
    
    if (existingProduct) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }

  return prisma.product.update({
    where:{ id },
    data
  });
};


export const deleteProduct = async (id) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const orderItemCount = await prisma.orderItem.count({ where: { productId: id } });
  if (orderItemCount > 0) {
    const error = new Error("Cannot delete a product that has been ordered");
    error.statusCode = 400;
    throw error;
  }

  return prisma.product.delete({
    where: { id }
  });
};


