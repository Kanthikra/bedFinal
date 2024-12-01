import { Router } from "express";
import createAmenity from "../services/amenities/createAmenity.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import getAmenities from "../services/amenities/getAmenities.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";
import logger from "../utils/log.js"; // Vergeet niet de logger te importeren

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const amenities = await getAmenities({ name });
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;
    logger.info("POST /amenities - Creating amenity with data:", req.body);

    // Controleer of alle vereiste velden aanwezig zijn
    if (!name) {
      logger.warn("Missing required fields:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const amenity = await createAmenity({ name });
    logger.info("Amenity created successfully:", amenity);
    res.status(201).json(amenity);
  } catch (error) {
    logger.error("Error creating amenity:", error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const amenity = await getAmenityById(req.params.id);
    if (amenity) {
      res.status(200).json(amenity);
    } else {
      res.status(404).json({ message: "Amenity not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingAmenity = await getAmenityById(id);
    if (!existingAmenity) {
      return res.status(404).json({ message: "Amenity not found" });
    }

    const updatedAmenity = await updateAmenityById(id, req.body);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    logger.error("Error updating amenity:", error.message);
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingAmenity = await getAmenityById(id);
    if (!existingAmenity) {
      return res.status(404).json({ message: "Amenity not found" });
    }

    const deletedAmenity = await deleteAmenityById(id);
    res.status(200).json({ message: "Amenity deleted successfully" });
  } catch (error) {
    logger.error("Error deleting amenity:", error.message);
    next(error);
  }
});

export default router;
