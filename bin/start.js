#!/usr/bin/env node

const path = require("path");
const https = require("https");
const { exec } = require("child_process");
const fs = require("fs-extra");

const utils = require("./utils");

const packageJson = require("../package.json");

const scripts = `"test": "nyc ts-mocha -p tsconfig.json src/test/*.spec.ts",
"dev-build": "node update-dev-import.js",
"dev": " npm run dev-build && NODE_ENV=development nodemon ./src/app.ts",
"build": "tsc && node update-build-import.js && NODE_ENV=production node ./dist/app.js",
"start": "pm2 start ./dist/app.js"`;

const getDeps = (deps) =>
    Object.entries(deps)
        .map((dep) => `${dep[0]}@${dep[1]}`)
        .toString()
        .replace(/,/g, " ")
        .replace(/^/g, "")
        // exclude the dependency only used in this file, nor relevant to the boilerplate
        .replace(/fs-extra[^\s]+/g, "");

console.log("Initializing project..");

if (!process.argv[2]) {
    exec(`npm init -f`, (initErr, initStdout, initStderr) => {
        if (initErr) {
            console.error("Error happended");
            return;
        }
        const packagePath = "../package.json";
        utils.readPackageJson(packagePath, scripts);

        const filesCopy = ["tsconfig.json", ".gitignore"]

    });
}
