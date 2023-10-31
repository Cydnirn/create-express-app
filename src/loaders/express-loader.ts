import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import fs from "fs";

import env from "#config/index";

import rootRoutes from "#routes/root-routes";
import Respond from "#utils/Respond";

const corsOption: CorsOptions = {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: env.ORIGIN,
    credentials: true,
    maxAge: 300,
};

export default function expressLoader(app: Application) {
    return (async (app: Application) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors(corsOption));
        app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );
        app.enable("trust proxy");
        app.get("/", (req: Request, res: Response, next: NextFunction) => {
            Respond.OK(res, "Healthy", null);
        });
        app.use("/api", rootRoutes());

        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (!fs.existsSync("/log")) {
                fs.mkdirSync("/log", { recursive: true });
            }
            if (res.headersSent) {
                return next(err);
            }
            res.status(500).json("Hello");
        });
        return app;
    })(app);
}
