import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenityById = async (id) => {
  return await prisma.amenity.findUnique({
    where: { id },
  });
};

export default getAmenityById;
