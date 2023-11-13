import { Application } from "express";
import expressLoader from "./express-loader";
import listenerLoader from "./listener-loader";

export default async function loader(app: Application) {
    expressLoader(app);
    listenerLoader();
}
