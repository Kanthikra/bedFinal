import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAmenityById = async (id, amenityData) => {
  return await prisma.amenity.update({
    where: { id },
    data: amenityData,
  });
};

export default updateAmenityById;
