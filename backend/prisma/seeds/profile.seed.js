export default async function seedProfile(prisma, user) {
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      phone: "9800000000",
      gender: "MALE",
    },
  });

  return profile;
}