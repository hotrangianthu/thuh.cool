"use strict";

/**
 * Consultant Slide Templates — T1 through T10
 * Pre-built layout functions for McKinsey-style consulting slide types.
 * Light Grab-brand theme: white backgrounds, Grab Green (#00B14F) primary, Roboto font.
 *
 * Each function: (slide, contentArgs, opts?) → { nextY }
 * Requires: THEME from ./theme.js
 */

const { THEME } = require("./theme");

// ── Utility: apply slide background from a named master ──────────────────────
function applyMaster(slide, masterName) {
  const m = THEME.masters[masterName] || THEME.masters.LIGHT;
  slide.background = m.background;
}

// ── T-CHROME: Universal slide chrome ─────────────────────────────────────────
// Tracker (top-left) + slide number (top-right) + Action Title + divider + source footer.
// opts: { master: "LIGHT"|"DARK"|"SECTION"|"DATA", slideNum, totalSlides, source }
function addSlideChrome(slide, tracker, actionTitle, opts = {}) {
  const sp     = THEME.spacing;
  const isDark = (opts.master === "DARK" || opts.master === "SECTION");
  const titleStyle = isDark ? THEME.typeStyles.actionTitleDark : THEME.typeStyles.actionTitle;
  const trackerStyle = isDark
    ? { ...THEME.typeStyles.tracker, color: "D4EEE1" }
    : THEME.typeStyles.tracker;

  // Tracker / kicker (top-left, uppercase muted label)
  if (tracker) {
    slide.addText(tracker.toUpperCase(), {
      ...trackerStyle,
      x: sp.marginH, y: sp.trackerY, w: 9, h: sp.trackerH,
      valign: "top",
    });
  }

  // Slide number (top-right)
  if (opts.slideNum) {
    const numText = opts.totalSlides ? `${opts.slideNum} / ${opts.totalSlides}` : `${opts.slideNum}`;
    slide.addText(numText, {
      ...THEME.typeStyles.slideNumber,
      color: isDark ? "D4EEE1" : "919191",
      x: sp.slideW - sp.marginH - 1.5, y: sp.trackerY, w: 1.5, h: sp.trackerH,
      align: "right", valign: "top",
    });
  }

  // Action title (complete declarative sentence — the KEY TAKEAWAY)
  slide.addText(actionTitle, {
    ...titleStyle,
    x: sp.marginH, y: sp.titleY, w: sp.contentW, h: sp.titleH,
    valign: "top",
    wrap: true,
  });

  // Thin divider line below title
  const divStyle = isDark ? THEME.shapes.dividerLineDark : THEME.shapes.dividerLine;
  slide.addShape("rect", {
    x: sp.marginH, y: sp.dividerY, w: sp.contentW, h: 0,
    line: divStyle.line,
    fill: { type: "none" },
  });

  // Source footer (bottom-left)
  if (opts.source) {
    slide.addText(`Source: ${opts.source}`, {
      ...THEME.typeStyles.source,
      color: isDark ? "919191" : "919191",
      x: sp.marginH, y: sp.footerY, w: sp.contentW - 1, h: sp.footerH,
      valign: "bottom",
    });
  }

  return { nextY: sp.contentY };
}

// ── T1: Title / Cover Slide ───────────────────────────────────────────────────
// Warm-dark background (#1F2227). Deck title, subtitle, Grab Green accent line,
// optional 3 key metrics strip.
// opts: { metrics: [{value, label}], date, confidentiality }
function addTitleSlide(slide, deckTitle, subtitle, opts = {}) {
  applyMaster(slide, "DARK");
  const sp = THEME.spacing;

  // Deck title (Roboto Black)
  slide.addText(deckTitle, {
    ...THEME.typeStyles.deckTitle,
    x: sp.marginH, y: 2.2, w: sp.contentW, h: 1.2,
    align: "left", valign: "middle",
  });

  // Subtitle (Roboto Light, mint tint)
  if (subtitle) {
    slide.addText(subtitle, {
      ...THEME.typeStyles.deckSubtitle,
      x: sp.marginH, y: 3.5, w: sp.contentW, h: 0.45,
      align: "left", valign: "top",
    });
  }

  // Grab Green accent line under title (signature reference element — 2pt, 1.5" wide)
  slide.addShape("rect", {
    x: sp.marginH, y: 4.05, w: 1.5, h: 0.05,
    fill: { color: THEME.colors.grabGreen },
    line: { type: "none" },
  });

  // Metrics strip (up to 3) at bottom
  if (opts.metrics && opts.metrics.length > 0) {
    const metrics = opts.metrics.slice(0, 3);
    const cellW = sp.contentW / 3;
    metrics.forEach((m, i) => {
      const cx = sp.marginH + i * cellW;
      if (i > 0) {
        slide.addShape("rect", {
          x: cx, y: 5.5, w: 0, h: 0.9,
          line: { color: "2D3147", pt: 0.75 },
          fill: { type: "none" },
        });
      }
      slide.addText(m.value, {
        ...THEME.typeStyles.metricLgDark,
        x: cx + 0.15, y: 5.5, w: cellW - 0.3, h: 0.55,
        align: "left", valign: "bottom",
      });
      slide.addText(m.label, {
        ...THEME.typeStyles.metricLabel,
        color: "D4EEE1",
        x: cx + 0.15, y: 6.1, w: cellW - 0.3, h: 0.25,
        align: "left", valign: "top",
      });
    });
  }

  // Date + confidentiality footer
  const footerParts = [opts.date, opts.confidentiality].filter(Boolean).join("   |   ");
  if (footerParts) {
    slide.addText(footerParts, {
      ...THEME.typeStyles.source,
      color: "919191",
      x: sp.marginH, y: sp.footerY, w: sp.contentW, h: sp.footerH,
    });
  }

  return { nextY: 2.2 };
}

// ── T2: Section Divider ───────────────────────────────────────────────────────
// Dark Grab Green background (#006850). Section number watermark + title + descriptor.
function addSectionDivider(slide, sectionNumber, sectionTitle, sectionDesc, opts = {}) {
  applyMaster(slide, "SECTION");
  const sp = THEME.spacing;

  // Watermark section number (large, low opacity)
  slide.addText(`${sectionNumber}`, {
    ...THEME.typeStyles.sectionNumber,
    color: "FFFFFF",
    transparency: 88, // 12% opacity
    x: sp.slideW - 3.5, y: 1.5, w: 3, h: 4,
    align: "right", valign: "middle",
  });

  // Section title (Roboto Black, white)
  slide.addText(sectionTitle, {
    ...THEME.typeStyles.sectionTitle,
    x: sp.marginH, y: 2.8, w: 9, h: 1.0,
    align: "left", valign: "middle",
    wrap: true,
  });

  // Thin white accent line
  slide.addShape("rect", {
    x: sp.marginH, y: 3.9, w: 1.2, h: 0.03,
    fill: { color: "FFFFFF" },
    line: { type: "none" },
  });

  // Section descriptor (Roboto Light, mint)
  if (sectionDesc) {
    slide.addText(sectionDesc, {
      ...THEME.typeStyles.sectionDesc,
      x: sp.marginH, y: 4.05, w: 9, h: 0.5,
      align: "left", valign: "top",
    });
  }

  return { nextY: 3.0 };
}

// ── T3: Standard Content Slide ────────────────────────────────────────────────
// White background. Tracker + Action Title + Divider + Content Grid + Footer.
function addContentSlide(slide, tracker, actionTitle, opts = {}) {
  applyMaster(slide, opts.master || "LIGHT");
  return addSlideChrome(slide, tracker, actionTitle, opts);
}

// ── T4: KPI Scorecard Row ─────────────────────────────────────────────────────
// 3-5 metric cards with Grab Green top accent bar and Roboto Black metric numbers.
// metrics: [{ value, label, delta?, deltaDir: "up"|"down"|"flat", ragColor? }]
function addKPIRow(slide, metrics, opts = {}) {
  const sp     = THEME.spacing;
  const topY   = opts.y || sp.contentY;
  const rowH   = opts.h || 1.4;
  const count  = Math.min(metrics.length, 5);
  const totalW = sp.contentW;
  const cardW  = (totalW - sp.gutterMd * (count - 1)) / count;
  const isDark = opts.master === "DARK";

  metrics.slice(0, count).forEach((m, i) => {
    const cx = sp.marginH + i * (cardW + sp.gutterMd);

    // Card background
    slide.addShape("rect", {
      x: cx, y: topY, w: cardW, h: rowH,
      ...(isDark ? THEME.shapes.cardDark : THEME.shapes.card),
    });

    // Grab Green top accent bar (or custom RAG color)
    const barColor = m.ragColor || opts.accentColor || THEME.colors.grabGreen;
    slide.addShape("rect", {
      x: cx, y: topY, w: cardW, h: 0.06,
      fill: { color: barColor },
      line: { type: "none" },
    });

    // Metric value (Roboto Black, Grab Green on light / white on dark)
    const valueStyle = isDark ? THEME.typeStyles.metricLgDark : THEME.typeStyles.metricLg;
    slide.addText(m.value, {
      ...valueStyle,
      x: cx + sp.cardPad, y: topY + 0.15, w: cardW - sp.cardPad * 2, h: 0.65,
      align: "left", valign: "bottom",
    });

    // Delta indicator (▲/▼/─ in green/red/gray)
    if (m.delta) {
      const dir    = m.deltaDir || "up";
      const dColor = dir === "up"   ? THEME.colors.grabGreen
                   : dir === "down" ? THEME.colors.accentRed
                   :                  THEME.colors.textMid;
      const arrow  = dir === "up" ? "▲ " : dir === "down" ? "▼ " : "─ ";
      slide.addText(`${arrow}${m.delta}`, {
        ...THEME.typeStyles.metricDelta,
        color: dColor,
        x: cx + sp.cardPad, y: topY + 0.82, w: cardW - sp.cardPad * 2, h: 0.25,
        align: "left", valign: "top",
      });
    }

    // Label (Roboto Light, muted)
    slide.addText(m.label, {
      ...THEME.typeStyles.metricLabel,
      color: isDark ? "D4EEE1" : THEME.colors.textMid,
      x: cx + sp.cardPad, y: topY + rowH - 0.32, w: cardW - sp.cardPad * 2, h: 0.28,
      align: "left", valign: "bottom",
    });
  });

  return { nextY: topY + rowH + sp.gutterMd };
}

// ── T5: Chart + Interpretation Panel ─────────────────────────────────────────
// TWO-THIRD layout: chart (left 65%) + interpretation bullets (right 30%).
// bullets: [{ headline, text }] — "so what" interpretation (3 max, Rule of Three).
function addChartWithInterpretation(slide, bullets, opts = {}) {
  const sp    = THEME.spacing;
  const topY  = opts.y || sp.contentY;
  const h     = opts.h || sp.contentH;
  const grids = THEME.grids.TWO_THIRD;

  const chartPanel  = { x: grids[0].x, y: topY, w: grids[0].w, h };
  const interpPanel = { x: grids[1].x, y: topY, w: grids[1].w, h };

  // "KEY TAKEAWAYS" subhead (Roboto Medium, dark green)
  slide.addText("KEY TAKEAWAYS", {
    ...THEME.typeStyles.subhead,
    x: interpPanel.x, y: topY, w: interpPanel.w, h: 0.3,
    valign: "top",
  });

  // Interpretation bullets with Grab Green number badges
  let bulletY = topY + 0.35;
  (bullets || []).forEach((b, i) => {
    const bh = 0.55 + (b.text ? 0.3 : 0);
    // Grab Green number badge
    slide.addShape("rect", {
      x: interpPanel.x, y: bulletY, w: 0.22, h: 0.22,
      fill: { color: THEME.colors.grabGreen },
      line: { type: "none" },
    });
    slide.addText(`${i + 1}`, {
      ...THEME.typeStyles.tableHeader,
      x: interpPanel.x, y: bulletY, w: 0.22, h: 0.22,
      align: "center", valign: "middle",
    });
    // Bullet headline
    slide.addText(b.headline || b, {
      ...THEME.typeStyles.bodySmall,
      bold: true,
      x: interpPanel.x + 0.28, y: bulletY, w: interpPanel.w - 0.28, h: 0.25,
      valign: "top",
    });
    // Optional supporting text
    if (b.text) {
      slide.addText(b.text, {
        ...THEME.typeStyles.caption,
        x: interpPanel.x + 0.28, y: bulletY + 0.28, w: interpPanel.w - 0.28, h: 0.28,
        valign: "top",
      });
    }
    bulletY += bh + sp.gutterSm;
  });

  return { chartPanel, interpPanel };
}

// ── T6: Comparison Columns ────────────────────────────────────────────────────
// 2-4 equal columns. Grab Green header bars. Mint fill for highlighted column.
// columns: [{ header, accentColor?, bullets: [], highlight: bool }]
function addComparisonColumns(slide, columns, opts = {}) {
  const sp   = THEME.spacing;
  const topY = opts.y || sp.contentY;
  const h    = opts.h || sp.contentH;
  const n    = Math.min(columns.length, 4);
  const totalW = sp.contentW;
  const colW   = (totalW - sp.gutterMd * (n - 1)) / n;

  columns.slice(0, n).forEach((col, i) => {
    const cx          = sp.marginH + i * (colW + sp.gutterMd);
    const accentColor = col.accentColor || THEME.colors.grabGreen;
    const isHighlight = col.highlight || false;

    // Column background (mint for highlighted, wash for others)
    slide.addShape("rect", {
      x: cx, y: topY, w: colW, h,
      fill:  { color: isHighlight ? THEME.colors.grabGreenMint : THEME.colors.grabGreenWash },
      line:  { color: THEME.colors.borderLight, pt: 0.5 },
      rectRadius: THEME.shapes.card.rectRadius,
    });

    // Grab Green top accent bar
    slide.addShape("rect", {
      x: cx, y: topY, w: colW, h: 0.06,
      fill: { color: accentColor },
      line: { type: "none" },
    });

    // Column header bar (Grab Green fill)
    slide.addShape("rect", {
      x: cx, y: topY + 0.06, w: colW, h: 0.4,
      fill: { color: accentColor },
      line: { type: "none" },
    });
    slide.addText(col.header, {
      ...THEME.typeStyles.tableHeader,
      x: cx + sp.cardPad, y: topY + 0.06, w: colW - sp.cardPad * 2, h: 0.4,
      align: "center", valign: "middle",
    });

    // Bullets
    if (col.bullets) {
      let bY = topY + 0.6;
      col.bullets.forEach(b => {
        slide.addText(`• ${b}`, {
          ...THEME.typeStyles.bullet,
          x: cx + sp.cardPad, y: bY, w: colW - sp.cardPad * 2, h: 0.28,
          valign: "top",
        });
        bY += 0.3;
      });
    }

    // "RECOMMENDED" badge on highlighted column
    if (isHighlight) {
      slide.addText("RECOMMENDED", {
        ...THEME.typeStyles.caption,
        bold: true,
        color: THEME.colors.grabGreen,
        x: cx + sp.cardPad, y: topY + h - 0.3, w: colW - sp.cardPad * 2, h: 0.25,
        align: "center", valign: "bottom",
      });
    }
  });

  return { nextY: topY + h + sp.gutterMd };
}

// ── T7: Data Table ────────────────────────────────────────────────────────────
// Dark-green header row (#006850) + mint alt rows (#D4EEE1) + Roboto type.
// headers: ["Col1", "Col2", ...]
// rows: [["val1", "val2"], ...]
// colWidths: optional fractional widths (must sum to 1.0)
function addDataTable(slide, headers, rows, opts = {}) {
  const sp     = THEME.spacing;
  const topY   = opts.y || sp.contentY;
  const tableW = opts.w || sp.contentW;
  const startX = opts.x || sp.marginH;
  const rowH   = opts.rowH || 0.32;
  const n      = headers.length;
  const colWs  = opts.colWidths
    ? opts.colWidths.map(f => f * tableW)
    : Array(n).fill(tableW / n);

  // Header row (dark-green fill)
  let curX = startX;
  headers.forEach((h, i) => {
    slide.addShape("rect", {
      x: curX, y: topY, w: colWs[i], h: rowH,
      fill: { color: THEME.colors.grabGreenDark },
      line: { color: THEME.colors.borderLight, pt: 0.5 },
    });
    slide.addText(h, {
      ...THEME.typeStyles.tableHeader,
      x: curX + 0.08, y: topY, w: colWs[i] - 0.16, h: rowH,
      align: i === 0 ? "left" : "center",
      valign: "middle",
    });
    curX += colWs[i];
  });

  // Data rows (mint alt rows)
  rows.forEach((row, ri) => {
    const ry    = topY + rowH * (ri + 1);
    const isAlt = ri % 2 === 1;
    curX = startX;
    row.forEach((cell, ci) => {
      slide.addShape("rect", {
        x: curX, y: ry, w: colWs[ci], h: rowH,
        fill: { color: isAlt ? THEME.colors.grabGreenMint : THEME.colors.bgWhite },
        line: { color: THEME.colors.borderLight, pt: 0.5 },
      });
      const cellStyle = typeof cell === "object" && cell.bold
        ? THEME.typeStyles.tableBodyBold
        : THEME.typeStyles.tableBody;
      const cellText  = typeof cell === "object" ? cell.text : cell;
      const cellColor = typeof cell === "object" && cell.color ? cell.color : undefined;
      slide.addText(cellText, {
        ...cellStyle,
        ...(cellColor ? { color: cellColor } : {}),
        x: curX + 0.08, y: ry, w: colWs[ci] - 0.16, h: rowH,
        align: ci === 0 ? "left" : "center",
        valign: "middle",
      });
      curX += colWs[ci];
    });
  });

  const tableH = rowH * (1 + rows.length);
  return { nextY: topY + tableH + sp.gutterMd };
}

// ── T8: Callout Box ───────────────────────────────────────────────────────────
// Green-wash card with semantic left accent bar.
// type: "insight" | "warning" | "risk" | "info"
function addCalloutBox(slide, text, type, opts = {}) {
  const sp = THEME.spacing;
  const x  = opts.x || sp.marginH;
  const y  = opts.y || sp.contentY;
  const w  = opts.w || sp.contentW;
  const h  = opts.h || 0.65;

  const barColors = {
    insight: THEME.colors.grabGreen,
    warning: THEME.colors.accentAmber,
    risk:    THEME.colors.accentRed,
    info:    THEME.colors.grabGreenDark,
  };
  const barColor = barColors[type] || barColors.insight;

  // Background card (green-wash)
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: THEME.colors.grabGreenWash },
    line: { color: THEME.colors.grabGreenMint, pt: 0.5 },
    rectRadius: THEME.shapes.card.rectRadius,
  });
  // Colored left accent bar (semantic)
  slide.addShape("rect", {
    x, y, w: 0.08, h,
    fill: { color: barColor },
    line: { type: "none" },
  });
  // Text
  slide.addText(text, {
    ...THEME.typeStyles.body,
    bold: true,
    x: x + 0.2, y, w: w - 0.25, h,
    valign: "middle",
    wrap: true,
  });

  return { nextY: y + h + sp.gutterSm };
}

// ── T9: Recommendation + Next Steps ──────────────────────────────────────────
// TWO-THIRD layout: Grab Green left-bar recommendation box (left) + evidence (right).
function addRecommendationSlide(slide, recommendation, evidence, nextSteps, opts = {}) {
  const sp   = THEME.spacing;
  const topY = sp.contentY;
  const h    = opts.h || 2.5;
  const g    = THEME.grids.TWO_THIRD;

  // Recommendation box (left, green-wash + Grab Green left accent bar)
  slide.addShape("rect", {
    x: g[0].x, y: topY, w: g[0].w, h,
    fill: { color: THEME.colors.grabGreenWash },
    line: { color: THEME.colors.grabGreenMint, pt: 0.5 },
    rectRadius: THEME.shapes.card.rectRadius,
  });
  slide.addShape("rect", {
    x: g[0].x, y: topY, w: 0.1, h,
    fill: { color: THEME.colors.grabGreen },
    line: { type: "none" },
  });
  slide.addText("RECOMMENDATION", {
    ...THEME.typeStyles.subhead,
    x: g[0].x + 0.25, y: topY + 0.12, w: g[0].w - 0.3, h: 0.28,
    valign: "top",
  });
  slide.addText(recommendation, {
    ...THEME.typeStyles.body,
    x: g[0].x + 0.25, y: topY + 0.45, w: g[0].w - 0.3, h: h - 0.55,
    valign: "top", wrap: true,
  });

  // Supporting evidence (right)
  if (evidence && evidence.length > 0) {
    slide.addText("SUPPORTING EVIDENCE", {
      ...THEME.typeStyles.subhead,
      x: g[1].x, y: topY, w: g[1].w, h: 0.28,
      valign: "top",
    });
    let ey = topY + 0.35;
    evidence.forEach(e => {
      slide.addText(`• ${e}`, {
        ...THEME.typeStyles.bullet,
        x: g[1].x, y: ey, w: g[1].w, h: 0.28,
        valign: "top",
      });
      ey += 0.3;
    });
  }

  // Next Steps table (below)
  const nsY = topY + h + sp.gutterMd;
  if (nextSteps && nextSteps.length > 0) {
    slide.addText("NEXT STEPS", {
      ...THEME.typeStyles.subhead,
      x: sp.marginH, y: nsY, w: sp.contentW, h: 0.28,
      valign: "top",
    });
    const headers = ["Action", "Owner", "Timeline"];
    const colWidths = [0.5, 0.25, 0.25];
    return addDataTable(slide, headers, nextSteps, {
      y: nsY + 0.32, colWidths, rowH: 0.3,
    });
  }

  return { nextY: nsY };
}

// ── T10: Executive Summary ────────────────────────────────────────────────────
// Warm-dark background (#1F2227). 3-5 key-takeaway bullets, Decisions Required section.
// bullets: [{ headline, evidence }]
// decisions: [{ n, title, detail }] or [string]
function addExecSummary(slide, bullets, decisions, opts = {}) {
  applyMaster(slide, "DARK");
  const sp = THEME.spacing;

  // Tracker
  slide.addText("EXECUTIVE SUMMARY", {
    ...THEME.typeStyles.tracker,
    color: "D4EEE1",
    x: sp.marginH, y: sp.trackerY, w: sp.contentW, h: sp.trackerH,
    valign: "top",
  });

  // Action Title
  const titleText = opts.title || "Key Decisions and Strategic Priorities";
  slide.addText(titleText, {
    ...THEME.typeStyles.actionTitleDark,
    x: sp.marginH, y: sp.titleY, w: sp.contentW, h: sp.titleH,
    valign: "top", wrap: true,
  });

  // Divider (dark)
  slide.addShape("rect", {
    x: sp.marginH, y: sp.dividerY, w: sp.contentW, h: 0,
    line: THEME.shapes.dividerLineDark.line,
    fill: { type: "none" },
  });

  // Key bullets (Grab Green numbered badges)
  let bY = sp.contentY;
  (bullets || []).slice(0, 5).forEach((b, i) => {
    const bh = b.evidence ? 0.6 : 0.35;
    // Grab Green badge
    slide.addShape("rect", {
      x: sp.marginH, y: bY + 0.04, w: 0.24, h: 0.24,
      fill: { color: THEME.colors.grabGreen },
      line: { type: "none" },
    });
    slide.addText(`${i + 1}`, {
      ...THEME.typeStyles.tableHeader,
      x: sp.marginH, y: bY + 0.04, w: 0.24, h: 0.24,
      align: "center", valign: "middle",
    });
    slide.addText(b.headline || b, {
      ...THEME.typeStyles.bodyDark,
      bold: true,
      x: sp.marginH + 0.32, y: bY, w: sp.contentW - 0.32, h: 0.3,
      valign: "top",
    });
    if (b.evidence) {
      slide.addText(b.evidence, {
        ...THEME.typeStyles.caption,
        color: "D4EEE1",
        x: sp.marginH + 0.32, y: bY + 0.3, w: sp.contentW - 0.32, h: 0.25,
        valign: "top",
      });
    }
    bY += bh + sp.gutterSm;
  });

  // Decisions Required (amber accent — semantic warning/action)
  if (decisions && decisions.length > 0) {
    const decY = Math.max(bY + sp.gutterMd, 5.8);
    slide.addShape("rect", {
      x: sp.marginH, y: decY, w: sp.contentW, h: 0.04,
      fill: { color: THEME.colors.accentAmber },
      line: { type: "none" },
    });
    slide.addText("DECISIONS REQUIRED", {
      ...THEME.typeStyles.subheadDark,
      color: THEME.colors.accentAmber,
      x: sp.marginH, y: decY + 0.08, w: sp.contentW, h: 0.28,
      valign: "top",
    });
    let dY = decY + 0.4;
    decisions.forEach(d => {
      const text = typeof d === "object" ? `${d.title}  —  ${d.detail}` : `→ ${d}`;
      slide.addText(text, {
        ...THEME.typeStyles.bulletDark,
        x: sp.marginH, y: dY, w: sp.contentW, h: 0.25,
        valign: "top",
      });
      dY += 0.27;
    });
  }

  return { nextY: bY };
}

// ── T11: Argument Slide ───────────────────────────────────────────────────────
// Key assertion box (top, full-width, light green fill, Grab Green left accent bar)
// + 2-3 numbered argument cards (headline + evidence, Grab Green circle badge)
// + optional "Therefore" synthesis bar at bottom.
//
// args: [{ headline, evidence, badge_color? }, ...]  — 2 or 3 elements
// opts: { therefore?, therefore_type: "insight"|"warning", y?, source? }
function addArgumentSlide(slide, assertionText, args, opts = {}) {
  const sp      = THEME.spacing;
  const topY    = opts.y || sp.contentY;
  const n       = Math.min(args.length, 3);
  const hasThus = !!(opts.therefore);

  // ── Assertion box ──────────────────────────────────────────────────────────
  const assertH = 0.85;
  slide.addShape("rect", {
    x: sp.marginH, y: topY, w: sp.contentW, h: assertH,
    fill: { color: "F0FAF4" },
    line: { color: "D4EEE1", pt: 0.5 },
    rectRadius: THEME.shapes.card.rectRadius,
  });
  // Grab Green left accent bar
  slide.addShape("rect", {
    x: sp.marginH, y: topY, w: 0.1, h: assertH,
    fill: { color: THEME.colors.grabGreen },
    line: { type: "none" },
  });
  slide.addText(assertionText, {
    ...THEME.typeStyles.body,
    bold: true,
    x: sp.marginH + 0.22, y: topY, w: sp.contentW - 0.27, h: assertH,
    valign: "middle",
    wrap: true,
  });

  // ── Argument cards ─────────────────────────────────────────────────────────
  const cardGap     = 0.2;
  const cardTopY    = topY + assertH + 0.18;
  const thereforeH  = hasThus ? 0.52 : 0;
  const thereforeGap = hasThus ? 0.15 : 0;
  const cardBotY    = sp.footerY - 0.1 - thereforeH - thereforeGap;
  const cardH       = cardBotY - cardTopY;
  const cardW       = (sp.contentW - cardGap * (n - 1)) / n;
  const badgeDia    = 0.35;

  args.slice(0, n).forEach((arg, i) => {
    const cx         = sp.marginH + i * (cardW + cardGap);
    const badgeColor = arg.badge_color || THEME.colors.grabGreen;

    // Card background (light gray fill, Grab Green left border)
    slide.addShape("rect", {
      x: cx, y: cardTopY, w: cardW, h: cardH,
      fill: { color: "F5F5F5" },
      line: { color: THEME.colors.grabGreen, pt: 2 },
      rectRadius: THEME.shapes.card.rectRadius,
    });

    // Numbered badge (circle)
    slide.addShape("ellipse", {
      x: cx + sp.cardPad, y: cardTopY + 0.18, w: badgeDia, h: badgeDia,
      fill: { color: badgeColor },
      line: { type: "none" },
    });
    slide.addText(`${i + 1}`, {
      ...THEME.typeStyles.tableHeader,
      x: cx + sp.cardPad, y: cardTopY + 0.18, w: badgeDia, h: badgeDia,
      align: "center", valign: "middle",
    });

    // Argument headline (bold, dark)
    slide.addText(arg.headline, {
      ...THEME.typeStyles.body,
      bold: true,
      color: "1F2227",
      x: cx + sp.cardPad + badgeDia + 0.12, y: cardTopY + 0.18,
      w: cardW - sp.cardPad * 2 - badgeDia - 0.12, h: 0.35,
      valign: "middle",
      wrap: true,
    });

    // Supporting evidence (2-3 lines, muted)
    if (arg.evidence) {
      slide.addText(arg.evidence, {
        ...THEME.typeStyles.caption,
        color: "5E5E5E",
        x: cx + sp.cardPad, y: cardTopY + 0.18 + badgeDia + 0.15,
        w: cardW - sp.cardPad * 2, h: cardH - 0.18 - badgeDia - 0.35,
        valign: "top",
        wrap: true,
      });
    }
  });

  // ── "Therefore" synthesis bar (optional) ───────────────────────────────────
  if (hasThus) {
    const thereforeColors = {
      warning: THEME.colors.accentAmber,
      insight: THEME.colors.grabGreen,
    };
    const barColor   = thereforeColors[opts.therefore_type] || THEME.colors.grabGreen;
    const barFill    = barColor === THEME.colors.grabGreen ? "F0FAF4" : "FFF8E1";
    const barY       = cardBotY + thereforeGap;

    slide.addShape("rect", {
      x: sp.marginH, y: barY, w: sp.contentW, h: thereforeH,
      fill: { color: barFill },
      line: { color: barColor, pt: 1.5 },
      rectRadius: THEME.shapes.card.rectRadius,
    });
    slide.addShape("rect", {
      x: sp.marginH, y: barY, w: 0.1, h: thereforeH,
      fill: { color: barColor },
      line: { type: "none" },
    });
    slide.addText(`Therefore: ${opts.therefore}`, {
      ...THEME.typeStyles.body,
      italic: true,
      color: "1F2227",
      x: sp.marginH + 0.22, y: barY, w: sp.contentW - 0.27, h: thereforeH,
      valign: "middle",
      wrap: true,
    });
  }

  // Source footer
  if (opts.source) {
    slide.addText(`Source: ${opts.source}`, {
      ...THEME.typeStyles.source,
      color: "919191",
      x: sp.marginH, y: sp.footerY, w: sp.contentW - 1, h: sp.footerH,
      valign: "bottom",
    });
  }

  return { nextY: cardBotY + thereforeH + thereforeGap };
}

module.exports = {
  applyMaster,
  addSlideChrome,
  addTitleSlide,
  addSectionDivider,
  addContentSlide,
  addKPIRow,
  addChartWithInterpretation,
  addComparisonColumns,
  addDataTable,
  addCalloutBox,
  addRecommendationSlide,
  addExecSummary,
  addArgumentSlide,
};
