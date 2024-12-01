import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteBookingById = async (id) => {
  return await prisma.booking.delete({
    where: { id },
  });
};

export default deleteBookingById;
