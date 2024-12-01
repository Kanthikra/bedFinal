import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHostById = async (id) => {
  return await prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });
};

export default getHostById;
