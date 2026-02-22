import * as productService from "./product.service.js";



// ADMIN
export const createProduct = async (req,res)=>{

  const product =
    await productService.createProduct(req.body);

  res.status(201).json(product);
};


// PUBLIC
export const getProducts = async (req,res)=>{

  const products =
    await productService.getAllProducts();

  res.json(products);
};


// PUBLIC
export const getProduct = async (req,res)=>{

  const product =
    await productService.getProductById(
      req.params.id
    );

  if(!product){
    return res.status(404).json({
      message:"Product not found"
    });
  }

  res.json(product);
};


// ADMIN
export const updateProduct = async (req,res)=>{

  const product =
    await productService.updateProduct(
      req.params.id,
      req.body
    );

  res.json(product);
};


// ADMIN
export const deleteProduct = async (req,res)=>{

  await productService.deleteProduct(
    req.params.id
  );

  res.json({
    message:"Product deleted"
  });
};
