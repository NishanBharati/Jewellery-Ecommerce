import * as categoryService from "./category.service.js";

export const createCategory = async (req,res,next)=>{
  try{
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category created successfully",
      data: category,
    });
  }catch(error){
    next(error);
  }
};

export const getCategories = async (req,res,next)=>{
  try{
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const search = req.query.search || "";

    const result = await categoryService.getCategories(page, limit, search);

    res.json({
      success: true,
      statusCode: 200,
      message: "Categories retrieved successfully",
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }catch(error){
    next(error);
  }
};

export const getCategory = async (req,res,next)=>{
  try{
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Category details retrieved",
      data: category,
    });
  }catch(error){
    next(error);
  }
};

export const updateCategory = async (req,res,next)=>{
  try{
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Category updated successfully",
      data: category,
    });
  }catch(error){
    next(error);
  }
};

export const deleteCategory = async (req,res,next)=>{
  try{
    await categoryService.deleteCategory(req.params.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
    });
  }catch(error){
    next(error);
  }
};

export const getProductsByCategory = async (req,res,next)=>{
  try{
    const data = await categoryService.getProductsByCategory(req.params.slug);

    res.json({
      success: true,
      statusCode: 200,
      message: "Products by category retrieved successfully",
      data,
    });
  }catch(error){
    next(error);
  }
};