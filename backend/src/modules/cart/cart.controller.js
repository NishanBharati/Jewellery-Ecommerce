import * as cartService from "./cart.service.js";

export const getCart = async(req,res,next)=>{
 try{
  const cart = await cartService.getCart(req.user.id);
  res.json({
    success: true,
    statusCode: 200,
    message: "Cart retrieved successfully",
    data: cart
  });
 }catch(error){
  next(error);
 }
};

export const addToCart = async(req,res,next)=>{
 try{
  const {productId, quantity} = req.body;
  const item = await cartService.addToCart(req.user.id, productId, quantity);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Item added to cart",
    data: item
  });
 }catch(error){
  next(error);
 }
};

export const updateCartItem = async(req,res,next)=>{
 try{
  const {quantity} = req.body;
  const item = await cartService.updateQuantity(req.params.id, quantity);

  res.json({
    success: true,
    statusCode: 200,
    message: "Cart item updated successfully",
    data: item
  });
 }catch(error){
  next(error);
 }
};

export const removeCartItem = async(req,res,next)=>{
 try{
  await cartService.removeItem(req.params.id);
  res.json({
    success: true,
    statusCode: 200,
    message: "Item removed from cart"
  });
 }catch(error){
  next(error);
 }
};

export const clearCart = async(req,res,next)=>{
 try{
  await cartService.clearCart(req.user.id);

  res.json({
    success: true,
    statusCode: 200,
    message: "Cart cleared successfully"
  });
 }catch(error){
  next(error);
 }
};