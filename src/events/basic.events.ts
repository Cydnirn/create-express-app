import appListener from "#config/event";
import { logger } from "#utils/Logger";

export default function basicEvent() {
    appListener.on("event", () => {
        logger.info("Event triggered");
    });
}
