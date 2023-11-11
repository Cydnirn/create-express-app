import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    ORIGIN: process.env.ORIGIN,
};

export default env;
