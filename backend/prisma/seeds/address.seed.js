export default async function seedAddress(prisma, user) {
  const address = await prisma.address.create({
    data: {
      userId: user.id,
      fullName: "Test User",
      phone: "9800000000",
      country: "Nepal",
      state: "Bagmati",
      city: "Kathmandu",
      area: "Thamel",
      zipCode: "44600",
      isDefault: true,
    },
  });

  return address;
}
