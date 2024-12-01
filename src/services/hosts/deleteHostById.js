import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteHostById = async (id) => {
  return await prisma.host.delete({
    where: { id },
  });
};

export default deleteHostById;
