import { Router } from "express";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";
import logger from "../utils/log.js"; // Vergeet niet de logger te importeren

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    logger.info("POST /users - Creating user with data:", req.body);

    // Controleer of alle vereiste velden aanwezig zijn
    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture
    ) {
      logger.warn("Missing required fields:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newUser = await createUser({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    logger.info("User created successfully:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error("Error creating user:", error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, name, email, phoneNumber, profilePicture } = req.body;
    if (!username || !name || !email || !phoneNumber || !profilePicture) {
      logger.warn("Missing required fields in update request:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const updatedUser = await updateUserById(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error("Error updating user:", error);
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await deleteUserById(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Error deleting user:", error);
    next(error);
  }
});

export default router;
