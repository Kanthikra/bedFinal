import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (query) => {
  return await prisma.property.findMany({
    where: query,
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathRoomCount: true,
      maxGuestCount: true,
      hostId: true,
      rating: true,
    },
  });
};

export default getProperties;
