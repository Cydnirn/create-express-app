import { NextFunction, Request, Response, Router } from "express";

import basicRoutes from "./basic-routes";
import Respond from "#utils/Respond";

export default function rootRoutes() {
    const router = Router();
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Hello");
            return Respond.OK(res, "Test", null);
        } catch (err) {
            console.log(err);
        }
    });
    router.use("/hello", basicRoutes());
    return router;
}
