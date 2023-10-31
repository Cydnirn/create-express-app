import "node";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "production" | "development" | "testing";
            PORT: string;
            origin: string;
        }
    }
}
