import * as attributeService from "./attribute.service.js";

export const createAttribute = async (req, res, next) => {
  try {
    const attribute = await attributeService.createAttribute(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Attribute created successfully",
      data: attribute
    });
  } catch (error) {
    next(error);
  }
};

export const getAttributesByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const attributes = await attributeService.getAttributesByProduct(productId);
    res.json({
      success: true,
      statusCode: 200,
      message: "Attributes retrieved successfully",
      data: attributes
    });
  } catch (error) {
    next(error);
  }
};

export const updateAttribute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attribute = await attributeService.updateAttribute(id, req.body);
    res.json({
      success: true,
      statusCode: 200,
      message: "Attribute updated successfully",
      data: attribute
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAttribute = async (req, res, next) => {
  try {
    const { id } = req.params;
    await attributeService.deleteAttribute(id);
    res.json({
      success: true,
      statusCode: 200,
      message: "Attribute deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};