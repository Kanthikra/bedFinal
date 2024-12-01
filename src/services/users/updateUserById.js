import { PrismaClient } from "@prisma/client";
import logger from "../../utils/log.js";

const prisma = new PrismaClient();

const updateUserById = async (id, userData) => {
  try {
    logger.info("Updating user with ID:", id, "and data:", userData);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });

    logger.info("User updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    logger.error("Error updating user:", error);
    throw error;
  }
};

export default updateUserById;
