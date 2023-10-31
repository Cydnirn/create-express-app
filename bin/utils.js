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
};
