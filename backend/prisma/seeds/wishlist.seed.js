export default async function seedWishlist(prisma, user, products) {
  const wishlistItem = await prisma.wishlistItem.create({
    data: {
      userId: user.id,
      productId: products[0].id,
    },
  });

  return wishlistItem;
}