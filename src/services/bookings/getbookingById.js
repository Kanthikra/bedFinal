import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookingById = async (id) => {
  return await prisma.booking.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      propertyId: true,
      checkinDate: true,
      checkoutDate: true,
      numberOfGuests: true,
      totalPrice: true,
      bookingStatus: true,
    },
  });
};

export default getBookingById;
