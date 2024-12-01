import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
  return await prisma.property.delete({
    where: { id },
  });
};

export default deletePropertyById;
