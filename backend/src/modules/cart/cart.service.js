import prisma from "../../config/db.js";

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId }
    });
  }

  return cart;
};

const calculateCartTotal = (items) => {
  let totalPrice = 0;
  let totalItems = 0;

  items.forEach(item => {
    totalPrice += item.product.price * item.quantity;
    totalItems += item.quantity;
  });

  return { totalPrice, totalItems };
};

export const getCart = async (userId) => {

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  }) || await prisma.cart.create({
    data: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  const { totalPrice, totalItems } = calculateCartTotal(cart.items);

  return {
    success: true,
    data: {
      ...cart,
      summary: {
        totalItems,
        totalPrice: parseFloat(totalPrice.toFixed(2))
      }
    }
  };
};

export const addToCart = async (userId, productId, quantity) => {

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  if (product.stock < quantity) {
    const error = new Error(`Not enough stock. Available: ${product.stock}`);
    error.statusCode = 400;
    throw error;
  }

  const cart = await getOrCreateCart(userId);

  const existing = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId
    }
  });

  if (existing) {
    const newQuantity = existing.quantity + quantity;

    if (product.stock < newQuantity) {
      const error = new Error(`Not enough stock. Available: ${product.stock}`);
      error.statusCode = 400;
      throw error;
    }

    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQuantity },
      include: { product: true }
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity
    },
    include: { product: true }
  });
};

export const updateQuantity = async (itemId, quantity) => {

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { product: true }
  });

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  if (item.product.stock < quantity) {
    const error = new Error(`Not enough stock. Available: ${item.product.stock}`);
    error.statusCode = 400;
    throw error;
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: { product: true }
  });
};

export const removeItem = async (itemId) => {

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId }
  });

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.cartItem.delete({
    where: { id: itemId }
  });
};

export const clearCart = async (userId) => {

  const cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
};