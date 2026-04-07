export default async function seedProducts(prisma, categories) {
  const products = [];

  // Gold Products
  const classicGoldNecklace = await prisma.product.create({
    data: {
      name: "Classic Gold Necklace",
      slug: "classic-gold-necklace",
      description: "Elegant gold necklace for festive and bridal styling. Features premium 22K gold with intricate designs.",
      price: 9500,
      discountPrice: 8500,
      stock: 15,
      brand: "Eternity",
      sku: "GOLD-NECK-001",
      tags: ["necklace", "gold", "festive", "bridal", "trending"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: true,
      isActive: true,
      categoryId: categories.gold.id,
    },
  });
  products.push(classicGoldNecklace);

  const royalGoldBracelet = await prisma.product.create({
    data: {
      name: "Royal Gold Bracelet",
      slug: "royal-gold-bracelet",
      description: "Refined bracelet with a rich premium finish. Perfect for weddings and celebrations.",
      price: 18000,
      discountPrice: 16200,
      stock: 8,
      brand: "Eternity",
      sku: "GOLD-BRAC-001",
      tags: ["bracelet", "gold", "wedding", "premium", "luxury"],
      images: ["https://images.unsplash.com/photo-1515562141207-6811bcb33ce4?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.gold.id,
    },
  });
  products.push(royalGoldBracelet);

  // Silver Products
  const silverGraceEarrings = await prisma.product.create({
    data: {
      name: "Silver Grace Earrings",
      slug: "silver-grace-earrings",
      description: "Lightweight silver earrings for graceful daily wear. Comfortable and elegant design.",
      price: 8500,
      discountPrice: 7500,
      stock: 20,
      brand: "Eternity",
      sku: "SLV-EARN-001",
      tags: ["earrings", "silver", "daily wear", "lightweight", "casual"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.silver.id,
    },
  });
  products.push(silverGraceEarrings);

  const silverMinimalRing = await prisma.product.create({
    data: {
      name: "Silver Minimal Ring",
      slug: "silver-minimal-ring",
      description: "Modern silver ring with clean minimal styling. Perfect for contemporary fashion.",
      price: 12000,
      discountPrice: 10800,
      stock: 25,
      brand: "Eternity",
      sku: "SLV-RING-001",
      tags: ["ring", "silver", "minimal", "modern", "casual"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.silver.id,
    },
  });
  products.push(silverMinimalRing);

  // Diamond Products
  const diamondBridalNecklace = await prisma.product.create({
    data: {
      name: "Diamond Bridal Necklace",
      slug: "diamond-bridal-necklace",
      description: "Luxury diamond bridal necklace with timeless elegance. Perfect for special occasions.",
      price: 54000,
      discountPrice: 48600,
      stock: 5,
      brand: "Eternity",
      sku: "DIA-NECK-001",
      tags: ["necklace", "diamond", "bridal", "luxury", "wedding"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: true,
      isActive: true,
      categoryId: categories.diamond.id,
    },
  });
  products.push(diamondBridalNecklace);

  const elegantDiamondRing = await prisma.product.create({
    data: {
      name: "Elegant Diamond Ring",
      slug: "elegant-diamond-ring",
      description: "Graceful diamond ring for modern elegance. Statement piece for any occasion.",
      price: 32000,
      discountPrice: 28800,
      stock: 10,
      brand: "Eternity",
      sku: "DIA-RING-001",
      tags: ["ring", "diamond", "elegant", "modern", "luxury"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.diamond.id,
    },
  });
  products.push(elegantDiamondRing);

  // Platinum Products
  const platinumLuxeBracelet = await prisma.product.create({
    data: {
      name: "Platinum Luxe Bracelet",
      slug: "platinum-luxe-bracelet",
      description: "Statement platinum bracelet with luxury finishing. Premium quality and design.",
      price: 42000,
      discountPrice: 37800,
      stock: 7,
      brand: "Eternity",
      sku: "PLAT-BRAC-001",
      tags: ["bracelet", "platinum", "luxury", "premium", "wedding"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.platinum.id,
    },
  });
  products.push(platinumLuxeBracelet);

  const platinumSignatureRing = await prisma.product.create({
    data: {
      name: "Platinum Signature Ring",
      slug: "platinum-signature-ring",
      description: "Elegant platinum ring with premium finish. A timeless classic piece.",
      price: 7400,
      discountPrice: 6660,
      stock: 12,
      brand: "Eternity",
      sku: "PLAT-RING-001",
      tags: ["ring", "platinum", "classic", "luxury", "premium"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.platinum.id,
    },
  });
  products.push(platinumSignatureRing);

  // Wedding Set Products
  const bridalGoldMangalsutra = await prisma.product.create({
    data: {
      name: "Bridal Gold Mangalsutra",
      slug: "bridal-gold-mangalsutra",
      description: "Traditional bridal mangalsutra for wedding elegance. Authentic design with premium gold.",
      price: 42000,
      discountPrice: 37800,
      stock: 6,
      brand: "Eternity",
      sku: "GOLD-MANG-001",
      tags: ["mangalsutra", "gold", "bridal", "wedding", "traditional"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.weddingSet.id,
    },
  });
  products.push(bridalGoldMangalsutra);

  // Casual Products
  const casualSilverChain = await prisma.product.create({
    data: {
      name: "Casual Silver Chain",
      slug: "casual-silver-chain",
      description: "Versatile silver chain for casual everyday wear. Lightweight and durable.",
      price: 6500,
      discountPrice: 5850,
      stock: 30,
      brand: "Eternity",
      sku: "SLV-CHAIN-001",
      tags: ["chain", "silver", "casual", "daily wear", "versatile"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.casuals.id,
    },
  });
  products.push(casualSilverChain);

  const dailyCasualPendant = await prisma.product.create({
    data: {
      name: "Daily Casual Pendant",
      slug: "daily-casual-pendant",
      description: "Simple pendant for comfortable everyday styling. Perfect for casual looks.",
      price: 6800,
      discountPrice: 6120,
      stock: 28,
      brand: "Eternity",
      sku: "SLV-PEND-001",
      tags: ["pendant", "silver", "casual", "daily wear", "simple"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.casuals.id,
    },
  });
  products.push(dailyCasualPendant);

  // Gold Bangles for wedding
  const goldenBangles = await prisma.product.create({
    data: {
      name: "Golden Wedding Bangles",
      slug: "golden-wedding-bangles",
      description: "Traditional golden bangles for traditional bridal look. Set of 2 pieces.",
      price: 28000,
      discountPrice: 25200,
      stock: 10,
      brand: "Eternity",
      sku: "GOLD-BANG-001",
      tags: ["bangles", "gold", "wedding", "bridal", "traditional"],
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"],
      isFeatured: false,
      isActive: true,
      categoryId: categories.gold.id,
    },
  });
  products.push(goldenBangles);

  return products;
}