const prisma = require("../../config/prisma");

exports.createOrder = async (userId, items) => {
  let totalAmount = 0;

  const orderItems = [];

  for (let item of items) {

    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.price
    });
  }

  const order = await prisma.order.create({
    data: {
      userId: userId,
      totalAmount: totalAmount,
      items: {
        create: orderItems
      }
    },
    include: {
      items: true
    }
  });

  return order;
};

exports.getMyOrders = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { items: true }
  });
};

exports.getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { items: true, user: true }
  });
};
