import prisma from "../../config/db.js";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const createBlog = async (data, userId, imageUrls = []) => {
  if (!data.slug) {
    data.slug = generateSlug(data.title);
  }

  const existingBlog = await prisma.blog.findUnique({
    where: { slug: data.slug }
  });

  if (existingBlog) {
    data.slug = `${data.slug}-${Date.now()}`;
  }

  if (data.isPublished && !data.publishedAt) {
    data.publishedAt = new Date();
  }

  // Add image URLs to blog data if provided
  if (imageUrls && imageUrls.length > 0) {
    data.images = imageUrls;
  }

  return prisma.blog.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
};

export const getBlogs = async () => {
  return prisma.blog.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getBlogBySlug = async (slug) => {
  return prisma.blog.findUnique({
    where: { slug },
  });
};

export const updateBlog = async (id, data, imageUrls = []) => {
  const updateData = { ...data };

  if (data.title && !data.slug) {
    updateData.slug = generateSlug(data.title);

    const existingBlog = await prisma.blog.findUnique({
      where: { slug: updateData.slug }
    });

    if (existingBlog && existingBlog.id !== id) {
      updateData.slug = `${updateData.slug}-${Date.now()}`;
    }
  }

  if (data.isPublished === true) {
    const existing = await prisma.blog.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!existing?.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  // Add image URLs to blog data if provided
  if (imageUrls && imageUrls.length > 0) {
    updateData.images = imageUrls;
  }

  return prisma.blog.update({
    where: { id },
    data: updateData,
  });
};

export const deleteBlog = async (id) => {
  return prisma.blog.delete({
    where: { id },
  });
};

export const getAllBlogsAdmin = async () => {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
};