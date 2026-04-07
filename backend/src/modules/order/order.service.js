import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";

export const createOrderFromCart = async (userId, paymentMethod = "CASH", addressId = null) => {
  return await prisma.$transaction(async (tx) => {

    const cart = await tx.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (let item of cart.items) {
      const product = item.product;

      if (!product) throw new ApiError(404, "Product not found");

      if (product.stock < item.quantity) {
        throw new ApiError(400, `Not enough stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        paymentMethod,
        paymentStatus: "PENDING",
        status: "PENDING",
        ...(addressId && { addressId }),
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
        address: true,
      },
    });

    for (let item of orderItemsData) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  });
};

export const getMyOrders = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: { items: true, user: true },
    orderBy: { createdAt: "desc" },
  });
};

export const cancelOrder = async (orderId, userId, userRole) => {
  return prisma.$transaction(async (tx) => {

    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new ApiError(404, "Order not found");

    if (userRole === "CUSTOMER" && order.userId !== userId) {
      throw new ApiError(403, "Not authorized");
    }

    if (!["PENDING", "CONFIRMED"].includes(order.status)) {
      throw new ApiError(400, "Order cannot be cancelled");
    }

    for (let item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }

    return tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });
  });
};

export const updateOrderStatus = async (orderId, status) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const getOrdersByStatus = async (status) => {
  if (!status) {
    throw new ApiError(400, "Status parameter is required");
  }

  return prisma.order.findMany({
    where: { status },
    include: { items: true, user: true },
    orderBy: { createdAt: "desc" },
  });
};
