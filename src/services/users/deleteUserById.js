import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserById = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export default deleteUserById;
