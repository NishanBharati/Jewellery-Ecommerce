import prisma from "../config/db.js";
import { hashPassword } from "./auth.helpers.js";

const initSuperAdmin = async () => {
  try {

    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME;

    if (!email || !password || !name) {
      console.log(" Super admin not configured");
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.role === "ADMIN") {
        console.log(" Super admin already exists:", email);
        return;
      }
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: name,
        role: "ADMIN",
        isVerified: true,
      },
    });

    console.log(" Super admin created successfully!");
    console.log("   Email:", email);

  } catch (error) {
    console.error("Failed to create super admin:", error.message);
  }
};

export default initSuperAdmin;