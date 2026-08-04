"use strict";

module.exports = function (pptx, ctx) {
  const { SA, addText, addChrome, card, metric, callout, pill, URL_CENSUS, URL_POLICY } = ctx;

  // 9 — Policy transmission chain
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Policy transmission", "Formalization creates value only when lower entry friction is paired with capabilities that improve survival and scale", `${URL_POLICY}; NSO preliminary census; Sa.Partners interpretation`);
    const steps = [
      ["1", "Policy move", "Reduce compliance friction; tax relief for converted household businesses", SA.forestSoft],
      ["2", "Actor response", "5.19m individual establishments reassess the enterprise form", SA.paleGold],
      ["3", "Behavior shift", "Adopt invoices, accounting, payroll, bank credit and digital workflows", SA.forestSoft],
      ["4", "Economic effect", "Better data and governance expand finance access and customer reach", SA.paleGold],
      ["5", "Market outcome", "More active firms survive, hire and move up the value chain", SA.forest],
    ];
    steps.forEach((d, i) => {
      const x = 0.55 + i * 2.51;
      card(s, ctx, x, 1.72, 2.18, 3.5, { fill: d[3], line: i === 4 ? SA.forest : SA.grid });
      addText(s, d[0], x + 0.18, 1.95, 0.5, 0.5, { fontSize: 23, bold: true, color: i === 4 ? SA.gold : SA.forest });
      addText(s, d[1], x + 0.18, 2.52, 1.78, 0.42, { fontSize: 11, bold: true, color: i === 4 ? SA.ivory : SA.ink });
      addText(s, d[2], x + 0.18, 3.12, 1.78, 1.38, { fontSize: 9.2, color: i === 4 ? SA.ivory : SA.ink, valign: "top" });
      if (i < 4) s.addShape(pptx.ShapeType.chevron, { x: x + 2.2, y: 3.1, w: 0.28, h: 0.58, fill: { color: SA.gold }, line: { color: SA.gold } });
    });
    const blockers = ["Compliance cost", "Management capability", "Working capital", "Market access"];
    blockers.forEach((b, i) => pill(s, ctx, b, 1.15 + i * 3.0, 5.55, 2.45, SA.risk, SA.paleRed));
    callout(s, ctx, "Policy test: registrations are an intermediate output; the outcome is a larger stock of firms with revenue, jobs, repeat financing and multi-year survival.", 6.2);
  }

  // 10 — 2030 target scenarios
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "2030 scenarios", "Reaching two million active enterprises would require an 18.4% annual pace—four times the recent trend", `${URL_POLICY}; NSO preliminary census p. 37; Sa.Partners calculations`, { subtitle: "Illustrative paths use the census-defined 2025 active-enterprise base; the policy target’s final statistical definition may differ." });
    const labels = ["2025", "2026", "2027", "2028", "2029", "2030"];
    const project = (rate) => labels.map((_, i) => Math.round(859.048 * Math.pow(1 + rate, i)));
    s.addChart(pptx.ChartType.line, [
      { name: "Recent pace (4.7%)", labels, values: project(0.047) },
      { name: "Accelerated (12%)", labels, values: project(0.12) },
      { name: "Target path (18.4%)", labels, values: [859, 1017, 1204, 1426, 1689, 2000] },
    ], {
      x: 0.62, y: 1.55, w: 8.4, h: 4.43,
      chartColors: [SA.muted, SA.gold, SA.forest], showLegend: true, legendPos: "b",
      legendFontFace: "Roboto", legendFontSize: 8, showMarker: true, markerSize: 5, lineSize: 2.5,
      catAxisLabelFontFace: "Roboto", catAxisLabelFontSize: 9, catAxisLabelColor: SA.ink,
      valAxisLabelFontFace: "Roboto", valAxisLabelFontSize: 8, valAxisLabelColor: SA.muted,
      valAxisMinVal: 700, valAxisMaxVal: 2100, valAxisMajorUnit: 200,
      showGridLines: true, gridLine: { color: SA.grid, pt: 0.5 }, showBorder: false
    });
    metric(s, ctx, 9.3, 1.65, 3.38, "1.14m", "Increment required", "2025 active base to 2030 target", { h: 1.2 });
    metric(s, ctx, 9.3, 3.08, 3.38, "18.4%", "Required CAGR", "vs 4.7% observed in 2020–25", { h: 1.2, fill: SA.paleGold, color: SA.goldMuted });
    metric(s, ctx, 9.3, 4.51, 3.38, "1.08m", "Recent-pace outcome", "Illustrative 2030 active enterprises", { h: 1.2, fill: SA.paleRed, color: SA.risk });
    callout(s, ctx, "So what? The target is not achievable through organic growth alone; conversion and survival must create a structural break in the active-enterprise trajectory.", 6.2);
  }

  // 11 — Market opportunity map
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Market opportunity", "The transition opens a B2B infrastructure market around compliance, finance, workforce and distribution", `NSO preliminary census; Nghị quyết 68; Sa.Partners inference`);
    const centerX = 5.1, centerY = 2.6;
    s.addShape(pptx.ShapeType.ellipse, { x: centerX, y: centerY, w: 3.15, h: 1.42, fill: { color: SA.forest }, line: { color: SA.forest } });
    addText(s, "FORMALIZATION\nCONTROL LAYER", centerX + 0.3, centerY + 0.26, 2.55, 0.82, { fontSize: 15, bold: true, color: SA.ivory, align: "center" });
    const nodes = [
      [0.7, 1.55, "Accounting & tax", "E-invoices, bookkeeping, filings", "Recurring compliance"],
      [9.38, 1.55, "Finance & payments", "Accounts, credit, collections", "Data-enabled underwriting"],
      [0.7, 4.35, "Workforce systems", "Payroll, social insurance, HR", "Formal job infrastructure"],
      [9.38, 4.35, "Digital operations", "POS, ERP-lite, commerce tools", "Productivity and reach"],
    ];
    nodes.forEach((n, i) => {
      card(s, ctx, n[0], n[1], 3.25, 1.52, { fill: i % 2 ? SA.paleGold : SA.forestSoft, line: i % 2 ? SA.goldMuted : SA.forestMid });
      addText(s, n[2], n[0] + 0.18, n[1] + 0.16, 2.85, 0.3, { fontSize: 11, bold: true, color: SA.forest });
      addText(s, n[3], n[0] + 0.18, n[1] + 0.55, 2.85, 0.3, { fontSize: 9, color: SA.ink });
      addText(s, n[4], n[0] + 0.18, n[1] + 0.99, 2.85, 0.24, { fontSize: 8, color: SA.muted, italic: true });
      const x1 = n[0] < 5 ? n[0] + 3.25 : 8.25;
      const y1 = n[1] + 0.76;
      const x2 = n[0] < 5 ? 5.1 : n[0];
      const y2 = n[1] < 3 ? 3.05 : 3.55;
      s.addShape(pptx.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: SA.grid, pt: 1.2, beginArrowType: "none", endArrowType: "triangle" } });
    });
    pill(s, ctx, "827.5k non-state enterprises", 4.6, 4.45, 4.15, SA.forest, SA.forestSoft);
    pill(s, ctx, "5.19m individual establishments", 4.6, 4.92, 4.15, SA.goldMuted, SA.paleGold);
    callout(s, ctx, "Commercial implication: the strongest offers bundle mandatory compliance with an immediate business benefit—cash flow visibility, credit access or customer acquisition.", 6.2);
  }

  // 12 — Risks and watchpoints
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Risks", "The thesis weakens if conversion raises the firm count without improving survival, scale or productivity", `NSO preliminary census; Sa.Partners assessment`);
    const risks = [
      ["Quantity without quality", "Registrations rise; active stock and employment do not", "Active/registered ratio", "HIGH"],
      ["Compliance shock", "Small firms revert, suspend or under-report after conversion", "12–24 month survival", "HIGH"],
      ["Service-sector fragmentation", "More firms remain low-value and subscale", "Employees / non-state firm", "MEDIUM"],
      ["Industrial softness", "2025 industry-firm decline becomes persistent", "Industry firm count YoY", "MEDIUM"],
      ["Regional divergence", "Growth concentrates where support capacity is already strongest", "Frontier survival gap", "MEDIUM"],
      ["Statistical revision", "Final Dec-2026 results alter the preliminary baseline", "Official revision size", "WATCH"],
    ];
    addText(s, "RISK", 0.65, 1.52, 2.5, 0.28, { fontSize: 8.5, bold: true, color: SA.muted });
    addText(s, "MECHANISM", 3.35, 1.52, 4.0, 0.28, { fontSize: 8.5, bold: true, color: SA.muted });
    addText(s, "EARLY WARNING", 8.0, 1.52, 2.8, 0.28, { fontSize: 8.5, bold: true, color: SA.muted });
    risks.forEach((r, i) => {
      const y = 1.9 + i * 0.67;
      card(s, ctx, 0.58, y, 12.15, 0.54, { fill: i % 2 ? SA.white : SA.paper, line: SA.grid });
      addText(s, r[0], 0.76, y + 0.08, 2.35, 0.34, { fontSize: 9, bold: true });
      addText(s, r[1], 3.35, y + 0.08, 4.25, 0.34, { fontSize: 8.5 });
      addText(s, r[2], 8.0, y + 0.08, 2.75, 0.34, { fontSize: 8.5, color: SA.muted });
      pill(s, ctx, r[3], 11.05, y + 0.12, 1.3, r[3] === "HIGH" ? SA.risk : r[3] === "WATCH" ? SA.goldMuted : SA.watch, r[3] === "HIGH" ? SA.paleRed : SA.paleGold);
    });
    callout(s, ctx, "The most decision-useful metric is not gross registrations; it is the cohort survival and scale progression of firms created or converted after Nghị quyết 68.", 6.2, { fill: SA.paleRed, line: SA.risk, color: SA.risk });
  }
};
