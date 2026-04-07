import bcrypt from "bcrypt";

export default async function seedUsers(prisma) {

  const testUserPassword = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      fullName: "Test User",
      email: "user@test.com",
      password: testUserPassword,
      role: "CUSTOMER",
      isVerified: true,
    },
  });

  const superAdminPassword = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD || "Admin12345678",
    10
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.SUPER_ADMIN_EMAIL || "admin@test.com" },
    update: {},
    create: {
      fullName: process.env.SUPER_ADMIN_NAME || "Admin User",
      email: process.env.SUPER_ADMIN_EMAIL || "admin@test.com",
      password: superAdminPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  return { user, admin };
}