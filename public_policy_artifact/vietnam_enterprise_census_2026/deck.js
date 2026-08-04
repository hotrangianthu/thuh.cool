"use strict";

const path = require("path");
const PptxGenJS = require("pptxgenjs");
const { warnIfSlideHasOverlaps, warnIfSlideElementsOutOfBounds } = require("./pptxgenjs_helpers/layout");
const shared = require("./shared");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Sa.Partners";
pptx.subject = "Vietnam enterprise census 2026 — market report";
pptx.title = "Vietnam's enterprise base is expanding, but scale is the binding constraint";
pptx.company = "Sa.Partners";
pptx.lang = "vi-VN";
pptx.theme = {
  headFontFace: "Roboto",
  bodyFontFace: "Roboto",
  lang: "vi-VN"
};
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";

const ctx = {
  ...shared,
  pptx,
  PptxGenJS,
  logoPath: path.join(__dirname, "sa_partners_logo.png")
};

require("./slides_01_04")(pptx, ctx);
require("./slides_05_08")(pptx, ctx);
require("./slides_09_12")(pptx, ctx);
require("./slides_13_15")(pptx, ctx);

for (const slide of pptx._slides) {
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true, ignoreLines: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

const output = path.join(__dirname, "vietnam_enterprise_census_2026_market_report.pptx");
pptx.writeFile({ fileName: output });
