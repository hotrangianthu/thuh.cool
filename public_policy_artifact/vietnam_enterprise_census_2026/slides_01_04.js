"use strict";

module.exports = function (pptx, ctx) {
  const { SA, addText, addCoverLogo, addChrome, card, metric, callout, pill, URL_ARTICLE, URL_CENSUS } = ctx;

  // 1 — Cover
  {
    const s = pptx.addSlide();
    s.background = { color: SA.forestDark };
    addText(s, "VIETNAM ENTERPRISE LANDSCAPE · JULY 2026", 0.52, 0.48, 8.0, 0.28, { fontSize: 9, color: SA.gold, bold: true, charSpacing: 1.4 });
    addText(s, "Vietnam’s enterprise base is expanding,\nbut scale is the binding constraint", 0.52, 1.24, 11.5, 1.55, { fontSize: 31, color: SA.ivory, bold: true, valign: "top" });
    addText(s, "859,048 active businesses mark a broader formalization shift—yet the 2030 ambition requires survival and productivity to accelerate alongside registrations.", 0.55, 3.18, 10.5, 0.72, { fontSize: 14, color: SA.forestSoft, valign: "top" });
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: 4.28, w: 3.0, h: 0, line: { color: SA.gold, pt: 2 } });
    addText(s, "MARKET REPORT", 0.55, 4.47, 2.3, 0.25, { fontSize: 9, color: SA.gold, bold: true });
    addText(s, "Preliminary 2026 Economic Census · Data as of 31 Dec 2025", 0.55, 4.82, 6.8, 0.3, { fontSize: 9.5, color: SA.ivory });
    addText(s, "Primary source: National Statistics Office; news trigger: VnExpress", 0.55, 7.08, 8.5, 0.18, { fontSize: 6.8, color: SA.muted });
    addCoverLogo(s, ctx);
  }

  // 2 — Executive thesis
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Executive thesis", "Enterprise growth is real, but formalization quality—not the headline count—will determine economic impact", `${URL_ARTICLE}; ${URL_CENSUS}`, { goldRule: true });
    addText(s, "BOTTOM LINE", 0.55, 1.51, 1.7, 0.25, { fontSize: 8.5, color: SA.goldMuted, bold: true });
    addText(s, "Vietnam has broadened its enterprise base while capital, revenue and employment expanded faster than firm count. The next phase must convert a vast household-business base into durable, productive firms.", 0.55, 1.78, 12.0, 0.68, { fontSize: 15, bold: true, color: SA.forest, valign: "top" });
    const items = [
      ["01", "Breadth", "859k active firms", "+25.5% vs 2020; 96.3% are non-state enterprises."],
      ["02", "Depth", "Capital +69.9%", "Capital and revenue rose much faster than firm count, implying deeper resource intensity."],
      ["03", "Conversion", "5.19m household units", "The largest formalization pool remains outside the enterprise boundary."],
    ];
    items.forEach((d, i) => {
      const x = 0.55 + i * 4.12;
      card(s, ctx, x, 2.72, 3.82, 2.4, { fill: i === 1 ? SA.forestSoft : SA.paper, line: i === 1 ? SA.forestMid : SA.grid });
      addText(s, d[0], x + 0.18, 2.9, 0.55, 0.35, { fontSize: 18, color: SA.gold, bold: true });
      addText(s, d[1], x + 0.78, 2.93, 2.6, 0.28, { fontSize: 10, bold: true, color: SA.muted });
      addText(s, d[2], x + 0.18, 3.38, 3.35, 0.48, { fontSize: 21, color: SA.forest, bold: true });
      addText(s, d[3], x + 0.18, 4.02, 3.35, 0.72, { fontSize: 9.2, color: SA.ink, valign: "top" });
    });
    callout(s, ctx, "Key uncertainty: the census is preliminary and ‘active with business results’ is narrower than registered or administratively active enterprises.", 5.55, { fill: SA.paleGold, line: SA.goldMuted, color: SA.goldMuted });
  }

  // 3 — Governing question and measurement boundary
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Framing", "The headline measures productive activity, not every registered enterprise in the administrative universe", `${URL_ARTICLE}; NSO preliminary census, pp. 25, 31, 37`, { subtitle: "Governing question: can Vietnam turn a larger business base into more formal, resilient and productive enterprises?" });
    const stages = [
      { v: "6.3m", l: "economic establishments", n: "All surveyed operating units", w: 11.7, c: SA.paleGray },
      { v: "5.19m", l: "individual establishments", n: "Household / individual production and business", w: 9.7, c: SA.paleGold },
      { v: "1.22m", l: "enterprises surveyed", n: "Administrative survey frame", w: 7.2, c: SA.forestSoft },
      { v: "859,048", l: "active with business results", n: "Revenue or production cost during 2025", w: 5.1, c: SA.forest },
    ];
    stages.forEach((d, i) => {
      const x = 0.75 + (11.7 - d.w) / 2;
      const y = 1.55 + i * 1.08;
      s.addShape(pptx.ShapeType.roundRect, { x, y, w: d.w, h: 0.82, rectRadius: 0.05, fill: { color: d.c }, line: { color: i === 3 ? SA.forest : SA.grid, pt: 0.7 } });
      addText(s, d.v, x + 0.2, y + 0.12, 1.55, 0.38, { fontSize: i === 3 ? 20 : 17, bold: true, color: i === 3 ? SA.ivory : SA.forest });
      addText(s, d.l, x + 1.8, y + 0.1, Math.max(2.4, d.w - 4.1), 0.32, { fontSize: 10.5, bold: true, color: i === 3 ? SA.ivory : SA.ink });
      addText(s, d.n, x + 1.8, y + 0.43, Math.max(2.4, d.w - 4.1), 0.22, { fontSize: 8, color: i === 3 ? SA.forestSoft : SA.muted });
      if (i < 3) pill(s, ctx, i === 0 ? "different legal forms" : i === 1 ? "enterprise boundary" : "activity test", x + d.w - 1.72, y + 0.25, 1.5, i === 3 ? SA.ivory : SA.forest, i === 3 ? SA.forestMid : SA.white);
    });
    callout(s, ctx, "Interpretation: 859k is the economically active core. It should not be compared directly with a registered-enterprise stock without aligning definitions.", 6.18);
  }

  // 4 — Time series / growth
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Growth trajectory", "Firm count rose steadily, while capital and revenue deepened three times faster over 2020–25", `NSO preliminary census, pp. 37, 39, 41, 43; calculations by Sa.Partners`);
    const labels = ["2020", "2024", "2025"];
    s.addChart(pptx.ChartType.line, [
      { name: "Active enterprises", labels, values: [100, 122.6, 125.5] },
      { name: "Employment", labels, values: [100, 111.3, 119.7] },
      { name: "Capital", labels, values: [100, 148.4, 169.9] },
      { name: "Revenue", labels, values: [100, 146.4, 165.6] },
    ], {
      x: 0.58, y: 1.48, w: 8.2, h: 4.45,
      chartColors: [SA.forest, SA.muted, SA.gold, SA.forestMid],
      showLegend: true, legendPos: "b", legendFontFace: "Roboto", legendFontSize: 8,
      showTitle: false, showValue: false, showMarker: true, markerSize: 5, lineSize: 2.3,
      catAxisLabelFontFace: "Roboto", catAxisLabelFontSize: 9, catAxisLabelColor: SA.ink,
      valAxisLabelFontFace: "Roboto", valAxisLabelFontSize: 8, valAxisLabelColor: SA.muted,
      valAxisMinVal: 90, valAxisMaxVal: 180, valAxisMajorUnit: 10,
      showCatName: false, showValAxisTitle: false, showCatAxisTitle: false,
      showValAxis: true, showCatAxis: true, showGridLines: true, gridLine: { color: SA.grid, pt: 0.5 },
      showBorder: false
    });
    metric(s, ctx, 9.06, 1.6, 3.65, "+25.5%", "Active enterprises", "2020–25 cumulative", { h: 1.2 });
    metric(s, ctx, 9.06, 3.0, 3.65, "+69.9%", "Capital stock", "2.7× firm-count growth", { h: 1.2, fill: SA.forestSoft });
    metric(s, ctx, 9.06, 4.4, 3.65, "+65.6%", "Net revenue", "2.6× firm-count growth", { h: 1.2 });
    callout(s, ctx, "So what? Enterprise deepening is already visible—but employment growth lagged firm count, indicating that average scale has not expanded proportionately.", 6.2);
  }
};
