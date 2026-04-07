import * as profileService from "./profile.service.js";
import { uploadMultipleFiles } from "../../utils/uploadHelper.js";

export const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const imageUrls = await uploadMultipleFiles(req.files);

    const profile = await profileService.upsertProfile(
      req.user.id,
      req.body,
      imageUrls
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await profileService.changePassword(
      req.user.id,
      oldPassword,
      newPassword
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Password changed successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    await profileService.deleteProfile(req.user.id);

    res.json({
      success: true,
      statusCode: 200,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};