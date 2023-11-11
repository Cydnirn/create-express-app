#!/usr/bin/env node

const { exec } = require("child_process");

const utils = require("./utils");

const packageJson = require("../package.json");

const scripts = `"test": "nyc ts-mocha -p tsconfig.json src/test/*.spec.ts",
"dev-build": "node update-dev-import.js",
"dev": " npm run dev-build && NODE_ENV=development nodemon ./src/app.ts",
"build": "tsc && node update-build-import.js",
"start": "npm run build && pm2 start ./dist/app.js",
 "stop": "pm2 delete app"`;

const imports = `
"imports": {
    "#models/*": "./dist/models/*.js",
    "#routes/*": "./dist/routes/*.js",
    "#controllers/*": "./dist/controllers/*.js",
    "#utils/*": "./dist/utils/*.js",
    "#class/*": "./dist/class/*.js",
    "#events/*": "./dist/events/*.js",
    "#config/*": "./dist/config/*.js",
    "#loaders/*": "./dist/loaders/*.js"
  },
`;

const getDeps = (deps) =>
    Object.entries(deps)
        .map((dep) => `${dep[0]}@${dep[1]}`)
        .toString()
        .replace(/,/g, " ")
        .replace(/^/g, "")
        // exclude the dependency only used in this file, nor relevant to the boilerplate
        .replace(/[^]fs-extra[^\s]+/g, "");

console.log("Initializing project..");

function main(initErr, initStdout, initStderr, dir) {
    if (initErr) {
        console.error(`Problem occured: ${initErr}`);
        return;
    }
    const packagePath = !dir ? "./package.json" : `${dir}/package.json`;
    const scriptReplace =
        '"test": "echo \\"Error: no test specified\\" && exit 1"';
    const importReplace = `"keywords": [],`;
    utils.readPackageJson(
        packagePath,
        [scripts, imports],
        [scriptReplace, importReplace]
    );

    const filesCopy = [
        "tsconfig.json",
        "update-dev-import.js",
        "update-build-import.js",
        "Dockerfile",
        ".gitignore",
        ".dockerignore",
        "Readme.md",
        ".env.production",
        ".env.development",
        "Readme.md",
    ];

    utils.fileCopyWrite(filesCopy, dir);

    /*
    utils.httpsWrite(
        "https://raw.githubusercontent.com/Cydnirn/basic-gitignore/main/.gitignore"
    );
    */

    console.log("npm init --done\n");

    //Installing dependencies

    console.log("Installing deps -- Might take a few minutes");
    const devDeps = getDeps(packageJson.devDependencies);
    const deps = getDeps(packageJson.dependencies);

    utils.npmInstall(devDeps, deps, dir);
}

if (!process.argv[2]) {
    exec(`npm init -f`, (initErr, initStdout, initStderr) => {
        main(initErr, initStdout, initStderr);
    });
} else {
    exec(
        `mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
        (initErr, initStdout, initStderr) => {
            main(initErr, initStdout, initStderr, process.argv[2]);
        }
    );
}
