import { Router } from "express";
import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import getProperties from "../services/properties/getProperties.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";
import logger from "../utils/log.js"; // Vergeet niet de logger te importeren

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties({
      location,
      pricePerNight,
      amenities,
    });
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    logger.info("POST /properties - Creating property with data:", req.body);

    // Controleer of alle vereiste velden aanwezig zijn
    if (!title || !description || !location || !pricePerNight) {
      logger.warn("Missing required fields:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const property = await createProperty({
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

    logger.info("Property created successfully:", property);
    res.status(201).json(property);
  } catch (error) {
    logger.error("Error creating property:", error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingProperty = await getPropertyById(id);
    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const updatedProperty = await updatePropertyById(id, req.body);
    res.status(200).json(updatedProperty);
  } catch (error) {
    logger.error("Error updating property:", error.message);
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingProperty = await getPropertyById(id);
    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const deletedProperty = await deletePropertyById(id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    logger.error("Error deleting property:", error.message);
    next(error);
  }
});

export default router;
