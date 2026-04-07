import * as collectionService from "./collection.service.js";

export const createCollection = async (req, res, next) => {
  try {
    const collection = await collectionService.createCollection(req.body);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Collection created successfully",
      data: collection,
    });
  } catch (error) {
    next(error);
  }
};

export const getCollections = async (req, res, next) => {
  try {
    const data = await collectionService.getCollections();

    res.json({
      success: true,
      statusCode: 200,
      message: "Collections retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCollectionBySlug = async (req, res, next) => {
  try {
    const data = await collectionService.getCollectionBySlug(req.params.slug);

    res.json({
      success: true,
      statusCode: 200,
      message: "Collection details retrieved",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { collectionId, productId } = req.body;

    const item = await collectionService.addProductToCollection(
      collectionId,
      productId
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Product added to collection successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const { collectionId, productId } = req.body;

    await collectionService.removeProductFromCollection(
      collectionId,
      productId
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Product removed from collection successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCollection = async (req, res, next) => {
  try {
    await collectionService.deleteCollection(req.params.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCollection = async (req, res, next) => {
  try {
    const collection = await collectionService.updateCollection(req.params.id, req.body);

    res.json({
      success: true,
      statusCode: 200,
      message: "Collection updated successfully",
      data: collection,
    });
  } catch (error) {
    next(error);
  }
};