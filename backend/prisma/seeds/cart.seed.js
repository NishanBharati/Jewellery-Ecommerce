export default async function seedCart(prisma, user, products) {
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: products[1].id,
      quantity: 2,
    },
  });

  return cart;
}