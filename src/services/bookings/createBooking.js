import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBooking = async ({
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
}) => {
  try {
    console.log("Creating booking with data:", {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });

    console.log("Booking created successfully:", newBooking);
    return newBooking;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export default createBooking;
