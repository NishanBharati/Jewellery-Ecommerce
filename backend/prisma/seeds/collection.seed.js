export default async function seedCollection(prisma, products) {
  const collection = await prisma.collection.create({
    data: {
      name: "Featured Jewelry",
      slug: "featured-jewelry",
      description: "Our hand-picked featured jewelry collection",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
      isActive: true,
    },
  });

  // Add featured products to collection
  await prisma.collectionItem.create({
    data: {
      collectionId: collection.id,
      productId: products[0].id,
      sortOrder: 1,
    },
  });

  await prisma.collectionItem.create({
    data: {
      collectionId: collection.id,
      productId: products[4].id,
      sortOrder: 2,
    },
  });

  await prisma.collectionItem.create({
    data: {
      collectionId: collection.id,
      productId: products[1].id,
      sortOrder: 3,
    },
  });

  return { collection };
}