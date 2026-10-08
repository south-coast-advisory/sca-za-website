// Builds the SCA logo set as outlined SVGs (no font dependency) + PNG/ICO favicons.
// usage: node scripts/build-logo.cjs <Manrope[wght].ttf from github.com/google/fonts ofl/manrope> . <previewDir>
const path = require("path");
const fs = require("fs");
const [fontPath, appDir, prevDir] = process.argv.slice(2);
const req = (m) => require(path.join(appDir, "node_modules", m));
const fontkit = req("fontkit");
const sharp = req("sharp");

const base = fontkit.openSync(fontPath);
const W = (w) => base.getVariation({ wght: w });
const NAVY = "#222D62"; // hsl(230 52% 26%) = --brand-900
const RED = "#DC071D"; //  hsl(354 94% 45%) = accent
const WHITE = "#FFFFFF";

const r = (n) => Math.round(n * 100) / 100;

// Outline a string. Returns {d, width, ink:{x1,x2}} in px; baseline at y.
function text(str, { wght, capPx, x, y, track = 0 }) {
  const f = W(wght);
  const s = capPx / f.capHeight;
  const run = f.layout(str);
  let pen = x, d = "", inkL = Infinity, inkR = -Infinity;
  run.glyphs.forEach((g, i) => {
    const pos = run.positions[i];
    const gx = pen + pos.xOffset * s;
    const cmds = g.path.commands;
    for (const c of cmds) {
      const a = c.args.map((v, k) => (k % 2 === 0 ? r(gx + v * s) : r(y - v * s)));
      d += { moveTo: "M", lineTo: "L", quadraticCurveTo: "Q", bezierCurveTo: "C", closePath: "Z" }[c.command] + a.join(" ");
    }
    const bb = g.path.bbox;
    if (cmds.length) { inkL = Math.min(inkL, gx + bb.minX * s); inkR = Math.max(inkR, gx + bb.maxX * s); }
    pen += pos.xAdvance * s + (i < run.glyphs.length - 1 ? track * capPx : 0);
  });
  return { d, width: pen - x, inkL, inkR };
}

// Red ledger square with white corner bracket, top-left at (x,y), side q.
function square(x, y, q, fill = RED, mark = WHITE, radius = 0) {
  const inset = 0.2 * q, arm = 0.5 * q, t = 0.15 * q;
  const R = x + q - inset, T = y + inset;
  const br = [[R - arm, T], [R, T], [R, T + arm], [R - t, T + arm], [R - t, T + t], [R - arm, T + t]]
    .map(([a, b]) => `${r(a)} ${r(b)}`).join("L");
  return `<rect x="${r(x)}" y="${r(y)}" width="${r(q)}" height="${r(q)}"${radius ? ` rx="${r(radius)}"` : ""} fill="${fill}"/><path d="M${br}Z" fill="${mark}"/>`;
}

// The SCA mark: letters + square. Cap top at y=0.
function mark(cap, colLetters) {
  // Manrope tops out at 800, lighter than the approved concept: thicken with a same-colour stroke.
  const sw = 0.055 * cap;
  const t = text("SCA", { wght: 800, capPx: cap, x: 0, y: cap - sw / 2, track: 0.025 });
  const q = 0.36 * cap;
  const sx = t.inkR + sw / 2 + 0.07 * cap, sy = -0.2 * cap;
  return { svg: `<path d="${t.d}" fill="${colLetters}" stroke="${colLetters}" stroke-width="${r(sw)}" stroke-linejoin="miter"/>` + square(sx, sy, q), left: t.inkL - sw / 2, right: sx + q, top: sy, bottom: cap };
}

function svgDoc(w, h, body, vbx = 0, vby = 0, title = "South Coast Advisory") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(vbx)} ${r(vby)} ${r(w)} ${r(h)}" width="${r(w)}" height="${r(h)}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
}

// Horizontal lockup.
function lockup(c) {
  const cap = 100;
  const m = mark(cap, c.letters);
  const wx = m.right + 0.3 * cap;
  // Compact (header) drops EST. 1980 — unreadable at 44px — and enlarges the wordmark.
  const wc = c.compact ? 0.37 * cap : 0.31 * cap;
  const b1 = c.compact ? 0.4 * cap : wc, b2 = c.compact ? 0.91 * cap : wc + 0.42 * cap;
  const l1 = text("South Coast", { wght: 800, capPx: wc, x: wx, y: b1, track: -0.01 });
  const l2 = text("Advisory", { wght: 800, capPx: wc, x: wx, y: b2, track: -0.01 });
  const est = c.compact ? { d: "", inkR: 0 } : text("EST. 1980", { wght: 700, capPx: 0.115 * cap, x: wx, y: cap, track: 0.16 });
  const right = Math.max(l1.inkR, l2.inkR, est.inkR);
  const pad = 2;
  const body = m.svg + `<path d="${l1.d}${l2.d}" fill="${c.words}"/><path d="${est.d}" fill="${c.est}"/>`;
  return svgDoc(right - m.left + pad * 2, cap - m.top + pad * 2, body, m.left - pad, m.top - pad);
}

// Mark alone (SCA + square).
function markOnly(letters) {
  const m = mark(100, letters);
  const pad = 2;
  return svgDoc(m.right - m.left + pad * 2, m.bottom - m.top + pad * 2, m.svg, m.left - pad, m.top - pad, "SCA");
}

// App icon: SCA mark centred in a rounded square.
function appIcon(bg, letters, size = 512) {
  const m = mark(100, letters);
  const mw = m.right - m.left, mh = m.bottom - m.top;
  const k = (size * 0.74) / mw;
  const ox = (size - mw * k) / 2 - m.left * k, oy = (size - mh * k) / 2 - m.top * k;
  const body = `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${bg}"/><g transform="translate(${r(ox)} ${r(oy)}) scale(${r(k * 1000) / 1000})">${m.svg}</g>`;
  return svgDoc(size, size, body, 0, 0, "SCA");
}

// Favicon: the red square alone, full bleed with a small radius.
function faviconSquare(size = 512) {
  return svgDoc(size, size, square(0, 0, size, RED, WHITE, size * 0.12), 0, 0, "SCA");
}

const out = path.join(appDir, "public", "brand");
const files = {
  "logo.svg": lockup({ letters: NAVY, words: NAVY, est: NAVY }),
  "logo-compact.svg": lockup({ letters: NAVY, words: NAVY, est: NAVY, compact: true }),
  "logo-compact-white.svg": lockup({ letters: WHITE, words: WHITE, est: WHITE, compact: true }),
  "logo-white.svg": lockup({ letters: WHITE, words: WHITE, est: WHITE }),
  "mark.svg": markOnly(NAVY),
  "mark-white.svg": markOnly(WHITE),
  "icon-app.svg": appIcon(WHITE, NAVY),
  "icon-app-navy.svg": appIcon(NAVY, WHITE),
  "favicon.svg": faviconSquare(),
};
for (const [n, s] of Object.entries(files)) fs.writeFileSync(path.join(out, n), s);

(async () => {
  const png = (svg, w, file) => sharp(Buffer.from(svg), { density: 600 }).resize(w).png().toFile(file);
  // Production favicons (red square) + apple/app icon (SCA on white).
  await png(files["favicon.svg"], 192, path.join(out, "favicon-192.png"));
  await png(files["icon-app.svg"], 512, path.join(out, "favicon-512.png"));
  await png(files["icon-app.svg"], 512, path.join(out, "icon.png"));
  // ICO with 16/32/48 PNG entries.
  const sizes = [16, 32, 48];
  const bufs = await Promise.all(sizes.map((s) => sharp(Buffer.from(files["favicon.svg"]), { density: 600 }).resize(s).png().toBuffer()));
  const hdr = Buffer.alloc(6 + 16 * sizes.length);
  hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(sizes.length, 4);
  let off = hdr.length;
  sizes.forEach((s, i) => {
    const e = 6 + i * 16;
    hdr.writeUInt8(s, e); hdr.writeUInt8(s, e + 1); hdr.writeUInt16LE(1, e + 4); hdr.writeUInt16LE(32, e + 6);
    hdr.writeUInt32LE(bufs[i].length, e + 8); hdr.writeUInt32LE(off, e + 12); off += bufs[i].length;
  });
  fs.writeFileSync(path.join(appDir, "src", "app", "favicon.ico"), Buffer.concat([hdr, ...bufs]));

  // Previews.
  fs.mkdirSync(prevDir, { recursive: true });
  await png(files["logo.svg"], 1400, path.join(prevDir, "logo.png"));
  await png(files["logo-compact.svg"], 1400, path.join(prevDir, "logo-compact.png"));
  await sharp(Buffer.from(files["logo-white.svg"]), { density: 600 }).resize(1400).flatten({ background: "#4D61C7" }).png().toFile(path.join(prevDir, "logo-white-on-footer.png"));
  for (const s of [16, 32]) {
    await png(files["icon-app.svg"], s, path.join(prevDir, `sca-${s}.png`));
    await png(files["favicon.svg"], s, path.join(prevDir, `square-${s}.png`));
  }
  console.log("done");
})();
