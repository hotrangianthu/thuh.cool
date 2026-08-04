"use strict";

/**
 * Consultant Diagram Templates — V1 through V7
 * Visual-first layout helpers for McKinsey-grade consulting slides.
 * Replaces bullet-heavy text with spatial, relational, or process visuals.
 *
 * All shapes use THEME tokens exclusively — no ad-hoc hex values.
 * All functions: (slide, contentArgs, opts?) → { nextY }
 *
 * V1  addProcessFlow     — Sequential phases, timelines, go-to-market rollout
 * V2  addFunnel          — TAM/SAM/SOM, conversion funnels, filtering
 * V3  addFlywheel        — Compounding growth, reinforcing loops, virtuous cycles
 * V4  addHubAndSpoke     — Central capability + radiating advantages / moats
 * V5  addLayeredStack    — Tech stacks, org layers, strategic tiers, value chains
 * V6  add2x2Matrix       — Strategic positioning, BCG matrix, risk assessment
 * V7  addBridgeWaterfall — Financial build-up, cost decomposition, metric transformation
 *
 * Validation:
 * validateVisualDiversity — checks 30%+ of content slides are conceptual visuals
 */

const { THEME } = require("./theme");

// ─── Internal helper: draw a line between two exact points ───────────────────
// PptxGenJS lines require x,y,w,h > 0. Use flipH/flipV for direction.
function _line(slide, x1, y1, x2, y2, lineStyle) {
  const lx = Math.min(x1, x2);
  const ly = Math.min(y1, y2);
  const lw = Math.max(Math.abs(x2 - x1), 0.005);
  const lh = Math.max(Math.abs(y2 - y1), 0.005);
  slide.addShape("line", {
    x: lx, y: ly, w: lw, h: lh,
    flipH: x2 < x1,
    flipV: y2 < y1,
    line: lineStyle,
  });
}

// ─── V1: Process Flow (Arrow Chain) ──────────────────────────────────────────
/**
 * Sequential phases, timelines, go-to-market rollout
 *
 * steps: [{
 *   label:    string  — phase/step name
 *   metric?:  string  — prominent metric inside the box (e.g. "$2M", "6mo")
 *   sublabel?:string  — smaller caption at bottom (e.g. "OTC cities only")
 *   active?:  bool    — highlight this step (current phase) — Grab Green fill
 *   complete?:bool    — completed phase — mint fill
 * }]
 * opts: { x, y, w, h, max: 5 }
 */
function addProcessFlow(slide, steps, opts = {}) {
  const sp     = THEME.spacing;
  const x      = opts.x    != null ? opts.x    : sp.marginH;
  const y      = opts.y    != null ? opts.y    : sp.contentY;
  const w      = opts.w    != null ? opts.w    : sp.contentW;
  const h      = opts.h    != null ? opts.h    : 1.8;
  const n      = Math.min((steps || []).length, opts.max || 5);
  const gap    = 0.22;
  const stepW  = (w - gap * (n - 1)) / n;

  steps.slice(0, n).forEach((step, i) => {
    const sx         = x + i * (stepW + gap);
    const isActive   = !!step.active;
    const isComplete = !!step.complete;

    const fillColor   = isActive   ? THEME.colors.grabGreen
                      : isComplete ? THEME.colors.grabGreenMint
                      :              THEME.colors.grabGreenWash;
    const borderColor = isActive   ? THEME.colors.grabGreenDark
                      : isComplete ? THEME.colors.grabGreen
                      :              THEME.colors.borderLight;
    const labelColor  = isActive   ? THEME.colors.white
                      :              THEME.colors.grabGreenDark;
    const metricColor = isActive   ? THEME.colors.white
                      :              THEME.colors.grabGreen;
    const subColor    = isActive   ? "D4EEE1" : THEME.colors.textMid;

    // Step box
    slide.addShape("rect", {
      x: sx, y, w: stepW, h,
      fill: { color: fillColor },
      line: { color: borderColor, pt: 0.75 },
      rectRadius: 0.08,
    });

    // Grab Green top accent bar (inverted to white on active)
    slide.addShape("rect", {
      x: sx, y, w: stepW, h: 0.06,
      fill: { color: isActive ? "FFFFFF" : THEME.colors.grabGreen },
      line: { type: "none" },
    });

    // Step number badge
    slide.addShape("rect", {
      x: sx + 0.14, y: y + 0.14, w: 0.24, h: 0.24,
      fill: { color: isActive ? "FFFFFF" : THEME.colors.grabGreen },
      line: { type: "none" },
      rectRadius: 0.12,
    });
    slide.addText(`${i + 1}`, {
      ...THEME.typeStyles.tableHeader,
      color: isActive ? THEME.colors.grabGreen : THEME.colors.white,
      x: sx + 0.14, y: y + 0.14, w: 0.24, h: 0.24,
      align: "center", valign: "middle",
    });

    // Step label
    slide.addText(step.label, {
      ...THEME.typeStyles.subhead,
      color: labelColor,
      x: sx + 0.14, y: y + 0.46, w: stepW - 0.28, h: 0.36,
      valign: "top", wrap: true,
    });

    // Metric (prominent number/value embedded in box)
    if (step.metric) {
      slide.addText(step.metric, {
        ...THEME.typeStyles.metricMd,
        color: metricColor,
        x: sx + 0.14, y: y + 0.86, w: stepW - 0.28, h: 0.5,
        align: "left", valign: "middle",
      });
    }

    // Sub-label (bottom caption)
    if (step.sublabel) {
      slide.addText(step.sublabel, {
        ...THEME.typeStyles.caption,
        color: subColor,
        x: sx + 0.14, y: y + h - 0.34, w: stepW - 0.28, h: 0.28,
        valign: "bottom", wrap: true,
      });
    }

    // Arrow connector to next step
    if (i < n - 1) {
      const ax = sx + stepW + 0.03;
      const ay = y + h / 2;
      slide.addShape("line", {
        x: ax, y: ay, w: gap - 0.06, h: 0,
        line: { color: THEME.colors.borderMid, pt: 1.5, endArrowType: "arrow" },
      });
    }
  });

  return { nextY: y + h + sp.gutterMd };
}

// ─── V2: Funnel / Convergence ─────────────────────────────────────────────────
/**
 * Market sizing (TAM → SAM → SOM), conversion funnels, filtering stages
 * Visual: stacked horizontal bars narrowing toward the bottom — data INSIDE each bar
 *
 * layers: [{
 *   label:    string  — tier name (e.g. "TAM", "SAM", "SOM")
 *   value:    string  — metric embedded in bar (e.g. "$2.1B", "15-20%")
 *   width?:   number  — fraction 0.0–1.0 (default: auto-decreasing)
 *   sublabel?:string  — small caption below label
 * }]
 * opts: { x, y, w, h }
 */
function addFunnel(slide, layers, opts = {}) {
  const sp    = THEME.spacing;
  const x     = opts.x != null ? opts.x : sp.marginH;
  const y     = opts.y != null ? opts.y : sp.contentY;
  const w     = opts.w != null ? opts.w : sp.contentW;
  const h     = opts.h != null ? opts.h : sp.contentH;
  const n     = (layers || []).length;
  const gap   = 0.18;
  const barH  = (h - gap * (n - 1)) / n;

  // Color progression: light → dark as funnel narrows
  const FILLS   = [THEME.colors.grabGreenWash, THEME.colors.grabGreenMint,
                   THEME.colors.grabGreen,     THEME.colors.grabGreenDark];
  const BORDERS = [THEME.colors.grabGreenMint, THEME.colors.grabGreen,
                   THEME.colors.grabGreenDark, THEME.colors.grabGreenDark];
  const LABEL_C = [THEME.colors.grabGreenDark, THEME.colors.grabGreenDark,
                   THEME.colors.white,         THEME.colors.white];
  const VALUE_C = [THEME.colors.grabGreen,     THEME.colors.grabGreenDark,
                   THEME.colors.white,         THEME.colors.white];

  layers.forEach((layer, i) => {
    const frac   = layer.width != null ? layer.width : 1 - (i / n) * 0.42;
    const barW   = w * frac;
    const bx     = x + (w - barW) / 2;
    const by     = y + i * (barH + gap);
    const fi     = Math.min(i, FILLS.length - 1);

    // Funnel bar
    slide.addShape("rect", {
      x: bx, y: by, w: barW, h: barH,
      fill:   { color: FILLS[fi] },
      line:   { color: BORDERS[fi], pt: 0.5 },
      rectRadius: 0.06,
    });

    // Label embedded in bar (left side)
    slide.addText(layer.label, {
      ...THEME.typeStyles.subhead,
      color: LABEL_C[fi],
      x: bx + 0.25, y: by, w: barW * 0.5, h: barH,
      valign: "middle",
    });

    // Value embedded in bar (right side) — data IS the visual
    slide.addText(layer.value, {
      ...THEME.typeStyles.metricMd,
      color: VALUE_C[fi],
      x: bx + barW * 0.52, y: by, w: barW * 0.44, h: barH,
      align: "right", valign: "middle",
    });

    // Sub-label (below main label, if provided)
    if (layer.sublabel) {
      slide.addText(layer.sublabel, {
        ...THEME.typeStyles.caption,
        color: fi >= 2 ? "D4EEE1" : THEME.colors.textLight,
        x: bx + 0.25, y: by + barH * 0.58, w: barW * 0.5, h: barH * 0.38,
        valign: "bottom",
      });
    }

    // Left-side percentage delta (if this is not the first layer)
    if (i > 0 && layer.conversion) {
      slide.addText(layer.conversion, {
        ...THEME.typeStyles.caption,
        bold: true,
        color: THEME.colors.grabGreen,
        x: x, y: by, w: (w - barW) / 2 - 0.05, h: barH,
        align: "right", valign: "middle",
      });
    }
  });

  return { nextY: y + h + sp.gutterMd };
}

// ─── V3: Flywheel / Reinforcing Cycle ────────────────────────────────────────
/**
 * Compounding growth, virtuous cycles, reinforcing loops
 * Visual: 3–5 boxes arranged in a circle with a central hub and directional connectors
 *
 * segments: [{
 *   label:    string  — segment name (e.g. "More Drivers")
 *   metric?:  string  — embedded metric (e.g. "+15%")
 *   sublabel?:string  — supporting caption
 * }]
 * opts: { x, y, w, h, title?, centerLabel? }
 */
function addFlywheel(slide, segments, opts = {}) {
  const sp  = THEME.spacing;
  const x   = opts.x != null ? opts.x : sp.marginH;
  const y   = opts.y != null ? opts.y : sp.contentY;
  const w   = opts.w != null ? opts.w : sp.contentW;
  const h   = opts.h != null ? opts.h : sp.contentH;
  const n   = Math.min(Math.max((segments || []).length, 3), 5);
  const cx  = x + w / 2;
  const cy  = y + h / 2;

  // Sizing — scale to available space
  const radius  = Math.min(w * 0.34, h * 0.36);
  const centerR = Math.min(radius * 0.32, 0.85);
  const boxW    = Math.min(w * 0.26, 2.9);
  const boxH    = Math.min(h * 0.30, 1.35);

  // Center circle (the flywheel hub)
  slide.addShape("ellipse", {
    x: cx - centerR, y: cy - centerR, w: centerR * 2, h: centerR * 2,
    fill: { color: THEME.colors.grabGreen },
    line: { color: THEME.colors.grabGreenDark, pt: 2 },
  });
  const centerLabel = opts.centerLabel || opts.title || "GROWTH\nFLYWHEEL";
  slide.addText(centerLabel, {
    fontFace: THEME.fonts.primaryBlack, fontSize: 8, color: THEME.colors.white, bold: false,
    x: cx - centerR, y: cy - centerR, w: centerR * 2, h: centerR * 2,
    align: "center", valign: "middle",
  });

  // Clockwise rotation indicator (circled arrow text)
  slide.addText("↻", {
    fontFace: THEME.fonts.primaryBlack, fontSize: 14, color: "FFFFFF",
    x: cx - centerR, y: cy + centerR * 0.05, w: centerR * 2, h: centerR * 0.6,
    align: "center", valign: "top",
    transparency: 40,
  });

  // Segment boxes arranged in a circle
  segments.slice(0, n).forEach((seg, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i / n);
    const bx    = cx + Math.cos(angle) * radius - boxW / 2;
    const by    = cy + Math.sin(angle) * radius - boxH / 2;
    const fi    = i % 2;

    const fillColor = fi === 0 ? THEME.colors.grabGreenWash : THEME.colors.grabGreenMint;

    // Connector line: hub center → box center
    _line(slide, cx, cy, bx + boxW / 2, by + boxH / 2,
      { color: THEME.colors.grabGreenMint, pt: 1.5, dashType: "sysDash" });

    // Segment box
    slide.addShape("rect", {
      x: bx, y: by, w: boxW, h: boxH,
      fill: { color: fillColor },
      line: { color: THEME.colors.grabGreen, pt: 1 },
      rectRadius: 0.08,
    });

    // Green top accent bar
    slide.addShape("rect", {
      x: bx, y: by, w: boxW, h: 0.05,
      fill: { color: THEME.colors.grabGreen },
      line: { type: "none" },
    });

    // Segment label
    slide.addText(seg.label, {
      ...THEME.typeStyles.subhead,
      color: THEME.colors.grabGreenDark,
      x: bx + 0.12, y: by + 0.1, w: boxW - 0.24, h: 0.34,
      valign: "top", wrap: true,
    });

    // Metric embedded in box
    if (seg.metric) {
      slide.addText(seg.metric, {
        ...THEME.typeStyles.metricMd,
        color: THEME.colors.grabGreen,
        x: bx + 0.12, y: by + 0.48, w: boxW - 0.24, h: 0.45,
        align: "left", valign: "top",
      });
    }

    // Sub-label
    if (seg.sublabel) {
      slide.addText(seg.sublabel, {
        ...THEME.typeStyles.caption,
        color: THEME.colors.textMid,
        x: bx + 0.12, y: by + boxH - 0.34, w: boxW - 0.24, h: 0.28,
        valign: "bottom",
      });
    }

    // Directional arrow between this segment and the next (clockwise)
    const nextAngle = (-Math.PI / 2) + (2 * Math.PI * ((i + 1) % n) / n);
    const midAngle  = (angle + nextAngle) / 2;
    const arR       = radius * 0.68;
    // Arrow head: two short perpendicular lines at midpoint
    const ax = cx + Math.cos(midAngle) * arR;
    const ay = cy + Math.sin(midAngle) * arR;
    // Tangent direction at midpoint (clockwise = perpendicular to radius)
    const tx = -Math.sin(midAngle);
    const ty =  Math.cos(midAngle);
    const arLen = 0.25;
    const ax1 = ax - tx * arLen / 2;
    const ay1 = ay - ty * arLen / 2;
    const ax2 = ax + tx * arLen / 2;
    const ay2 = ay + ty * arLen / 2;
    _line(slide, ax1, ay1, ax2, ay2,
      { color: THEME.colors.grabGreen, pt: 2, endArrowType: "arrow" });
  });

  return { nextY: y + h + sp.gutterMd };
}

// ─── V4: Hub-and-Spoke / Moat Diagram ────────────────────────────────────────
/**
 * Central capability with radiating advantages — platform moats, ecosystems
 * Visual: center circle + surrounding boxes connected by lines
 *
 * hub: { label, metric?, sublabel? }
 * spokes: [{
 *   label:    string  — advantage name (e.g. "Payment Rails")
 *   metric?:  string  — key metric inside spoke box
 *   sublabel?:string  — supporting note
 * }]
 * opts: { x, y, w, h }  — 3 to 6 spokes supported
 */
function addHubAndSpoke(slide, hub, spokes, opts = {}) {
  const sp          = THEME.spacing;
  const x           = opts.x != null ? opts.x : sp.marginH;
  const y           = opts.y != null ? opts.y : sp.contentY;
  const w           = opts.w != null ? opts.w : sp.contentW;
  const h           = opts.h != null ? opts.h : sp.contentH;
  const n           = Math.min(Math.max((spokes || []).length, 3), 6);
  const cx          = x + w / 2;
  const cy          = y + h / 2;

  const hubR        = Math.min(w, h) * 0.13;
  const spokeRadius = Math.min(w * 0.34, h * 0.38);
  const spokeBoxW   = Math.min(w * 0.21, 2.5);
  const spokeBoxH   = 1.2;

  // Hub circle
  slide.addShape("ellipse", {
    x: cx - hubR, y: cy - hubR, w: hubR * 2, h: hubR * 2,
    fill: { color: THEME.colors.grabGreen },
    line: { color: THEME.colors.grabGreenDark, pt: 2 },
  });

  // Hub label (bold)
  slide.addText((hub || {}).label || "CORE", {
    fontFace: THEME.fonts.primaryBlack, fontSize: 10, color: THEME.colors.white, bold: false,
    x: cx - hubR, y: cy - hubR, w: hubR * 2,
    h: (hub || {}).metric ? hubR * 1.1 : hubR * 2,
    align: "center", valign: (hub || {}).metric ? "bottom" : "middle",
  });

  // Hub metric (below label)
  if ((hub || {}).metric) {
    slide.addText(hub.metric, {
      ...THEME.typeStyles.caption,
      color: "D4EEE1",
      x: cx - hubR, y: cy, w: hubR * 2, h: hubR * 0.8,
      align: "center", valign: "top",
    });
  }

  // Spoke boxes
  spokes.slice(0, n).forEach((spoke, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i / n);
    const bx    = cx + Math.cos(angle) * spokeRadius - spokeBoxW / 2;
    const by    = cy + Math.sin(angle) * spokeRadius - spokeBoxH / 2;

    // Connector: hub center → spoke center
    _line(slide, cx, cy, bx + spokeBoxW / 2, by + spokeBoxH / 2,
      { color: THEME.colors.grabGreen, pt: 1.5, dashType: "sysDash" });

    // Spoke box
    slide.addShape("rect", {
      x: bx, y: by, w: spokeBoxW, h: spokeBoxH,
      fill: { color: THEME.colors.grabGreenMint },
      line: { color: THEME.colors.grabGreen, pt: 1 },
      rectRadius: 0.08,
    });

    // Left accent bar
    slide.addShape("rect", {
      x: bx, y: by, w: 0.06, h: spokeBoxH,
      fill: { color: THEME.colors.grabGreen },
      line: { type: "none" },
    });

    // Spoke label
    slide.addText(spoke.label, {
      ...THEME.typeStyles.subhead,
      color: THEME.colors.grabGreenDark,
      x: bx + 0.18, y: by + 0.1, w: spokeBoxW - 0.24, h: 0.34,
      valign: "top", wrap: true,
    });

    // Spoke metric embedded in box
    if (spoke.metric) {
      slide.addText(spoke.metric, {
        ...THEME.typeStyles.metricMd,
        color: THEME.colors.grabGreen,
        x: bx + 0.18, y: by + 0.48, w: spokeBoxW - 0.24, h: 0.45,
        align: "left", valign: "top",
      });
    }

    // Sub-label
    if (spoke.sublabel) {
      slide.addText(spoke.sublabel, {
        ...THEME.typeStyles.caption,
        color: THEME.colors.textMid,
        x: bx + 0.18, y: by + spokeBoxH - 0.32, w: spokeBoxW - 0.24, h: 0.28,
        valign: "bottom", wrap: true,
      });
    }
  });

  return { nextY: y + h + sp.gutterMd };
}

// ─── V5: Layered Stack / Architecture ────────────────────────────────────────
/**
 * Technology stacks, org layers, strategic tiers, value chains
 * Visual: horizontal layers stacked top-to-bottom with embedded labels + metrics
 * Top layer = customer-facing (darkest), bottom = foundational (lightest)
 *
 * layers: [{
 *   label:    string  — layer name (e.g. "Customer Experience")
 *   sublabel?:string  — secondary description
 *   metric?:  string  — right-aligned metric inside layer
 *   color?:   string  — override fill hex (from THEME.colors)
 * }]
 * opts: { x, y, w, h }  — 2 to 5 layers
 */
function addLayeredStack(slide, layers, opts = {}) {
  const sp    = THEME.spacing;
  const x     = opts.x != null ? opts.x : sp.marginH;
  const y     = opts.y != null ? opts.y : sp.contentY;
  const w     = opts.w != null ? opts.w : sp.contentW;
  const h     = opts.h != null ? opts.h : sp.contentH;
  const n     = Math.min((layers || []).length, 5);
  const gap   = 0.14;
  const layH  = (h - gap * (n - 1)) / n;

  // Color cascade: top = darkest green (customer-facing), bottom = lightest
  const FILLS   = [THEME.colors.grabGreen, THEME.colors.grabGreenMint,
                   THEME.colors.grabGreenWash, THEME.colors.bgLightGray, "FFFFFF"];
  const BORDERS = [THEME.colors.grabGreenDark, THEME.colors.grabGreen,
                   THEME.colors.grabGreenMint, THEME.colors.borderLight,
                   THEME.colors.borderLight];
  const TEXT_C  = [THEME.colors.white, THEME.colors.grabGreenDark,
                   THEME.colors.grabGreenDark, THEME.colors.textDark,
                   THEME.colors.textDark];
  const SUB_C   = ["D4EEE1", THEME.colors.textMid, THEME.colors.textMid,
                   THEME.colors.textLight, THEME.colors.textLight];

  layers.slice(0, n).forEach((layer, i) => {
    const ly          = y + i * (layH + gap);
    const fillColor   = layer.color || FILLS[Math.min(i, FILLS.length - 1)];
    const borderColor = BORDERS[Math.min(i, BORDERS.length - 1)];
    const textColor   = TEXT_C[Math.min(i, TEXT_C.length - 1)];
    const subColor    = SUB_C[Math.min(i, SUB_C.length - 1)];
    const isTop       = i === 0;

    // Layer block
    slide.addShape("rect", {
      x, y: ly, w, h: layH,
      fill: { color: fillColor },
      line: { color: borderColor, pt: 0.75 },
      rectRadius: 0.06,
    });

    // Layer number badge (left edge)
    slide.addShape("rect", {
      x: x + 0.15, y: ly + (layH - 0.28) / 2, w: 0.28, h: 0.28,
      fill: { color: isTop ? "FFFFFF" : THEME.colors.grabGreen },
      line: { type: "none" },
      rectRadius: 0.14,
    });
    slide.addText(`${n - i}`, {
      ...THEME.typeStyles.tableHeader,
      color: isTop ? THEME.colors.grabGreen : THEME.colors.white,
      x: x + 0.15, y: ly + (layH - 0.28) / 2, w: 0.28, h: 0.28,
      align: "center", valign: "middle",
    });

    // Layer label (center-left)
    slide.addText(layer.label, {
      ...THEME.typeStyles.subhead,
      color: textColor,
      x: x + 0.58, y: ly, w: w * 0.54,
      h: layer.sublabel ? layH * 0.55 : layH,
      valign: layer.sublabel ? "bottom" : "middle",
    });

    // Sub-label below label
    if (layer.sublabel) {
      slide.addText(layer.sublabel, {
        ...THEME.typeStyles.caption,
        color: subColor,
        x: x + 0.58, y: ly + layH * 0.55, w: w * 0.54, h: layH * 0.42,
        valign: "top",
      });
    }

    // Metric right-aligned inside layer
    if (layer.metric) {
      slide.addText(layer.metric, {
        ...THEME.typeStyles.metricMd,
        color: isTop ? THEME.colors.white : THEME.colors.grabGreen,
        x: x + w * 0.72, y: ly, w: w * 0.25, h: layH,
        align: "right", valign: "middle",
      });
    }
  });

  return { nextY: y + h + sp.gutterMd };
}

// ─── V6: 2×2 Strategic Matrix ─────────────────────────────────────────────────
/**
 * Strategic positioning, BCG matrix, risk assessment, option evaluation
 * Visual: four quadrants with axis labels + plotted dot items
 *
 * quadrants: [{
 *   position: 'TL'|'TR'|'BL'|'BR'
 *   label?:   string  — quadrant label (e.g. "Stars", "High Risk")
 *   color?:   string  — override fill hex
 *   items?: [{
 *     name:  string   — item label
 *     x:     number   — 0.0–1.0 fraction within quadrant (left=0, right=1)
 *     y:     number   — 0.0–1.0 fraction within quadrant (bottom=0, top=1)
 *     color?:string   — dot color override
 *   }]
 * }]
 * axes: { x: { label, low, high }, y: { label, low, high } }
 * opts: { x, y, w, h }
 */
function add2x2Matrix(slide, quadrants, axes, opts = {}) {
  const sp       = THEME.spacing;
  const x        = opts.x != null ? opts.x : sp.marginH;
  const y        = opts.y != null ? opts.y : sp.contentY;
  const w        = opts.w != null ? opts.w : sp.contentW;
  const h        = opts.h != null ? opts.h : sp.contentH;
  const axPad    = 0.32; // space for axis labels
  const gridX    = x + axPad;
  const gridY    = y;
  const gridW    = w - axPad;
  const gridH    = h - axPad;
  const halfW    = (gridW - 0.06) / 2;
  const halfH    = (gridH - 0.06) / 2;
  const dotR     = 0.16;

  const Q_DEFAULTS = {
    TL: { color: THEME.colors.grabGreenMint },
    TR: { color: THEME.colors.grabGreenWash },
    BL: { color: THEME.colors.grabGreenWash },
    BR: { color: THEME.colors.bgLightGray   },
  };
  const Q_POS = {
    TL: { qx: gridX,              qy: gridY               },
    TR: { qx: gridX + halfW + 0.06, qy: gridY             },
    BL: { qx: gridX,              qy: gridY + halfH + 0.06 },
    BR: { qx: gridX + halfW + 0.06, qy: gridY + halfH + 0.06 },
  };

  // Draw quadrant boxes
  (quadrants || []).forEach(q => {
    const pos = Q_POS[q.position];
    if (!pos) return;
    const def = Q_DEFAULTS[q.position] || {};

    slide.addShape("rect", {
      x: pos.qx, y: pos.qy, w: halfW, h: halfH,
      fill: { color: q.color || def.color || THEME.colors.grabGreenWash },
      line: { color: THEME.colors.borderLight, pt: 0.75 },
    });

    // Quadrant label (top-left corner of quadrant)
    if (q.label) {
      slide.addText(q.label, {
        ...THEME.typeStyles.caption,
        bold: true,
        color: THEME.colors.grabGreenDark,
        x: pos.qx + 0.12, y: pos.qy + 0.1, w: halfW - 0.24, h: 0.24,
        valign: "top",
      });
    }

    // Plotted items as filled circles
    (q.items || []).forEach(item => {
      const dotX = pos.qx + (item.x || 0.5) * halfW;
      const dotY = pos.qy + (1 - (item.y || 0.5)) * halfH;
      slide.addShape("ellipse", {
        x: dotX - dotR, y: dotY - dotR, w: dotR * 2, h: dotR * 2,
        fill: { color: item.color || THEME.colors.grabGreen },
        line: { color: THEME.colors.grabGreenDark, pt: 0.75 },
      });
      if (item.name) {
        slide.addText(item.name, {
          ...THEME.typeStyles.caption,
          color: THEME.colors.textDark,
          x: dotX + dotR + 0.06, y: dotY - 0.14, w: halfW * 0.55, h: 0.28,
          valign: "middle",
        });
      }
    });
  });

  // Cross-hair dividers
  // Horizontal divider
  slide.addShape("rect", {
    x: gridX, y: gridY + halfH + 0.03, w: gridW, h: 0,
    line: { color: THEME.colors.borderMid, pt: 1.25 },
    fill: { type: "none" },
  });
  // Vertical divider
  slide.addShape("rect", {
    x: gridX + halfW + 0.03, y: gridY, w: 0, h: gridH,
    line: { color: THEME.colors.borderMid, pt: 1.25 },
    fill: { type: "none" },
  });

  // Axis labels
  if (axes) {
    // X-axis: below grid
    if (axes.x) {
      slide.addText(axes.x.label || "", {
        ...THEME.typeStyles.subhead,
        color: THEME.colors.textMid,
        x: gridX, y: y + gridH + 0.06, w: gridW, h: axPad - 0.06,
        align: "center", valign: "top",
      });
      if (axes.x.low) {
        slide.addText(`← ${axes.x.low}`, {
          ...THEME.typeStyles.caption, color: THEME.colors.textLight,
          x: gridX, y: y + gridH + 0.06, w: gridW * 0.35, h: axPad - 0.06,
          align: "left",
        });
      }
      if (axes.x.high) {
        slide.addText(`${axes.x.high} →`, {
          ...THEME.typeStyles.caption, color: THEME.colors.textLight,
          x: gridX + gridW * 0.65, y: y + gridH + 0.06, w: gridW * 0.35, h: axPad - 0.06,
          align: "right",
        });
      }
    }
    // Y-axis: left of grid (rotated)
    if (axes.y) {
      slide.addText(axes.y.label || "", {
        ...THEME.typeStyles.subhead,
        color: THEME.colors.textMid,
        x: x, y: gridY, w: axPad - 0.06, h: gridH,
        align: "center", valign: "middle",
        rotate: 270,
      });
      if (axes.y.low) {
        slide.addText(`${axes.y.low} ↓`, {
          ...THEME.typeStyles.caption, color: THEME.colors.textLight,
          x: x, y: gridY + gridH - axPad, w: axPad - 0.06, h: axPad - 0.06,
          align: "center",
        });
      }
      if (axes.y.high) {
        slide.addText(`↑ ${axes.y.high}`, {
          ...THEME.typeStyles.caption, color: THEME.colors.textLight,
          x: x, y: gridY, w: axPad - 0.06, h: axPad - 0.06,
          align: "center",
        });
      }
    }
  }

  return { nextY: y + h + sp.gutterMd };
}

// ─── V7: Bridge / Waterfall Chart ─────────────────────────────────────────────
/**
 * Financial build-up, metric transformation, cost decomposition
 * Visual: floating bar chart showing how a starting value transforms step-by-step
 *
 * bars: [{
 *   label:  string  — category name (e.g. "Revenue Base", "New Products", "Churn")
 *   value:  number  — absolute value for anchor bars, delta for step bars
 *   type:   "anchor"|"positive"|"negative"  — anchor=full bar, pos/neg=floating step
 *   note?:  string  — small annotation below bar
 * }]
 * opts: { x, y, w, h, unit?, showConnectors? }
 */
function addBridgeWaterfall(slide, bars, opts = {}) {
  const sp        = THEME.spacing;
  const x         = opts.x    != null ? opts.x    : sp.marginH;
  const y         = opts.y    != null ? opts.y    : sp.contentY;
  const w         = opts.w    != null ? opts.w    : sp.contentW;
  const h         = opts.h    != null ? opts.h    : sp.contentH;
  const unit      = opts.unit || "";
  const showConns = opts.showConnectors !== false;
  const n         = (bars || []).length;
  const barW      = (w - sp.gutterMd * (n - 1)) / n;
  const chartH    = h * 0.80;
  const labelH    = h * 0.20;

  // Compute running totals for floating bar positions
  let running = 0;
  const computed = (bars || []).map(b => {
    const base = b.type === "anchor" ? 0 : running;
    if (b.type === "anchor") {
      running = b.value;
    } else {
      running += b.value;
    }
    const top = b.type === "anchor"
      ? Math.max(0, b.value)
      : Math.max(base, base + b.value);
    const bot = b.type === "anchor" ? 0 : Math.min(base, base + b.value);
    return { ...b, base, top, bot, runEnd: running };
  });

  const maxVal = Math.max(...computed.map(c => c.top), 0);
  const minVal = Math.min(...computed.map(c => c.bot), 0);
  const range  = (maxVal - minVal) || 1;

  // Scale a value to y-coordinate within chart area
  const scaleY = val => y + chartH * (1 - (val - minVal) / range);

  const C_ANCHOR = THEME.colors.grabGreenDark;
  const C_POS    = THEME.colors.grabGreen;
  const C_NEG    = THEME.colors.accentRed;

  computed.forEach((b, i) => {
    const bx      = x + i * (barW + sp.gutterMd);
    const barTop  = scaleY(b.top);
    const barBot  = scaleY(b.bot);
    const barHpx  = Math.max(Math.abs(barBot - barTop), 0.08);
    const fillC   = b.type === "anchor" ? C_ANCHOR
                  : b.value >= 0        ? C_POS : C_NEG;

    // Floating bar
    slide.addShape("rect", {
      x: bx, y: barTop, w: barW, h: barHpx,
      fill: { color: fillC },
      line: { type: "none" },
      rectRadius: 0.04,
    });

    // Value label above bar
    const valLabel = b.type === "anchor"
      ? `${b.value}${unit}`
      : `${b.value > 0 ? "+" : ""}${b.value}${unit}`;
    slide.addText(valLabel, {
      ...THEME.typeStyles.caption,
      bold: true,
      color: fillC,
      x: bx, y: barTop - 0.32, w: barW, h: 0.28,
      align: "center", valign: "bottom",
    });

    // Category label below chart area
    slide.addText(b.label, {
      ...THEME.typeStyles.caption,
      color: THEME.colors.textMid,
      x: bx, y: y + chartH + 0.05, w: barW, h: labelH,
      align: "center", valign: "top", wrap: true,
    });

    // Connector dash to next bar (at running total level)
    if (showConns && i < n - 1) {
      const connY = scaleY(b.runEnd);
      const nextBx = bx + barW + sp.gutterMd;
      slide.addShape("line", {
        x: bx + barW, y: connY, w: sp.gutterMd, h: 0,
        line: { color: THEME.colors.borderMid, pt: 0.75, dashType: "dash" },
      });
    }
  });

  // Zero baseline
  const zeroY = scaleY(0);
  if (zeroY >= y && zeroY <= y + chartH) {
    slide.addShape("line", {
      x, y: zeroY, w, h: 0,
      line: { color: THEME.colors.borderMid, pt: 1 },
    });
  }

  return { nextY: y + h + sp.gutterMd };
}

// ─── Validation: Visual Diversity Check ──────────────────────────────────────
/**
 * Verifies that >= 30% of content slides use conceptual diagram templates (V1-V7).
 * Call this after building the slide manifest to catch text-heavy decks early.
 *
 * slideManifest: [{
 *   type:        'title'|'section'|'content'|'appendix'
 *   diagramType?:'V1'|'V2'|'V3'|'V4'|'V5'|'V6'|'V7'  — omit for text/table/chart slides
 * }]
 * opts: { minRatio?: 0.30 }
 * Returns: { ratio, passed, message }
 */
function validateVisualDiversity(slideManifest, opts = {}) {
  const minRatio = opts.minRatio || 0.30;
  const exclude  = ["title", "section", "appendix"];
  const content  = (slideManifest || []).filter(s => !exclude.includes(s.type));
  const visual   = content.filter(s => s.diagramType);
  const ratio    = content.length > 0 ? visual.length / content.length : 0;
  const passed   = content.length === 0 || ratio >= minRatio;

  if (!passed) {
    const needed = Math.ceil(content.length * minRatio) - visual.length;
    const msg = `VISUAL DIVERSITY: ${(ratio * 100).toFixed(0)}% < 30% target. Convert ${needed} more slides from bullets/tables to V1-V7 diagram templates.`;
    console.warn(msg);
    return { ratio, passed: false, message: msg };
  }
  const msg = `VISUAL DIVERSITY: ${(ratio * 100).toFixed(0)}% - PASS (${visual.length}/${content.length} content slides are visual)`;
  return { ratio, passed: true, message: msg };
}

module.exports = {
  addProcessFlow,
  addFunnel,
  addFlywheel,
  addHubAndSpoke,
  addLayeredStack,
  add2x2Matrix,
  addBridgeWaterfall,
  validateVisualDiversity,
};
