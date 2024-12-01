import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (query) => {
  return await prisma.booking.findMany({
    where: query,
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

export default getBookings;
