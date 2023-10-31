const fs = require('fs');

const packageJsonPath = './package.json';

const updateImports = () => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  for (const [pattern, replacement] of Object.entries(packageJson.imports)) {
    const updatedReplacement = replacement.replace(/\.ts$/, '.js').replace(/^\.\/src/, './dist');
    packageJson.imports[pattern] = updatedReplacement;
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
};

updateImports();