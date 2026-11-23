// shell.json must match the files listed in sw.js (run `node tools/shell-manifest.js` after changing app files)
const fs = require("fs"), path = require("path"); const { build } = require("../tools/shell-manifest.js");
const want = build(), have = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "shell.json"), "utf8"));
const stale = Object.keys(want.files).filter(p => have.files[p] !== want.files[p]);
if (have.version !== want.version) stale.push("version");
console.log(JSON.stringify({ files: Object.keys(want.files).length, stale }));
if (stale.length) { console.log("FAIL shell.json is stale: run node tools/shell-manifest.js"); process.exit(1); }
