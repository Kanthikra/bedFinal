import { Router } from "express";
import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import getHostById from "../services/hosts/getHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";
import logger from "../utils/log.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts({ name });
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    logger.info("POST /hosts - Creating host with data:", req.body);

    // Controleer of alle vereiste velden aanwezig zijn
    if (!username || !password || !name || !email) {
      logger.warn("Missing required fields:", req.body);
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const host = await createHost({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    logger.info("Host created successfully:", host);
    res.status(201).json(host);
  } catch (error) {
    logger.error("Error creating host:", error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (host) {
      res.status(200).json(host);
    } else {
      res.status(404).json({ message: "Host not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingHost = await getHostById(id);
    if (!existingHost) {
      return res.status(404).json({ message: "Host not found" });
    }

    const updatedHost = await updateHostById(id, req.body);
    res.status(200).json(updatedHost);
  } catch (error) {
    console.error("Error updating host:", error);
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingHost = await getHostById(id);
    if (!existingHost) {
      return res.status(404).json({ message: "Host not found" });
    }

    const deletedHost = await deleteHostById(id);
    res.status(200).json({ message: "Host deleted successfully" });
  } catch (error) {
    console.error("Error deleting host:", error);
    next(error);
  }
});

export default router;
