import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenityById = async (id) => {
  return await prisma.amenity.delete({
    where: { id },
  });
};

export default deleteAmenityById;
