const root = require('child_process').execSync('npm root -g').toString().trim();
const fs = require('fs');
const deps = JSON.parse(fs.readFileSync('./deps.json').toString());


var req = "";
var modExp = [];
for( let m of deps ) {
    const path = `${root}/${m}`;
    const name = m.replace('-', '');
    req += `const ${name} = require('${path}');\n`;
    modExp.push(`${name}`);
}

req += `module.exports = { ${modExp.join(', ')} }`;



fs.writeFileSync('./loader.js', req);