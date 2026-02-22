import prisma from "../../config/db.js";



export const createProduct = async (data) => {

  return prisma.product.create({
    data
  });

};


export const getAllProducts = async () => {

  return prisma.product.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });

};


export const getProductById = async (id) => {

  return prisma.product.findUnique({
    where:{ id }
  });

};


export const updateProduct = async (id, data) => {

  return prisma.product.update({
    where:{ id },
    data
  });

};


export const deleteProduct = async (id) => {

  return prisma.product.delete({
    where:{ id }
  });

};


