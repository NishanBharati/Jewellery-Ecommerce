export default async function seedOrder(prisma, user, products, address) {
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: products[4].price * 2,
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      status: "CONFIRMED",
      addressId: address.id,
    },
  });

  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: products[4].id,
      quantity: 2,
      price: products[4].price,
    },
  });

  return { order, orderItem };
}