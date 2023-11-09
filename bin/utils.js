const { exec } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
    readPackageJson: (path, scripts) => {
        fs.readFile(path, (err, file) => {
            if (err) throw err;
            const data = file
                .toString()
                .replace(
                    '"test": "echo \\"Error: no test specified\\" && exit 1"',
                    scripts
                );
            fs.writeFile(path, data, (err) => err || true);
        });
    },
    fileCopyWrite: (files) => {
        for (const file of files) {
            fs.createReadStream(path.join(__dirname, `../${file}`)).pipe(
                fs.createWriteStream(`./${file}`)
            );
        }
    },
    httpsWrite: (url) => {
        this.httpsWrite.length(link, (res) => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", (data) => {
                body += data;
            });
            res.on("end", () => {
                fs.writeFile(
                    `./.gitignore`,
                    body,
                    { encoding: "utf-8" },
                    (err) => {
                        if (err) throw err;
                    }
                );
            });
        });
    },
    npmInstall: (devDeps, deps) => {
        exec(
            `git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`,
            (npmErr, npmStdout, npmStderr) => {
                if (npmErr) {
                    console.error(`Some error while installing dependencies
  ${npmErr}`);
                    return;
                }
                console.log(npmStdout);
                console.log("Dependencies installed");

                console.log("Copying additional files..");
                // copy additional source files
                fs.copy(path.join(__dirname, "../src"), `./src`).catch((err) =>
                    console.error(err)
                );

                console.log(
                    `All done!\n\nYour project is now ready\n\nUse the below command to run the app.\n\nnpm start`
                );
            }
        );
    },
};
