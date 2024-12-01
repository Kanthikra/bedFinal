import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createHost = async ({
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe,
}) => {
  try {
    console.log("Creating host with data:", {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    const newHost = await prisma.host.create({
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    console.log("Host created successfully:", newHost);
    return newHost;
  } catch (error) {
    console.error("Error creating host:", error);
    throw error;
  }
};

export default createHost;
