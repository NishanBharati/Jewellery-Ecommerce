import prisma from "../../config/db.js";

export const createOrder = async (userId, items, paymentMethod = "CASH") => {
  try {
    // Step 1: Check all products exist and have enough stock
    let totalAmount = 0;
    const orderItems = [];

    for (let item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Step 2: Create order and update stock together (all or nothing)
    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        paymentStatus: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    // Step 3: Update stock for each product AFTER order is created
    for (let item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  } catch (error) {
    // If any error happens, order is not created at all
    throw error;
  }
};

export const getMyOrders = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { items: true },
  });
};

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { items: true, user: true },
  });
};

export const cancelOrder = async (orderId, userId, userRole) => {
  const order = await prisma.order.findUnique({ 
    where: { id: orderId },
    include: { items: true }
  });
  if (!order) throw new Error("Order not found");

  // Customer can only cancel their own orders
  if (userRole === "CUSTOMER" && order.userId !== userId) {
    const err = new Error("Not authorized");
    err.statusCode = 403;
    throw err;
  }

  // Can only cancel PENDING or CONFIRMED orders
  if (!["PENDING", "CONFIRMED"].includes(order.status)) {
    throw new Error("Order cannot be cancelled at this stage");
  }

  // Restore stock for each product
  for (let item of order.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { increment: item.quantity } }
    });
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
};

export const updateOrderStatus = async (orderId, status) => {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: status,
    },
  });
};

// GET ORDERS BY STATUS
export const getOrdersByStatus = async (status) => {
  // Check if status is provided
  if (!status) {
    throw new Error("Status parameter is required");
  }

  return prisma.order.findMany({
    where: {
      status: status,
    },
    include: {
      items: true,
      user: true,
    },
  });
};
