"use strict";

/**
 * Consultant Theme — Design Tokens
 * Grab-brand light theme: white backgrounds, Grab Green (#00B14F) primary accent, Roboto font family.
 * All design decisions trace to one of five principles:
 * P1 Pyramid Principle | P2 Data-Ink Ratio | P3 MECE | P4 Rule of Three | P5 Slidument
 *
 * Font prerequisite: Roboto family must be installed.
 * Weights used:  Roboto Light (300) | Roboto (400) | Roboto Medium (500) | Roboto Black (900)
 * Install from: https://fonts.google.com/specimen/Roboto  OR
 *               fontsource CDN latin-{weight}-normal.ttf → %LOCALAPPDATA%\Microsoft\Windows\Fonts\
 */
const THEME = {

  // ── Slide Masters ──────────────────────────────────────────────────────────
  // LIGHT = white default (80%+ of deck)
  // DARK  = warm-dark for cover + ≤2 key insight slides
  // SECTION = dark-green section dividers (Grab brand)
  // DATA  = light-gray for data-dense / table slides
  masters: {
    LIGHT:   { background: { color: "FFFFFF" } },
    DARK:    { background: { color: "1F2227" } },
    SECTION: { background: { color: "006850" } },
    DATA:    { background: { color: "F4F6F8" } },
  },

  // ── Font System ────────────────────────────────────────────────────────────
  // Roboto family: weight variation within same family = the reference aesthetic.
  // Falls back gracefully in Office if not installed (shows Calibri) — warn user.
  fonts: {
    primary:       "Roboto",         // Regular body text
    primaryLight:  "Roboto Light",   // Subtitles, secondary text, labels, source
    primaryMedium: "Roboto Medium",  // Subheadings, emphasis
    primaryBlack:  "Roboto Black",   // Large titles, section numbers, KPI values
  },

  // ── Type Styles (spread-ready PptxGenJS option objects) ───────────────────
  // Usage: slide.addText("Title", { ...THEME.typeStyles.actionTitle, x: 0.5, y: 0.55, w: 12.33 })
  typeStyles: {
    // Navigation / Meta
    tracker:          { fontFace: "Roboto Light",  fontSize: 10, color: "919191", bold: false, charSpacing: 1 },
    slideNumber:      { fontFace: "Roboto Light",  fontSize: 10, color: "919191", bold: false },

    // Titles (light bg)
    actionTitle:      { fontFace: "Roboto",        fontSize: 18, color: "1F2227", bold: true  },
    // Titles (dark bg)
    actionTitleDark:  { fontFace: "Roboto",        fontSize: 18, color: "FFFFFF", bold: true  },

    // Section Divider (on #006850 dark-green bg)
    sectionTitle:     { fontFace: "Roboto Black",  fontSize: 28, color: "FFFFFF", bold: false },
    sectionNumber:    { fontFace: "Roboto Black",  fontSize: 72, color: "FFFFFF", bold: false },
    sectionDesc:      { fontFace: "Roboto Light",  fontSize: 14, color: "D4EEE1", bold: false },

    // Cover / Title slide (on #1F2227 dark bg)
    deckTitle:        { fontFace: "Roboto Black",  fontSize: 32, color: "FFFFFF", bold: false },
    deckSubtitle:     { fontFace: "Roboto Light",  fontSize: 16, color: "D4EEE1", bold: false },

    // Content — light bg
    subhead:          { fontFace: "Roboto Medium", fontSize: 14, color: "006850", bold: false },
    body:             { fontFace: "Roboto",        fontSize: 12, color: "1F2227", bold: false },
    bodySmall:        { fontFace: "Roboto",        fontSize: 11, color: "1F2227", bold: false },
    bullet:           { fontFace: "Roboto",        fontSize: 11, color: "1F2227", bold: false },
    caption:          { fontFace: "Roboto Light",  fontSize:  9, color: "5E5E5E", bold: false },
    source:           { fontFace: "Roboto Light",  fontSize:  8, color: "919191", bold: false },

    // Content — dark bg (#1F2227)
    subheadDark:      { fontFace: "Roboto Medium", fontSize: 14, color: "D4EEE1", bold: false },
    bodyDark:         { fontFace: "Roboto",        fontSize: 12, color: "E0E0E0", bold: false },
    bulletDark:       { fontFace: "Roboto",        fontSize: 11, color: "E0E0E0", bold: false },

    // Metrics / KPIs
    metricLg:         { fontFace: "Roboto Black",  fontSize: 36, color: "00B14F", bold: false },
    metricLgDark:     { fontFace: "Roboto Black",  fontSize: 36, color: "FFFFFF", bold: false },
    metricMd:         { fontFace: "Roboto Black",  fontSize: 24, color: "00B14F", bold: false },
    metricLabel:      { fontFace: "Roboto Light",  fontSize: 10, color: "5E5E5E", bold: false },
    metricDelta:      { fontFace: "Roboto",        fontSize: 11, color: "00B14F", bold: true  }, // override color per value

    // Tables
    tableHeader:      { fontFace: "Roboto Medium", fontSize: 10, color: "FFFFFF", bold: false },
    tableBody:        { fontFace: "Roboto",        fontSize: 10, color: "1F2227", bold: false },
    tableBodyBold:    { fontFace: "Roboto Medium", fontSize: 10, color: "1F2227", bold: false },
  },

  // ── Color Palette ──────────────────────────────────────────────────────────
  // PRIMARY: Grab Green system — extracted from reference output_design_expect PPTX.
  // Rule: color carries MEANING, not decoration.
  // Grab Green = brand/positive. Amber = warning. Red = risk. Dark = text/neutral.
  colors: {
    // Grab Green primary palette
    grabGreen:      "00B14F",   // Primary brand accent, positive metrics, key callouts
    grabGreenDark:  "006850",   // Section dividers, table headers, subheadings on light
    grabGreenDeep:  "005339",   // Darkest green — strong accent bars, deep emphasis
    grabGreenMid:   "099C5D",   // Mid-tone green for secondary elements
    grabGreenLight: "36B14A",   // Lighter green variants
    grabGreenMint:  "D4EEE1",   // Light green card backgrounds, alt table rows, tints
    grabGreenWash:  "F9FEF8",   // Subtlest green tint for card fills on white slides
    grabGreenSnow:  "D9FCDE",   // Very light fill for positive indicators

    // Semantic accents — used SPARINGLY for meaning only (≤3 non-neutral per slide)
    accentAmber:    "FFA825",   // Warning, attention, "watch" (decisions-required bar)
    accentRed:      "CC0000",   // Negative indicators, decline, "concern"
    accentPurple:   "674EA7",   // Special emphasis, secondary category

    // Dark backgrounds (DARK master + key insight slides)
    darkBase:       "1F2227",   // Primary dark background (warm dark, not cold navy)
    darkMid:        "2D3147",   // Secondary dark panel fills
    darkCard:       "2C2A3E",   // Dark card backgrounds

    // Text / Neutral
    textDark:       "1F2227",   // Primary text on light bg
    textMid:        "5E5E5E",   // Secondary text, captions
    textLight:      "919191",   // Muted labels, axis text, tracker
    borderLight:    "D9D9D9",   // Borders, dividers, gridlines
    borderMid:      "B7B7B7",   // Slightly visible borders
    bgWhite:        "FFFFFF",   // Default slide background
    bgLightGray:    "F4F6F8",   // DATA master background
    bgPanel:        "EFF3F6",   // Card fill on white slides (subtle)
    white:          "FFFFFF",

    // RAG status (kept for backward-compat)
    ragGreen:  "00B14F",
    ragAmber:  "FFA825",
    ragRed:    "CC0000",

    // Chart palette — ordered for multi-series
    chartPalette: ["00B14F", "006850", "36B14A", "D4EEE1", "FFA825", "CC0000", "674EA7"],
  },

  // ── Spacing Grid (inches, for 16:9 LAYOUT_WIDE = 13.33" × 7.5") ──────────
  spacing: {
    slideW:      13.33,
    slideH:       7.5,
    marginH:      0.5,    // left/right margins
    marginTop:    0.3,    // above tracker

    // Vertical zones
    trackerY:     0.3,
    trackerH:     0.2,
    titleY:       0.55,
    titleH:       0.65,   // enough for 2-3 lines
    dividerY:     1.25,
    contentY:     1.4,
    contentH:     5.45,   // 1.4 → 6.85
    footerY:      7.1,
    footerH:      0.2,

    // Content area
    contentW:    12.33,   // 13.33 - 2 × 0.5

    // Gutters
    gutterSm:     0.15,
    gutterMd:     0.25,
    gutterLg:     0.4,
    cardPad:      0.15,
  },

  // ── Pre-computed Grid Layouts (all x/w values, y/h from contentY/contentH) ─
  grids: {
    FULL:     [{ x: 0.5, w: 12.33 }],
    HALF:     [{ x: 0.5, w: 6.02 }, { x: 6.82, w: 6.01 }],
    THIRD:    [{ x: 0.5, w: 3.88 }, { x: 4.63, w: 3.88 }, { x: 8.75, w: 3.88 }],
    TWO_THIRD:[{ x: 0.5, w: 7.95 }, { x: 8.7,  w: 4.13 }],
    QUADRANT: [
      [{ x: 0.5, w: 6.02 }, { x: 6.82, w: 6.01 }],
      [{ x: 0.5, w: 6.02 }, { x: 6.82, w: 6.01 }],
    ],
  },

  // ── Shape Styles ──────────────────────────────────────────────────────────
  // Slight corner radius (0.08") matching reference — professional but warmer.
  // NO drop shadows — Tufte: shadows are noise.
  shapes: {
    card: {
      fill:        { color: "FFFFFF" },
      line:        { color: "D9D9D9", pt: 0.5 },
      rectRadius:  0.08,
    },
    cardMint: {
      fill:        { color: "D4EEE1" },
      line:        { color: "D4EEE1", pt: 0 },
      rectRadius:  0.08,
    },
    cardWash: {
      fill:        { color: "F9FEF8" },
      line:        { color: "D4EEE1", pt: 0.5 },
      rectRadius:  0.08,
    },
    cardDark: {
      fill:        { color: "2C2A3E" },
      line:        { color: "2D3147", pt: 0.5 },
      rectRadius:  0.08,
    },
    accentBarGreen: {
      fill:        { color: "00B14F" },
      line:        { color: "00B14F", pt: 0 },
    },
    accentBarDarkGreen: {
      fill:        { color: "006850" },
      line:        { color: "006850", pt: 0 },
    },
    accentBarAmber: {
      fill:        { color: "FFA825" },
      line:        { color: "FFA825", pt: 0 },
    },
    accentBarRed: {
      fill:        { color: "CC0000" },
      line:        { color: "CC0000", pt: 0 },
    },
    dividerLine: {
      line:        { color: "D9D9D9", pt: 0.75 },
    },
    dividerLineDark: {
      line:        { color: "2D3147", pt: 0.75 },
    },
    // Backward-compat aliases
    ragGreen: { fill: { color: "00B14F" }, line: { color: "00B14F", pt: 0 } },
    ragAmber: { fill: { color: "FFA825" }, line: { color: "FFA825", pt: 0 } },
    ragRed:   { fill: { color: "CC0000" }, line: { color: "CC0000", pt: 0 } },
  },

  // ── Chart Defaults ────────────────────────────────────────────────────────
  chart: {
    fontFace:          "Roboto",
    fontSize:           10,
    titleFontFace:     "Roboto Medium",
    titleFontSize:      12,
    titleColor:        "1F2227",
    gridLineColor:     "E4E6E8",
    axisColor:         "919191",
    dataLabelFontSize:  9,
    dataLabelColor:    "1F2227",
    legendFontSize:     9,
    legendColor:       "5E5E5E",
    barChart: {
      barGapWidthPct: 50,
      barGrouping: "clustered",
    },
    lineChart: {
      lineDataSymbol: "none",
      lineSmooth: false,
    },
  },
};

module.exports = { THEME };
