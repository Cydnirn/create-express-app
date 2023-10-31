import { NextFunction, Request, Response, Router } from "express";
import Controller from "#controllers/basicController";
import Respond from "#utils/Respond";

const ControllerInstance = new Controller();

export default function basicRoutes() {
    const router = Router();
    router.route("/").get((req: Request, res: Response, next: NextFunction) => {
        console.log("Hello world");
        (async (req: Request, res: Response, next: NextFunction) => {
            try {
                const message = ControllerInstance.generateText("World");
                return Respond.OK(res, message, null);
            } catch (err) {
                next(err);
            }
        })(req, res, next);
    });
    return router;
}
