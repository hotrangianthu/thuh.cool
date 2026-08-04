"use strict";

module.exports = function (pptx, ctx) {
  const { SA, addText, addChrome, card, metric, callout, pill, URL_CENSUS, pct } = ctx;

  // 5 — Ownership composition
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Ownership structure", "Non-state firms dominate the count, but FDI and state firms carry disproportionate employment and capital", `NSO preliminary census, pp. 37–43; calculations by Sa.Partners`);
    s.addChart(pptx.ChartType.doughnut, [{
      name: "Enterprise share", labels: ["Non-state", "FDI", "State-owned"], values: [827.5, 29.8, 1.77]
    }], {
      x: 0.55, y: 1.48, w: 5.2, h: 4.55, holeSize: 63,
      chartColors: [SA.forest, SA.gold, SA.muted], showLegend: true, legendPos: "b",
      legendFontFace: "Roboto", legendFontSize: 8, showPercent: true, showLabel: false,
      showValue: false, dataLabelPosition: "bestFit", dataLabelColor: SA.ink, dataLabelFontSize: 9,
      showBorder: false
    });
    addText(s, "96.3%", 2.12, 2.86, 2.0, 0.5, { fontSize: 25, bold: true, align: "center", color: SA.forest });
    addText(s, "of active firms are non-state", 1.88, 3.4, 2.48, 0.28, { fontSize: 9, align: "center", color: SA.muted });
    const rows = [
      ["Non-state", "96.3%", "59.7%", "59.2%", SA.forest],
      ["FDI", "3.5%", "34.7%", "20.7%", SA.gold],
      ["State-owned", "0.2%", "5.6%", "20.2%", SA.muted],
    ];
    addText(s, "SHARE OF 2025 TOTAL", 6.05, 1.58, 2.5, 0.24, { fontSize: 8.5, color: SA.goldMuted, bold: true });
    ["Ownership", "Firms", "Employment", "Capital"].forEach((h, i) => addText(s, h, [6.05, 8.45, 9.65, 11.05][i], 1.96, [2.2, 1.0, 1.2, 1.1][i], 0.3, { fontSize: 9, bold: true, color: SA.muted, align: i ? "center" : "left" }));
    rows.forEach((r, i) => {
      const y = 2.42 + i * 1.03;
      card(s, ctx, 6.0, y, 6.72, 0.78, { fill: i === 0 ? SA.forestSoft : SA.paper, line: SA.grid });
      s.addShape(pptx.ShapeType.rect, { x: 6.16, y: y + 0.2, w: 0.12, h: 0.38, fill: { color: r[4] }, line: { color: r[4] } });
      addText(s, r[0], 6.42, y + 0.15, 1.85, 0.42, { fontSize: 10, bold: true });
      addText(s, r[1], 8.45, y + 0.15, 1.0, 0.42, { fontSize: 11, bold: true, align: "center" });
      addText(s, r[2], 9.65, y + 0.15, 1.2, 0.42, { fontSize: 11, bold: true, align: "center" });
      addText(s, r[3], 11.05, y + 0.15, 1.1, 0.42, { fontSize: 11, bold: true, align: "center" });
    });
    callout(s, ctx, "So what? The private domestic sector is the formalization engine, but FDI and state firms remain the scale anchors of jobs and capital.", 6.2);
  }

  // 6 — Sector composition
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Sector structure", "Services hold 71% of firms, while industry and construction still employ 59% of enterprise workers", `NSO preliminary census, pp. 38–41; calculations by Sa.Partners`);
    const labels = ["Enterprise count", "Employment", "Capital", "Revenue"];
    s.addChart(pptx.ChartType.bar, [
      { name: "Services", labels, values: [71.3, 39.7, 72.0, 51.0] },
      { name: "Industry & construction", labels, values: [28.0, 59.0, 27.3, 48.4] },
      { name: "Agriculture", labels, values: [0.7, 1.3, 0.7, 0.6] },
    ], {
      x: 0.58, y: 1.55, w: 8.35, h: 4.45, barDir: "bar", barGrouping: "stacked",
      chartColors: [SA.forest, SA.gold, SA.muted], showLegend: true, legendPos: "b",
      legendFontFace: "Roboto", legendFontSize: 8, showValue: true, dataLabelPosition: "ctr",
      dataLabelColor: SA.white, dataLabelFontSize: 8, catAxisLabelFontFace: "Roboto",
      catAxisLabelFontSize: 9, catAxisLabelColor: SA.ink, valAxisMinVal: 0, valAxisMaxVal: 100,
      valAxisMajorUnit: 20, valAxisLabelFontSize: 8, valAxisLabelColor: SA.muted,
      showGridLines: true, gridLine: { color: SA.grid, pt: 0.5 }, showBorder: false
    });
    metric(s, ctx, 9.25, 1.65, 3.38, "612.5k", "Service enterprises", "+31.3% vs 2020", { h: 1.18 });
    metric(s, ctx, 9.25, 3.04, 3.38, "10.4m", "Industry workers", "Largest employment pool", { h: 1.18, fill: SA.paleGold, color: SA.goldMuted });
    metric(s, ctx, 9.25, 4.43, 3.38, "−5.2%", "Industry firms YoY", "2025 vs 2024", { h: 1.18, fill: SA.paleRed, color: SA.risk });
    callout(s, ctx, "So what? Services are the entry point for formalization, but industrial firms remain the job-density engine—and their 2025 count contracted.", 6.2);
  }

  // 7 — Scale gap
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Enterprise scale", "The typical domestic private firm employs 13 people—one-sixteenth the FDI average", `NSO preliminary census, p. 40`);
    s.addChart(pptx.ChartType.bar, [{
      name: "Employees per enterprise", labels: ["State-owned", "FDI", "All enterprises", "Non-state"], values: [553.7, 206.4, 20.5, 12.6]
    }], {
      x: 0.62, y: 1.55, w: 8.25, h: 4.45, barDir: "bar", barGrouping: "clustered",
      chartColors: [SA.forest], showLegend: false, showValue: true, dataLabelPosition: "outEnd",
      dataLabelColor: SA.ink, dataLabelFontSize: 9, catAxisLabelFontFace: "Roboto",
      catAxisLabelFontSize: 9, catAxisLabelColor: SA.ink, valAxisHidden: true,
      showGridLines: false, showBorder: false
    });
    card(s, ctx, 9.18, 1.62, 3.5, 3.95, { fill: SA.forestDark, line: SA.forestDark });
    addText(s, "THE SCALE GAP", 9.45, 1.9, 2.8, 0.27, { fontSize: 8.5, color: SA.gold, bold: true });
    addText(s, "16.4×", 9.43, 2.42, 2.8, 0.6, { fontSize: 31, color: SA.ivory, bold: true });
    addText(s, "FDI employment per firm\nvs non-state", 9.45, 3.03, 2.7, 0.65, { fontSize: 12, color: SA.forestSoft, bold: true, valign: "top" });
    addText(s, "Domestic private enterprises are numerous, but their average organizational depth remains thin.", 9.45, 4.06, 2.65, 0.9, { fontSize: 10, color: SA.ivory, valign: "top" });
    callout(s, ctx, "So what? Policies that only raise registrations can miss the binding constraint: management capacity, finance access and survival through the first growth stage.", 6.2);
  }

  // 8 — Regional concentration
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Regional structure", "Two economic cores host 72% of firms, but northern frontier regions are growing faster from a smaller base", `NSO preliminary census, pp. 39–42; calculations by Sa.Partners`);
    const hubs = [
      { x: 0.62, title: "Southeast", firms: "349.7k", jobs: "6.4m", growth: "−0.3% YoY", color: SA.forest, note: "Largest enterprise hub; signs of count saturation" },
      { x: 4.79, title: "Red River Delta", firms: "267.2k", jobs: "6.3m", growth: "+3.6% YoY", color: SA.forestMid, note: "Capital and employment growth are pulling north" },
      { x: 8.96, title: "Northern midlands", firms: "41.9k", jobs: "n/a", growth: "+8.7% YoY", color: SA.gold, note: "Fastest enterprise-count growth; +44.4% vs 2020" },
    ];
    hubs.forEach((d, i) => {
      card(s, ctx, d.x, 1.62, 3.75, 3.66, { fill: i === 2 ? SA.paleGold : SA.paper, line: d.color });
      s.addShape(pptx.ShapeType.rect, { x: d.x, y: 1.62, w: 3.75, h: 0.14, fill: { color: d.color }, line: { color: d.color } });
      addText(s, d.title, d.x + 0.2, 1.95, 3.3, 0.36, { fontSize: 13, bold: true, color: d.color });
      addText(s, d.firms, d.x + 0.2, 2.5, 1.45, 0.42, { fontSize: 24, bold: true, color: SA.ink });
      addText(s, "active firms", d.x + 0.2, 3.0, 1.45, 0.2, { fontSize: 8, color: SA.muted });
      addText(s, d.jobs, d.x + 1.93, 2.5, 1.42, 0.42, { fontSize: 24, bold: true, color: SA.ink });
      addText(s, "enterprise jobs", d.x + 1.93, 3.0, 1.42, 0.2, { fontSize: 8, color: SA.muted });
      pill(s, ctx, d.growth, d.x + 0.2, 3.56, 1.45, d.growth.startsWith("−") ? SA.risk : SA.positive, d.growth.startsWith("−") ? SA.paleRed : SA.forestSoft);
      addText(s, d.note, d.x + 0.2, 4.12, 3.25, 0.65, { fontSize: 9, color: SA.ink, valign: "top" });
    });
    s.addShape(pptx.ShapeType.chevron, { x: 3.98, y: 5.55, w: 5.35, h: 0.42, fill: { color: SA.forestSoft }, line: { color: SA.forestSoft } });
    addText(s, "Scale remains concentrated → marginal growth is diffusing northward", 4.25, 5.59, 4.7, 0.28, { fontSize: 9.2, bold: true, align: "center", color: SA.forest });
    callout(s, ctx, "Market implication: enterprise services need hub depth in the Southeast/Red River Delta and lower-cost distribution models for faster-growing frontier regions.", 6.2);
  }
};
