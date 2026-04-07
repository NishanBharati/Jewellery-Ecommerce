import prisma from "../../config/db.js";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const createCollection = async (data) => {
  if (!data.slug) {
    data.slug = generateSlug(data.name);
  }

  const existingCollection = await prisma.collection.findUnique({
    where: { slug: data.slug }
  });

  if (existingCollection) {
    data.slug = `${data.slug}-${Date.now()}`;
  }

  return prisma.collection.create({
    data,
  });
};

export const getCollections = async () => {
  return prisma.collection.findMany({
    where: { isActive: true },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getCollectionBySlug = async (slug) => {
  return prisma.collection.findUnique({
    where: { slug },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const addProductToCollection = async (collectionId, productId) => {
  return prisma.collectionItem.create({
    data: {
      collectionId,
      productId,
    },
  });
};

export const removeProductFromCollection = async (collectionId, productId) => {
  return prisma.collectionItem.delete({
    where: {
      collectionId_productId: {
        collectionId,
        productId,
      },
    },
  });
};

export const deleteCollection = async (id) => {
  return prisma.collection.delete({
    where: { id },
  });
};

export const updateCollection = async (id, data) => {
  const existing = await prisma.collection.findUnique({
    where: { id },
  });

  if (!existing) {
    const error = new Error("Collection not found");
    error.statusCode = 404;
    throw error;
  }

  if (data.name && !data.slug) {
    data.slug = generateSlug(data.name);

    const slugExists = await prisma.collection.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (slugExists) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }

  return prisma.collection.update({
    where: { id },
    data,
  });
};