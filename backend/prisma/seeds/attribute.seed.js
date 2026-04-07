export default async function seedAttributes(prisma, products) {
  // Attributes for Gold Necklace
  await prisma.attribute.create({
    data: {
      productId: products[0].id,
      material: "Gold",
      purity: "22K",
      weight: 15.5,
      gemstoneType: "Pearl",
      gemstoneColor: "White",
      size: "Medium",
    },
  });

  // Attributes for Gold Bracelet
  await prisma.attribute.create({
    data: {
      productId: products[1].id,
      material: "Gold",
      purity: "18K",
      weight: 12.3,
      gemstoneType: "Cubic Zirconia",
      gemstoneColor: "Clear",
      size: "L",
    },
  });

  // Attributes for Silver Earrings
  await prisma.attribute.create({
    data: {
      productId: products[2].id,
      material: "Silver",
      purity: "925",
      weight: 3.5,
      gemstoneType: null,
      gemstoneColor: null,
      size: "Regular",
    },
  });

  // Attributes for Silver Ring
  await prisma.attribute.create({
    data: {
      productId: products[3].id,
      material: "Silver",
      purity: "925",
      weight: 4.2,
      gemstoneType: null,
      gemstoneColor: null,
      size: "Medium",
    },
  });

  // Attributes for Diamond Necklace
  await prisma.attribute.create({
    data: {
      productId: products[4].id,
      material: "Gold",
      purity: "18K",
      weight: 18.5,
      gemstoneType: "Diamond",
      gemstoneColor: "White",
      gemstoneWeight: 2.5,
      size: "Medium",
    },
  });

  // Attributes for Diamond Ring
  await prisma.attribute.create({
    data: {
      productId: products[5].id,
      material: "Gold",
      purity: "18K",
      weight: 5.8,
      gemstoneType: "Diamond",
      gemstoneColor: "White",
      gemstoneWeight: 1.2,
      size: "Medium",
    },
  });

  // Attributes for Platinum Bracelet
  await prisma.attribute.create({
    data: {
      productId: products[6].id,
      material: "Platinum",
      purity: "950",
      weight: 22.5,
      gemstoneType: "Diamond",
      gemstoneColor: "White",
      gemstoneWeight: 1.8,
      size: "L",
    },
  });

  // Attributes for Platinum Ring
  await prisma.attribute.create({
    data: {
      productId: products[7].id,
      material: "Platinum",
      purity: "950",
      weight: 8.2,
      gemstoneType: null,
      gemstoneColor: null,
      size: "Medium",
    },
  });

  // Attributes for Mangalsutra
  await prisma.attribute.create({
    data: {
      productId: products[8].id,
      material: "Gold",
      purity: "22K",
      weight: 20.5,
      gemstoneType: "Pearl",
      gemstoneColor: "Black",
      size: "One Size",
    },
  });

  // Attributes for Silver Chain
  await prisma.attribute.create({
    data: {
      productId: products[9].id,
      material: "Silver",
      purity: "925",
      weight: 6.5,
      gemstoneType: null,
      gemstoneColor: null,
      size: "Long",
    },
  });

  // Attributes for Pendant
  await prisma.attribute.create({
    data: {
      productId: products[10].id,
      material: "Gold",
      purity: "18K",
      weight: 4.5,
      gemstoneType: "Cubic Zirconia",
      gemstoneColor: "Blue",
      size: "Small",
    },
  });

  // Attributes for Bangles
  await prisma.attribute.create({
    data: {
      productId: products[11].id,
      material: "Gold",
      purity: "22K",
      weight: 35.0,
      gemstoneType: "Pearl",
      gemstoneColor: "White",
      size: "Medium",
    },
  });
}