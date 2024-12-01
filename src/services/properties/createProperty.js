import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProperty = async ({
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating,
}) => {
  try {
    console.log("Creating property with data:", {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating,
      },
    });

    console.log("Property created successfully:", newProperty);
    return newProperty;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

export default createProperty;
