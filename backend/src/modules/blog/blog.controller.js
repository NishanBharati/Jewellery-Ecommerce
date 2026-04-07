import * as blogService from "./blog.service.js";
import { uploadMultipleFiles } from "../../utils/uploadHelper.js";

export const createBlog = async (req, res, next) => {
  try {
    const imageUrls = await uploadMultipleFiles(req.files);

    const blog = await blogService.createBlog(req.body, req.user.id, imageUrls);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getBlogs();

    res.json({
      success: true,
      statusCode: 200,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug);

    res.json({
      success: true,
      statusCode: 200,
      message: "Blog details retrieved",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const imageUrls = await uploadMultipleFiles(req.files);

    const blog = await blogService.updateBlog(req.params.id, req.body, imageUrls);

    res.json({
      success: true,
      statusCode: 200,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogsAdmin();

    res.json({
      success: true,
      statusCode: 200,
      message: "All blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};