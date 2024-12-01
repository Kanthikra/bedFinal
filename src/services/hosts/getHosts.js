import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async () => {
  return await prisma.host.findMany({
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

export default getHosts;
