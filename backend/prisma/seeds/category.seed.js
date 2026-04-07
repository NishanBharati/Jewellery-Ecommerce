export default async function seedCategories(prisma) {
  const gold = await prisma.category.upsert({
    where: { slug: "gold" },
    update: {},
    create: {
      name: "Gold",
      slug: "gold",
    },
  });

  const silver = await prisma.category.upsert({
    where: { slug: "silver" },
    update: {},
    create: {
      name: "Silver",
      slug: "silver",
    },
  });

  const diamond = await prisma.category.upsert({
    where: { slug: "diamond" },
    update: {},
    create: {
      name: "Diamond",
      slug: "diamond",
    },
  });

  const platinum = await prisma.category.upsert({
    where: { slug: "platinum" },
    update: {},
    create: {
      name: "Platinum",
      slug: "platinum",
    },
  });

  const weddingSet = await prisma.category.upsert({
    where: { slug: "wedding-set" },
    update: {},
    create: {
      name: "Wedding Set",
      slug: "wedding-set",
    },
  });

  const casuals = await prisma.category.upsert({
    where: { slug: "casuals" },
    update: {},
    create: {
      name: "Casuals",
      slug: "casuals",
    },
  });

  return { gold, silver, diamond, platinum, weddingSet, casuals };
}