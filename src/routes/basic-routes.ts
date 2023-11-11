import { NextFunction, Request, Response, Router } from "express";
import Controller from "#controllers/basicController";
import Respond from "#utils/Respond";
import validate from "#utils/Validation";
import { body } from "express-validator";

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
    router
        .route("/validate")
        .post(
            validate([body("username").trim().isString().notEmpty()]),
            (req: Request, res: Response, next: NextFunction) => {
                try {
                    return Respond.OK(
                        res,
                        `Your username is ${req.body.username}`,
                        null
                    );
                } catch (err) {
                    next(err);
                }
            }
        );
    return router;
}
