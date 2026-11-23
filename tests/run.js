// Runs every 재잘 test: content check, browser suites on file://, PWA/iPhone suites over a local HTTP server, and a speed probe.
// Usage: npm test   (or: node tests/run.js [only-name ...])
const { spawn } = require('child_process'); const http = require('http'); const fs = require('fs'); const path = require('path');
const root = path.resolve(__dirname, '..'), out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
const run = (file, args) => new Promise(resolve => { const t0 = Date.now(); let txt = '';
  const ch = spawn(process.execPath, [path.join(__dirname, file), ...args], { cwd: root }); ch.stdout.on('data', d => txt += d); ch.stderr.on('data', d => txt += d);
  ch.on('close', code => resolve({ code, txt, ms: Date.now() - t0 })); });
(async () => {
  await new Promise(r => server.listen(0, r)); const base = 'http://localhost:' + server.address().port; const index = path.join(root, 'index.html');
  const suites = [['check-content', [path.join(root, 'content.js')]], ['shell', []], ...['regression', 'ux', 'placement', 'words', 'talk', 'game', 'ladder', 'abroad'].map(n => [n, [index, out]]),
    ['curriculum', [index]], ['speakout', [index, out]], ['wordcourse', [index, out]], ['grade', [index, out]], ['cloze', [index, out]], ['climb', [index, out]], ['goals', [index, out]], ['dict', [index, out]], ['pron', [index, out]], ['pwa', [base, out]], ['ios', [base, out]], ['perf', ['file://' + index]]];
  const only = process.argv.slice(2); let failed = 0;
  for (const [name, args] of suites) { if (only.length && !only.includes(name)) continue;
    const r = await run(name + '.js', args);
    const bad = r.code !== 0 || /FAIL|pageerror|Error:/.test(r.txt) || /"errs":\s*\[\s*"/.test(r.txt);
    if (bad) failed++;
    console.log(`${bad ? 'FAIL' : 'PASS'}  ${name.padEnd(13)} ${(r.ms / 1000).toFixed(1)}s${name === 'perf' ? '  ' + r.txt.trim() : ''}`);
    if (bad) console.log(r.txt.split('\n').filter(l => /FAIL|rror|errs/.test(l)).slice(0, 12).join('\n'));
  }
  server.close(); console.log(failed ? `\n${failed} suite(s) failed` : '\nall suites passed'); process.exit(failed ? 1 : 0);
})();
