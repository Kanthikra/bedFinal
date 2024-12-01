import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHostById = async (id, hostData) => {
  return await prisma.host.update({
    where: { id },
    data: hostData,
  });
};

export default updateHostById;
