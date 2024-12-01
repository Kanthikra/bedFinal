import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenities = async () => {
  return await prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export default getAmenities;
