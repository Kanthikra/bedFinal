import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateBookingById = async (id, bookingData) => {
  return await prisma.booking.update({
    where: { id },
    data: bookingData,
  });
};

export default updateBookingById;
