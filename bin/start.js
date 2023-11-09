#!/usr/bin/env node

const { exec } = require("child_process");

const utils = require("./utils");

const packageJson = require("../package.json");

const scripts = `"test": "nyc ts-mocha -p tsconfig.json src/test/*.spec.ts",
"dev-build": "node update-dev-import.js",
"dev": " npm run dev-build && NODE_ENV=development nodemon ./src/app.ts",
"build": "tsc && node update-build-import.js",
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

function main(initErr, initStdout, initStderr) {
    if (initErr) {
        console.error(`Problem occured: ${initErr}`);
        return;
    }
    const packagePath = "../package.json";
    utils.readPackageJson(packagePath, scripts);

    const filesCopy = ["tsconfig.json", ".gitignore"];

    utils.fileCopyWrite(filesCopy);

    utils.httpsWrite(
        "https://raw.githubusercontent.com/Cydnirn/basic-gitignore/main/.gitignore"
    );

    console.log("npm init --done\n");

    //Installing dependencies

    console.log("Installing deps -- Might take a few minutes");
    const devDeps = getDeps(packageJson.devDependencies);
    const deps = getDeps(packageJson.dependencies);

    utils.npmInstall(devDeps, deps);
}

if (!process.argv[2]) {
    exec(`npm init -f`, (initErr, initStdout, initStderr) => {
        main(initErr, initStdout, initStderr);
    });
} else {
    exec(
        `mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
        (initErr, initStdout, initStderr) => {
            main(initErr, initStdout, initStderr);
        }
    );
}
