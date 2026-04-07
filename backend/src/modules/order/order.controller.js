import * as orderService from "./order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { paymentMethod, addressId } = req.body;

    const order = await orderService.createOrderFromCart(
      userId,
      paymentMethod,
      addressId
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await orderService.getMyOrders(userId);

    res.json({
      success: true,
      statusCode: 200,
      message: "Your orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json({
      success: true,
      statusCode: 200,
      message: "All orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const orderId = req.params.id;

    const order = await orderService.cancelOrder(
      orderId,
      userId,
      userRole
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(id, status);

    res.json({
      success: true,
      statusCode: 200,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatus = async (req, res, next) => {
  try {
    const { status } = req.query;

    const orders = await orderService.getOrdersByStatus(status);

    res.json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};