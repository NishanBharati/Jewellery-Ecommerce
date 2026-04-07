import prisma from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { comparePassword, hashPassword } from "../../utils/auth.helpers.js";

export const getProfile = async (userId) => {
  return prisma.profile.findUnique({
    where: { userId },
  });
};

export const upsertProfile = async (userId, data, imageUrls = []) => {

  const allowedFields = {
    phone: data.phone,
    avatar: data.avatar,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    gender: data.gender,
  };

  Object.keys(allowedFields).forEach(key => allowedFields[key] === undefined && delete allowedFields[key]);

  // Add image URLs to profile data if provided
  if (imageUrls && imageUrls.length > 0) {
    allowedFields.images = imageUrls;
  }

  return prisma.profile.upsert({
    where: { userId },
    update: allowedFields,
    create: {
      userId,
      ...allowedFields,
    },
  });
};

export const changePassword = async (userId, oldPassword, newPassword) => {

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true }
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Old password is incorrect");
  }

  const hashedPassword = await hashPassword(newPassword);

  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
    select: {
      id: true,
      email: true,
      fullName: true
    }
  });
};

export const deleteProfile = async (userId) => {
  return prisma.profile.delete({
    where: { userId },
  });
};