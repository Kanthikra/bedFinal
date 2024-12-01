import { Router } from "express";
import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";
import logger from "../utils/log.js"; // Vergeet niet de logger te importeren

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { propertyId, userId } = req.query;
    const reviews = await getReviews({ propertyId, userId });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, comment, rating } = req.body;
    logger.info("POST /reviews - Creating review with data:", req.body);

    // Controleer of alle vereiste velden aanwezig zijn
    if (!userId || !propertyId || !comment || !rating) {
      logger.warn("Missing required fields:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const review = await createReview({
      userId,
      propertyId,
      comment,
      rating,
    });

    logger.info("Review created successfully:", review);
    res.status(201).json(review);
  } catch (error) {
    logger.error("Error creating review:", error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingReview = await getReviewById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const updatedReview = await updateReviewById(id, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    logger.error("Error updating review:", error.message);
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingReview = await getReviewById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const deletedReview = await deleteReviewById(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    logger.error("Error deleting review:", error.message);
    next(error);
  }
});

export default router;
