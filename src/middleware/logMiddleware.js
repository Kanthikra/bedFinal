import logger from "../utils/log.js";

const logMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export default logMiddleware;
