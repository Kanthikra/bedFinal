import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAmenity = async ({ name }) => {
  try {
    console.log("Creating amenity with data:", { name });

    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }

    const newAmenity = await prisma.amenity.create({
      data: { name },
    });

    console.log("Amenity created successfully:", newAmenity);
    return newAmenity;
  } catch (error) {
    console.error("Error creating amenity:", error);
    throw error;
  }
};

export default createAmenity;
