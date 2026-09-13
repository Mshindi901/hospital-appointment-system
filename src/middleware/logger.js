import morgan from "morgan";
import logger from "../config/logger.js";

const stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

const httpLogger = morgan("combined", {
    stream
});

export default httpLogger;