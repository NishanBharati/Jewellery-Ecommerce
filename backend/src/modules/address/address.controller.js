import * as addressService from "./address.service.js";

export const createAddress = async (req, res, next) => {
  try {
    const address = await addressService.createAddress(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Address created successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const data = await addressService.getAddresses(req.user.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Addresses retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const data = await addressService.updateAddress(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Address updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await addressService.deleteAddress(req.params.id, req.user.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    const data = await addressService.setDefaultAddress(
      req.params.id,
      req.user.id
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Default address set successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};