"use strict";

module.exports = function (pptx, ctx) {
  const { SA, addText, addChrome, card, metric, callout, pill, URL_ARTICLE, URL_CENSUS, URL_POLICY } = ctx;

  // 13 — Monitoring dashboard
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Monitoring dashboard", "Seven indicators will show whether Vietnam is building more firms—or merely recording more registrations", `Monitoring framework by Sa.Partners; baselines from NSO preliminary census`);
    const indicators = [
      ["Active enterprise stock", "859k", "≥18% p.a. if target-aligned", "COUNT"],
      ["Active / surveyed ratio", "70.4%", "Rising", "SURVIVAL"],
      ["Household establishments", "5.19m", "Orderly decline via conversion", "FORMALIZE"],
      ["Non-state employees / firm", "12.6", "Sustained increase", "SCALE"],
      ["Industry enterprise count", "240.6k", "Return to positive YoY", "DEPTH"],
      ["Revenue / worker", "₫2.6bn", "Faster than inflation", "PRODUCTIVITY"],
      ["Final census revision", "Dec-26", "Small, explained variance", "QUALITY"],
    ];
    addText(s, "INDICATOR", 0.65, 1.5, 3.2, 0.26, { fontSize: 8.5, bold: true, color: SA.muted });
    addText(s, "BASELINE", 4.1, 1.5, 1.35, 0.26, { fontSize: 8.5, bold: true, color: SA.muted, align: "center" });
    addText(s, "THESIS-CONFIRMING DIRECTION", 5.8, 1.5, 4.2, 0.26, { fontSize: 8.5, bold: true, color: SA.muted });
    indicators.forEach((r, i) => {
      const y = 1.86 + i * 0.59;
      card(s, ctx, 0.58, y, 12.15, 0.48, { fill: i % 2 ? SA.white : SA.paper, line: SA.grid });
      addText(s, r[0], 0.78, y + 0.06, 3.0, 0.32, { fontSize: 9, bold: true });
      addText(s, r[1], 4.1, y + 0.06, 1.35, 0.32, { fontSize: 10, bold: true, color: SA.forest, align: "center" });
      addText(s, r[2], 5.8, y + 0.06, 4.35, 0.32, { fontSize: 8.8 });
      pill(s, ctx, r[3], 10.72, y + 0.09, 1.55, SA.forest, SA.forestSoft);
    });
    callout(s, ctx, "Next update: reconcile the final December 2026 census with business-registration data and build cohort survival views by conversion status, sector and region.", 6.2);
  }

  // 14 — Closing implication
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Implications", "Vietnam’s enterprise agenda should be managed as a conversion-and-scaling system, not a registration campaign", `${URL_CENSUS}; ${URL_POLICY}; Sa.Partners synthesis`, { goldRule: true });
    const lanes = [
      ["POLICYMAKERS", "Define the target consistently", "Align registered, active and productive-enterprise measures; publish cohort survival.", SA.forestSoft],
      ["FINANCIAL INSTITUTIONS", "Underwrite the transition", "Use invoice, payment and tax data to finance newly formalized firms safely.", SA.paleGold],
      ["B2B BUILDERS", "Bundle compliance with value", "Win adoption by pairing mandatory workflows with credit, cash-flow and growth tools.", SA.forestSoft],
    ];
    lanes.forEach((d, i) => {
      const x = 0.62 + i * 4.14;
      card(s, ctx, x, 1.6, 3.8, 3.95, { fill: d[3], line: i === 1 ? SA.goldMuted : SA.forestMid });
      addText(s, `0${i + 1}`, x + 0.2, 1.84, 0.55, 0.42, { fontSize: 18, bold: true, color: SA.gold });
      addText(s, d[0], x + 0.85, 1.9, 2.55, 0.28, { fontSize: 8.5, color: SA.muted, bold: true });
      addText(s, d[1], x + 0.2, 2.55, 3.25, 0.72, { fontSize: 17, bold: true, color: SA.forest, valign: "top" });
      addText(s, d[2], x + 0.2, 3.55, 3.25, 1.1, { fontSize: 10.2, color: SA.ink, valign: "top" });
    });
    addText(s, "The evidence suggests the opportunity is not simply to create 1.14 million more legal entities. It is to build the infrastructure that helps them remain active, employ more people and generate more value.", 0.8, 5.82, 11.7, 0.62, { fontSize: 13.5, bold: true, color: SA.forest, align: "center" });
  }

  // 15 — Appendix / definitions and source ledger
  {
    const s = pptx.addSlide();
    addChrome(s, ctx, "Appendix", "Definitions and source notes are essential because administrative and census enterprise counts are not interchangeable", `${URL_ARTICLE}; ${URL_CENSUS}; ${URL_POLICY}`, { titleSize: 17 });
    const defs = [
      ["Active enterprise with business results", "An enterprise that produced goods/services and had revenue or production/business costs during 2025. Excludes pre-operating, inactive, temporarily suspended and time-limited cessation cases."],
      ["Preliminary results", "The National Statistics Office states figures may be revised after checking, reconciliation and verification; official results are expected in December 2026."],
      ["Scenario convention", "The 2030 scenario uses 859,048 as the 2025 base and treats the two-million target as if it shared the census definition. This is illustrative, not an official forecast."],
      ["Derived figures", "2020 and 2024 index values, ownership shares and CAGR calculations are reconstructed from reported levels and growth rates; rounding may create small differences."],
    ];
    defs.forEach((d, i) => {
      const y = 1.55 + i * 1.05;
      addText(s, d[0], 0.65, y, 3.25, 0.55, { fontSize: 10, bold: true, color: SA.forest, valign: "top" });
      addText(s, d[1], 4.05, y, 8.3, 0.68, { fontSize: 8.8, color: SA.ink, valign: "top" });
      s.addShape(pptx.ShapeType.line, { x: 0.65, y: y + 0.82, w: 11.7, h: 0, line: { color: SA.grid, pt: 0.5 } });
    });
    card(s, ctx, 0.65, 5.95, 11.7, 0.66, { fill: SA.forestDark, line: SA.forestDark });
    addText(s, "Source hierarchy", 0.88, 6.08, 1.55, 0.3, { fontSize: 9, bold: true, color: SA.gold });
    addText(s, "1) National Statistics Office preliminary census report  2) Nghị quyết 68-NQ/TW  3) VnExpress news article as the publishing trigger  4) Sa.Partners calculations and interpretation", 2.55, 6.05, 9.45, 0.38, { fontSize: 8.5, color: SA.ivory });
  }
};
