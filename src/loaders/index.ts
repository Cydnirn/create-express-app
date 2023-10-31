import { Application } from "express";
import expressLoader from "./express-loader";

export default async function loader(app: Application) {
    expressLoader(app);
}
