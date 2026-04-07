import prisma from "../src/config/db.js";

import seedUsers from "./seeds/user.seed.js";
import seedProfile from "./seeds/profile.seed.js";
import seedCategories from "./seeds/category.seed.js";
import seedProducts from "./seeds/product.seed.js";
import seedAttributes from "./seeds/attribute.seed.js";
import seedAddress from "./seeds/address.seed.js";
import seedCart from "./seeds/cart.seed.js";
import seedWishlist from "./seeds/wishlist.seed.js";
import seedOrder from "./seeds/order.seed.js";
import seedCollection from "./seeds/collection.seed.js";
import seedBlog from "./seeds/blog.seed.js";
import seedReview from "./seeds/review.seed.js";

async function main() {
  console.log("🌱 Seeding started...");

  try {
    const { user, admin } = await seedUsers(prisma);
    console.log("✅ Users seeded");

    await seedProfile(prisma, user);
    console.log("✅ Profile seeded");

    const categories = await seedCategories(prisma);
    console.log("✅ Categories seeded");

    const products = await seedProducts(prisma, categories);
    console.log("✅ Products seeded");

    await seedAttributes(prisma, products);
    console.log("✅ Attributes seeded");

    const address = await seedAddress(prisma, user);
    console.log("✅ Address seeded");

    await seedCart(prisma, user, products);
    console.log("✅ Cart seeded");

    await seedWishlist(prisma, user, products);
    console.log("✅ Wishlist seeded");

    await seedOrder(prisma, user, products, address);
    console.log("✅ Orders seeded");

    await seedCollection(prisma, products);
    console.log("✅ Collections seeded");

    await seedBlog(prisma, admin);
    console.log("✅ Blogs seeded");

    await seedReview(prisma, user, products);
    console.log("✅ Reviews seeded");

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);