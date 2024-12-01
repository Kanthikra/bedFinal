import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePropertyById = async (id, propertyData) => {
  return await prisma.property.update({
    where: { id },
    data: propertyData,
  });
};

export default updatePropertyById;
