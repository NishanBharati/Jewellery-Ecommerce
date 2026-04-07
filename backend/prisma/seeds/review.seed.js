export default async function seedReview(prisma, user, products) {
  // Review for Classic Gold Necklace
  await prisma.review.create({
    data: {
      userId: user.id,
      productId: products[0].id,
      rating: 5,
      comment: "Absolutely stunning necklace! Perfect for special occasions. Excellent quality and delivery was on time.",
      images: [],
      isVerified: true,
    },
  });

  // Review for Diamond Bridal Necklace
  await prisma.review.create({
    data: {
      userId: user.id,
      productId: products[4].id,
      rating: 4,
      comment: "Beautiful piece, very elegant. Worth the price. Would recommend to anyone looking for bridal jewelry.",
      images: [],
      isVerified: true,
    },
  });

  // Review for Royal Gold Bracelet
  await prisma.review.create({
    data: {
      userId: user.id,
      productId: products[1].id,
      rating: 5,
      comment: "Exceptional craftsmanship and design. This bracelet is a real statement piece.",
      images: [],
      isVerified: true,
    },
  });

  // Review for Silver Grace Earrings
  await prisma.review.create({
    data: {
      userId: user.id,
      productId: products[2].id,
      rating: 4,
      comment: "Simple yet elegant. Very comfortable to wear for long hours. Great value for money.",
      images: [],
      isVerified: true,
    },
  });

  // Review for Casual Silver Chain
  await prisma.review.create({
    data: {
      userId: user.id,
      productId: products[9].id,
      rating: 5,
      comment: "Perfect for everyday wear. High quality silver, doesn't tarnish easily. Highly recommended!",
      images: [],
      isVerified: true,
    },
  });

  return true;
}
