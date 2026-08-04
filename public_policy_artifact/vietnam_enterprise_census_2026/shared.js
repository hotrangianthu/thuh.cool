"use strict";

const SA = {
  forestDark: "062416", forest: "0B3D2A", forestMid: "14543B", forestSoft: "DDE8DF",
  gold: "C6A447", goldMuted: "8C7A3A", ivory: "F6F1DF", paper: "FBFAF3", white: "FFFFFF",
  ink: "17211B", muted: "66746B", grid: "D8DED8", positive: "16894F", watch: "D09B2C", risk: "B6423C",
  paleGold: "F2EBD6", paleRed: "F6E2E0", paleGray: "F2F4F2"
};

const FONT = "Roboto";
const URL_ARTICLE = "https://vnexpress.net/ca-nuoc-co-gan-860-000-doanh-nghiep-dang-hoat-dong-5097010.html";
const URL_CENSUS = "https://www.nso.gov.vn/bai-top/2026/06/ket-qua-so-bo-tong-dieu-tra-kinh-te-nam-2026/";
const URL_POLICY = "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-68-nq-tw-ve-phat-trien-kinh-te-tu-nhan-119250505101309949.htm";

function addText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h, fontFace: FONT, fontSize: 11, color: SA.ink,
    margin: 0, breakLine: false, valign: "mid", ...opts
  });
}

function addCoverLogo(slide, ctx) {
  slide.addImage({ path: ctx.logoPath, x: 0.42, y: 6.25, w: 2.2, h: 0.7 });
}

function addWatermark(slide, ctx) {
  slide.addShape(ctx.pptx.ShapeType.rect, {
    x: 11.72, y: 7.03, w: 1.35, h: 0.42,
    fill: { color: SA.forestDark }, line: { color: SA.forestDark, transparency: 100 }
  });
  slide.addImage({ path: ctx.logoPath, x: 11.79, y: 7.07, w: 1.2, h: 0.34 });
}

function addChrome(slide, ctx, tracker, title, source, opts = {}) {
  slide.background = { color: opts.bg || SA.white };
  addText(slide, tracker.toUpperCase(), 0.5, 0.25, 6.5, 0.18, {
    fontSize: 8.5, color: SA.goldMuted, bold: true, charSpacing: 1.1
  });
  addText(slide, title, 0.5, 0.49, 12.2, opts.subtitle ? 0.5 : 0.58, {
    fontSize: opts.titleSize || 18, bold: true, color: SA.ink, valign: "top"
  });
  if (opts.subtitle) addText(slide, opts.subtitle, 0.5, 1.02, 12.0, 0.24, { fontSize: 10.2, color: SA.muted });
  slide.addShape(ctx.pptx.ShapeType.line, {
    x: 0.5, y: 1.28, w: 12.33, h: 0,
    line: { color: opts.goldRule ? SA.gold : SA.grid, pt: opts.goldRule ? 1.4 : 0.7 }
  });
  addText(slide, `Source: ${source}`, 0.5, 7.08, 10.95, 0.2, { fontSize: 6.8, color: SA.muted, valign: "mid" });
  addWatermark(slide, ctx);
}

function card(slide, ctx, x, y, w, h, opts = {}) {
  slide.addShape(ctx.pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: opts.fill || SA.white },
    line: { color: opts.line || SA.grid, pt: opts.pt || 0.6 }
  });
}

function metric(slide, ctx, x, y, w, value, label, note, opts = {}) {
  card(slide, ctx, x, y, w, opts.h || 1.28, { fill: opts.fill || SA.paper, line: opts.line || SA.grid });
  addText(slide, value, x + 0.18, y + 0.13, w - 0.36, 0.43, { fontSize: opts.valueSize || 25, bold: true, color: opts.color || SA.forest });
  addText(slide, label, x + 0.18, y + 0.57, w - 0.36, 0.27, { fontSize: 10, bold: true });
  addText(slide, note, x + 0.18, y + 0.87, w - 0.36, 0.25, { fontSize: 8.2, color: SA.muted });
}

function callout(slide, ctx, text, y = 6.24, opts = {}) {
  slide.addShape(ctx.pptx.ShapeType.roundRect, {
    x: 0.5, y, w: 12.33, h: 0.54, rectRadius: 0.05,
    fill: { color: opts.fill || SA.forestSoft },
    line: { color: opts.line || SA.forest, pt: 0.8 }
  });
  addText(slide, text, 0.68, y + 0.08, 11.95, 0.35, { fontSize: 9.4, italic: true, color: opts.color || SA.forest });
}

function pill(slide, ctx, text, x, y, w, color = SA.forest, fill = SA.forestSoft) {
  slide.addShape(ctx.pptx.ShapeType.roundRect, { x, y, w, h: 0.3, rectRadius: 0.14, fill: { color: fill }, line: { color: fill } });
  addText(slide, text, x + 0.06, y + 0.02, w - 0.12, 0.24, { fontSize: 7.5, bold: true, align: "center", color });
}

function pct(n, d) { return Math.round((n / d) * 1000) / 10; }

module.exports = { SA, FONT, URL_ARTICLE, URL_CENSUS, URL_POLICY, addText, addCoverLogo, addWatermark, addChrome, card, metric, callout, pill, pct };
