import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import logger from "../utils/log.js";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    logger.info("Login request body:", req.body);

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      logger.warn("Invalid credentials for username:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    logger.error("Error in login:", error);
    next(error);
  }
});

export default router;
