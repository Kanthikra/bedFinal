import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (query) => {
  return await prisma.user.findMany({
    where: query,
  });
};

export default getUsers;
