import * as categoryService from "./category.service.js";


export const createCategory = async (req,res,next)=>{
  try{

    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      success:true,
      data:category
    });

  }catch(error){
    next(error);
  }
};


export const getCategories = async (req,res,next)=>{
  try{
    // Get pagination and search parameters from query
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await categoryService.getCategories(page, limit, search);

    res.json({
      success:true,
      ...result
    });

  }catch(error){
    next(error);
  }
};


export const getCategory = async (req,res,next)=>{
  try{

    const category = await categoryService.getCategoryById(req.params.id);

    res.json({
      success:true,
      data:category
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
      success:true,
      data:category
    });

  }catch(error){
    next(error);
  }
};


export const deleteCategory = async (req,res,next)=>{
  try{

    await categoryService.deleteCategory(req.params.id);

    res.json({
      success:true,
      message:"Category deleted"
    });

  }catch(error){
    next(error);
  }
};


export const getProductsByCategory = async (req,res,next)=>{
  try{

    const data = await categoryService.getProductsByCategory(req.params.slug);

    res.json({
      success:true,
      data
    });

  }catch(error){
    next(error);
  }
};