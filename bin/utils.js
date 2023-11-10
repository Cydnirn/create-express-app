const { exec } = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const https = require("https");

module.exports = {
    readPackageJson: (path, scripts, replacer) => {
        fs.readFile(path, (err, file) => {
            if (err) throw err;
            let data = "";
            for (let i = 0; i < scripts.length; i++) {
                if (i == 0) {
                    data = file.toString().replace(replacer[i], scripts[i]);
                }
                data = data.toString().replace(replacer[i], scripts[i]);
            }
            fs.writeFile(path, data, (err) => err || true);
        });
    },
    fileCopyWrite: (files, dir) => {
        for (const file of files) {
            fs.createReadStream(path.join(__dirname, `../${file}`)).pipe(
                fs.createWriteStream(!dir ? `./${file}` : `${dir}/${file}`)
            );
        }
    },
    httpsWrite: (url, dir) => {
        https.get(url, (res) => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", (data) => {
                body += data;
            });
            res.on("end", () => {
                fs.writeFile(
                    !dir ? `./.gitignore` : `${dir}/.gitignore`,
                    body,
                    { encoding: "utf-8" },
                    (err) => {
                        if (err) throw err;
                    }
                );
            });
        });
    },
    npmInstall: (devDeps, deps, dir) => {
        exec(
            !dir
                ? `git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`
                : `cd ${dir} && git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`,
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
                fs.copy(
                    path.join(__dirname, "../src"),
                    !dir ? `./src` : `${dir}/src`
                ).catch((err) => console.error(err));

                console.log(
                    `All done!\n\nYour project is now ready\n\nUse the below command to run the app.\n\nnpm run dev`
                );
            }
        );
    },
};
