import prisma from "../../config/db.js";

// Helper to calculate cart totals
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
  let cart = await prisma.cart.findFirst({
    where:{ userId },
    include:{ items:{ include:{ product:true } } }
  });

  if(!cart){
    cart = await prisma.cart.create({
      data:{ userId },
      include:{ items:{ include:{ product:true } } }
    });
  }

  // Add cart summary
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
  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  // Check stock
  if (product.stock < quantity) {
    const error = new Error(`Not enough stock. Available: ${product.stock}`);
    error.statusCode = 400;
    throw error;
  }

  let cart = await prisma.cart.findFirst({
    where:{ userId }
  });

  if(!cart){
    cart = await prisma.cart.create({ data:{ userId }});
  }

  const existing = await prisma.cartItem.findFirst({
    where:{
      cartId:cart.id,
      productId
    }
  });

  if(existing){
    const newQuantity = existing.quantity + quantity;
    
    // Check stock for updated quantity
    if (product.stock < newQuantity) {
      const error = new Error(`Not enough stock for total quantity. Available: ${product.stock}`);
      error.statusCode = 400;
      throw error;
    }
    
    return prisma.cartItem.update({
      where:{ id:existing.id },
      data:{ quantity: newQuantity },
      include:{ product:true }
    });
  }

  return prisma.cartItem.create({
    data:{
      cartId:cart.id,
      productId,
      quantity
    },
    include:{ product:true }
  });
};

export const updateQuantity = async (itemId, quantity) => {
  // Get item with product info
  const item = await prisma.cartItem.findUnique({
    where:{ id:itemId },
    include:{ product:true }
  });

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  // Check stock
  if (item.product.stock < quantity) {
    const error = new Error(`Not enough stock. Available: ${item.product.stock}`);
    error.statusCode = 400;
    throw error;
  }

  return prisma.cartItem.update({
    where:{ id:itemId },
    data:{ quantity },
    include:{ product:true }
  });
};

export const removeItem = async (itemId) => {
  const item = await prisma.cartItem.findUnique({
    where:{ id:itemId }
  });

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.cartItem.delete({
    where:{ id:itemId }
  });
};

export const clearCart = async (cartId) => {
  const cart = await prisma.cart.findUnique({
    where:{ id:cartId }
  });

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.cartItem.deleteMany({
    where:{ cartId }
  });
};