// Writes shell.json: a short content hash for every app-shell file listed in sw.js, so the service worker
// downloads only the files that changed since the last version (the rest are copied from the old cache).
// Usage: node tools/shell-manifest.js          (tests/shell.js fails when shell.json is stale)
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.resolve(__dirname, "..");
function build(){
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  const shell = JSON.parse(sw.match(/const SHELL = (\[[^\]]*\]);/)[1]);
  const files = {};
  for (const p of shell) { const f = path.join(root, p === "./" ? "index.html" : p);
    files[p] = crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex").slice(0, 12); }
  return { version: sw.match(/const VERSION = "([^"]+)"/)[1], files };
}
if (require.main === module) { fs.writeFileSync(path.join(root, "shell.json"), JSON.stringify(build(), null, 1) + "\n"); console.log("shell.json written"); }
module.exports = { build };
