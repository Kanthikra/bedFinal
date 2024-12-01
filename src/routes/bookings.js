import { Router } from "express";
import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import getBookingById from "../services/bookings/getBookingById.js";
import getBookings from "../services/bookings/getBookings.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";
import logger from "../utils/log.js"; // Vergeet niet de logger te importeren

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    logger.info("POST /bookings - Creating booking with data:", req.body);

    // Controleer of alle vereiste velden aanwezig zijn
    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      logger.warn("Missing required fields:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const booking = await createBooking({
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    logger.info("Booking created successfully:", booking);
    res.status(201).json(booking);
  } catch (error) {
    logger.error("Error creating booking:", error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingBooking = await getBookingById(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const updatedBooking = await updateBookingById(id, req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    logger.error("Error updating booking:", error.message);
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingBooking = await getBookingById(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const deletedBooking = await deleteBookingById(id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    logger.error("Error deleting booking:", error.message);
    next(error);
  }
});

export default router;
