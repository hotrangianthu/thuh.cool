/**
 * diagram_templates_extended.js
 * V8-V15 Visual Metaphor Templates for $consultant-slides
 *
 * Extends diagram_templates.js with advanced visual metaphor patterns
 * for C-suite storytelling impact.
 *
 * Templates:
 *   V8:  addBalanceScale    - Trade-offs, counter-weights, equilibrium
 *   V9:  addGearSystem      - Synergies, dependencies, machine metaphor
 *   V10: addIceberg         - Surface vs. root cause, hidden complexity
 *   V11: addBridgeGap       - Current to future state transitions
 *   V12: addLadder          - Progression, maturity model, skill levels
 *   V13: addPuzzle          - Fit, completeness, missing elements
 *   V14: addVenn            - Intersection, unique + shared attributes
 *   V15: addRadialTimeline  - Cyclical time, quarterly rhythm
 */

const { C, sp } = require('./index');

// ============================================================================
// V8: Balance Scale - Trade-offs, counter-weights, equilibrium
// ============================================================================

/**
 * Renders a balance scale metaphor showing trade-offs or equilibrium
 * @param {Object} slide - PptxGenJS slide object
 * @param {Object} left - { label, weight, items: [], color }
 * @param {Object} right - { label, weight, items: [], color }
 * @param {Object} fulcrum - { label, value } - center point/metric
 * @param {Object} opts - { x, y, w, h, tilt: 'left'|'right'|'balanced' }
 */
function addBalanceScale(slide, left, right, fulcrum, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.5;
  const w = opts.w || sp.contentW;
  const h = opts.h || 3.5;

  const centerX = x + w / 2;
  const baseY = y + h - 0.4;
  const beamY = y + 1.2;

  // Calculate tilt based on weights or explicit setting
  let tilt = opts.tilt || 'balanced';
  if (!opts.tilt && left.weight !== right.weight) {
    tilt = left.weight > right.weight ? 'left' : 'right';
  }
  const tiltAngle = tilt === 'balanced' ? 0 : (tilt === 'left' ? 8 : -8);

  // Fulcrum triangle (base)
  slide.addShape('triangle', {
    x: centerX - 0.4,
    y: baseY - 0.6,
    w: 0.8,
    h: 0.6,
    fill: { color: C.grabGreenDark },
    line: { color: C.grabGreenDark, pt: 0 },
  });

  // Fulcrum label
  if (fulcrum.label) {
    slide.addText(fulcrum.value || fulcrum.label, {
      x: centerX - 1,
      y: baseY + 0.05,
      w: 2,
      h: 0.3,
      fontFace: 'Roboto Black',
      fontSize: 14,
      color: C.grabGreen,
      align: 'center',
    });
    if (fulcrum.value && fulcrum.label) {
      slide.addText(fulcrum.label, {
        x: centerX - 1.5,
        y: baseY + 0.35,
        w: 3,
        h: 0.25,
        fontFace: 'Roboto',
        fontSize: 9,
        color: C.textMid,
        align: 'center',
      });
    }
  }

  // Beam (tilted line)
  const beamW = w * 0.85;
  slide.addShape('rectangle', {
    x: centerX - beamW / 2,
    y: beamY,
    w: beamW,
    h: 0.08,
    fill: { color: C.textDark },
    rotate: tiltAngle,
  });

  // Left pan
  const leftPanX = x + 0.3;
  const leftPanY = beamY + (tilt === 'left' ? 0.3 : tilt === 'right' ? -0.3 : 0);
  const panW = w * 0.35;
  const panH = 1.8;

  slide.addShape('roundedRectangle', {
    x: leftPanX,
    y: leftPanY + 0.15,
    w: panW,
    h: panH,
    fill: { color: left.color || C.grabGreenMint },
    line: { color: left.color || C.grabGreen, pt: 1.5 },
    rectRadius: 0.06,
  });

  // Left label
  slide.addText(left.label, {
    x: leftPanX,
    y: leftPanY + 0.2,
    w: panW,
    h: 0.35,
    fontFace: 'Roboto Medium',
    fontSize: 11,
    color: C.textDark,
    align: 'center',
    valign: 'middle',
  });

  // Left items
  if (left.items && left.items.length > 0) {
    const itemsText = left.items.map(item => `- ${item}`).join('\n');
    slide.addText(itemsText, {
      x: leftPanX + 0.1,
      y: leftPanY + 0.55,
      w: panW - 0.2,
      h: panH - 0.5,
      fontFace: 'Roboto',
      fontSize: 9,
      color: C.textDark,
      valign: 'top',
      wrap: true,
    });
  }

  // Left weight indicator
  if (left.weight) {
    slide.addShape('oval', {
      x: leftPanX + panW / 2 - 0.25,
      y: leftPanY + panH - 0.15,
      w: 0.5,
      h: 0.5,
      fill: { color: left.color || C.grabGreen },
      line: { pt: 0 },
    });
    slide.addText(String(left.weight), {
      x: leftPanX + panW / 2 - 0.25,
      y: leftPanY + panH - 0.1,
      w: 0.5,
      h: 0.4,
      fontFace: 'Roboto Black',
      fontSize: 10,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
  }

  // Right pan
  const rightPanX = x + w - panW - 0.3;
  const rightPanY = beamY + (tilt === 'right' ? 0.3 : tilt === 'left' ? -0.3 : 0);

  slide.addShape('roundedRectangle', {
    x: rightPanX,
    y: rightPanY + 0.15,
    w: panW,
    h: panH,
    fill: { color: right.color || C.accentAmberLight },
    line: { color: right.color || C.accentAmber, pt: 1.5 },
    rectRadius: 0.06,
  });

  // Right label
  slide.addText(right.label, {
    x: rightPanX,
    y: rightPanY + 0.2,
    w: panW,
    h: 0.35,
    fontFace: 'Roboto Medium',
    fontSize: 11,
    color: C.textDark,
    align: 'center',
    valign: 'middle',
  });

  // Right items
  if (right.items && right.items.length > 0) {
    const itemsText = right.items.map(item => `- ${item}`).join('\n');
    slide.addText(itemsText, {
      x: rightPanX + 0.1,
      y: rightPanY + 0.55,
      w: panW - 0.2,
      h: panH - 0.5,
      fontFace: 'Roboto',
      fontSize: 9,
      color: C.textDark,
      valign: 'top',
      wrap: true,
    });
  }

  // Right weight indicator
  if (right.weight) {
    slide.addShape('oval', {
      x: rightPanX + panW / 2 - 0.25,
      y: rightPanY + panH - 0.15,
      w: 0.5,
      h: 0.5,
      fill: { color: right.color || C.accentAmber },
      line: { pt: 0 },
    });
    slide.addText(String(right.weight), {
      x: rightPanX + panW / 2 - 0.25,
      y: rightPanY + panH - 0.1,
      w: 0.5,
      h: 0.4,
      fontFace: 'Roboto Black',
      fontSize: 10,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
  }

  // Connecting lines to beam
  slide.addShape('line', {
    x: leftPanX + panW / 2,
    y: beamY + 0.04,
    w: 0,
    h: leftPanY + 0.1 - beamY,
    line: { color: C.textMid, pt: 1.5 },
  });

  slide.addShape('line', {
    x: rightPanX + panW / 2,
    y: beamY + 0.04,
    w: 0,
    h: rightPanY + 0.1 - beamY,
    line: { color: C.textMid, pt: 1.5 },
  });
}

// ============================================================================
// V9: Gear System - Synergies, dependencies, machine metaphor
// ============================================================================

/**
 * Renders interlocking gears showing synergies or dependencies
 * @param {Object} slide - PptxGenJS slide object
 * @param {Array} gears - [{ label, size: 'large'|'medium'|'small', color, items: [] }]
 * @param {Object} opts - { x, y, w, h, layout: 'horizontal'|'diagonal' }
 */
function addGearSystem(slide, gears, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.5;
  const w = opts.w || sp.contentW;
  const h = opts.h || 3.5;

  const sizeMap = { large: 1.6, medium: 1.2, small: 0.9 };
  const colorDefaults = [C.grabGreen, C.grabGreenDark, C.accentAmber, C.textMid];

  // Calculate gear positions based on layout
  const layout = opts.layout || 'horizontal';
  const gearCount = gears.length;

  gears.forEach((gear, i) => {
    const gearSize = sizeMap[gear.size || 'medium'];
    const gearColor = gear.color || colorDefaults[i % colorDefaults.length];

    let gx, gy;
    if (layout === 'horizontal') {
      const spacing = w / (gearCount + 1);
      gx = x + spacing * (i + 1) - gearSize / 2;
      gy = y + h / 2 - gearSize / 2 + (i % 2 === 1 ? 0.3 : -0.3);
    } else {
      // Diagonal layout
      gx = x + (w / gearCount) * i + 0.5;
      gy = y + (h / gearCount) * i + 0.3;
    }

    // Draw gear (approximated with circle + teeth indicators)
    // Main gear body
    slide.addShape('oval', {
      x: gx,
      y: gy,
      w: gearSize,
      h: gearSize,
      fill: { color: gearColor, transparency: 15 },
      line: { color: gearColor, pt: 3 },
    });

    // Inner circle
    const innerSize = gearSize * 0.5;
    slide.addShape('oval', {
      x: gx + (gearSize - innerSize) / 2,
      y: gy + (gearSize - innerSize) / 2,
      w: innerSize,
      h: innerSize,
      fill: { color: 'FFFFFF' },
      line: { color: gearColor, pt: 2 },
    });

    // Gear teeth (8 small rectangles around the edge)
    const toothCount = 8;
    const toothW = 0.15;
    const toothH = 0.2;
    const radius = gearSize / 2;
    const centerGx = gx + gearSize / 2;
    const centerGy = gy + gearSize / 2;

    for (let t = 0; t < toothCount; t++) {
      const angle = (t / toothCount) * Math.PI * 2;
      const toothX = centerGx + Math.cos(angle) * (radius - 0.05) - toothW / 2;
      const toothY = centerGy + Math.sin(angle) * (radius - 0.05) - toothH / 2;
      slide.addShape('rectangle', {
        x: toothX,
        y: toothY,
        w: toothW,
        h: toothH,
        fill: { color: gearColor },
        rotate: (angle * 180 / Math.PI) + 90,
      });
    }

    // Gear label
    slide.addText(gear.label, {
      x: gx,
      y: gy + gearSize + 0.1,
      w: gearSize,
      h: 0.3,
      fontFace: 'Roboto Medium',
      fontSize: 10,
      color: C.textDark,
      align: 'center',
    });

    // Items below label
    if (gear.items && gear.items.length > 0) {
      const itemsText = gear.items.slice(0, 3).join('\n');
      slide.addText(itemsText, {
        x: gx - 0.3,
        y: gy + gearSize + 0.4,
        w: gearSize + 0.6,
        h: 0.8,
        fontFace: 'Roboto',
        fontSize: 8,
        color: C.textMid,
        align: 'center',
        valign: 'top',
      });
    }
  });

  // Synergy label in center
  if (opts.synergyLabel) {
    const labelX = x + w / 2 - 1;
    const labelY = y + 0.2;
    slide.addShape('roundedRectangle', {
      x: labelX,
      y: labelY,
      w: 2,
      h: 0.4,
      fill: { color: C.grabGreenMint },
      line: { color: C.grabGreen, pt: 1 },
      rectRadius: 0.05,
    });
    slide.addText(opts.synergyLabel, {
      x: labelX,
      y: labelY,
      w: 2,
      h: 0.4,
      fontFace: 'Roboto Medium',
      fontSize: 10,
      color: C.grabGreenDark,
      align: 'center',
      valign: 'middle',
    });
  }
}

// ============================================================================
// V10: Iceberg - Surface vs. root cause, hidden complexity
// ============================================================================

/**
 * Renders an iceberg metaphor showing visible vs. hidden elements
 * @param {Object} slide - PptxGenJS slide object
 * @param {Object} above - { label, items: [], percent }
 * @param {Object} below - { label, items: [], percent }
 * @param {Object} opts - { x, y, w, h }
 */
function addIceberg(slide, above, below, opts = {}) {
  const x = opts.x || sp.marginH + 1;
  const y = opts.y || 1.3;
  const w = opts.w || 5;
  const h = opts.h || 4;

  const waterlineY = y + h * 0.3;
  const icebergCenterX = x + w * 0.4;

  // Water background (below waterline)
  slide.addShape('rectangle', {
    x: x,
    y: waterlineY,
    w: w,
    h: h * 0.7,
    fill: { color: '4A90D9', transparency: 70 },
    line: { pt: 0 },
  });

  // Waterline
  slide.addShape('rectangle', {
    x: x,
    y: waterlineY - 0.02,
    w: w,
    h: 0.04,
    fill: { color: '2E6EB3' },
    line: { pt: 0 },
  });

  // Above water (visible tip) - triangle
  const tipW = w * 0.25;
  const tipH = h * 0.25;
  slide.addShape('triangle', {
    x: icebergCenterX - tipW / 2,
    y: y + 0.2,
    w: tipW,
    h: tipH,
    fill: { color: C.grabGreenLight },
    line: { color: C.grabGreen, pt: 2 },
  });

  // Below water (hidden mass) - larger trapezoid approximated with rectangle
  const baseW = w * 0.6;
  const baseH = h * 0.55;
  slide.addShape('trapezoid', {
    x: icebergCenterX - baseW / 2,
    y: waterlineY + 0.1,
    w: baseW,
    h: baseH,
    fill: { color: C.grabGreenMint, transparency: 30 },
    line: { color: C.grabGreen, pt: 2, dashType: 'dash' },
  });

  // Above label and percentage
  const abovePercent = above.percent || '10%';
  slide.addText(`${abovePercent} VISIBLE`, {
    x: icebergCenterX + tipW / 2 + 0.2,
    y: y + 0.3,
    w: 1.5,
    h: 0.3,
    fontFace: 'Roboto Black',
    fontSize: 11,
    color: C.grabGreen,
  });

  slide.addText(above.label || 'What you see', {
    x: icebergCenterX + tipW / 2 + 0.2,
    y: y + 0.55,
    w: 2,
    h: 0.25,
    fontFace: 'Roboto Medium',
    fontSize: 9,
    color: C.textDark,
  });

  if (above.items && above.items.length > 0) {
    const aboveText = above.items.map(item => `- ${item}`).join('\n');
    slide.addText(aboveText, {
      x: icebergCenterX + tipW / 2 + 0.2,
      y: y + 0.8,
      w: 2.5,
      h: 0.8,
      fontFace: 'Roboto',
      fontSize: 8,
      color: C.textMid,
      wrap: true,
    });
  }

  // Below label and percentage
  const belowPercent = below.percent || '90%';
  slide.addText(`${belowPercent} HIDDEN`, {
    x: icebergCenterX + baseW / 2 + 0.2,
    y: waterlineY + 0.3,
    w: 1.5,
    h: 0.3,
    fontFace: 'Roboto Black',
    fontSize: 11,
    color: '2E6EB3',
  });

  slide.addText(below.label || 'Root causes', {
    x: icebergCenterX + baseW / 2 + 0.2,
    y: waterlineY + 0.55,
    w: 2,
    h: 0.25,
    fontFace: 'Roboto Medium',
    fontSize: 9,
    color: C.textDark,
  });

  if (below.items && below.items.length > 0) {
    const belowText = below.items.map(item => `- ${item}`).join('\n');
    slide.addText(belowText, {
      x: icebergCenterX + baseW / 2 + 0.2,
      y: waterlineY + 0.8,
      w: 2.5,
      h: 1.8,
      fontFace: 'Roboto',
      fontSize: 8,
      color: C.textMid,
      wrap: true,
    });
  }
}

// ============================================================================
// V11: Bridge/Gap - Current to future state transitions
// ============================================================================

/**
 * Renders a bridge metaphor showing transition from current to future state
 * @param {Object} slide - PptxGenJS slide object
 * @param {Object} from - { label, items: [], color }
 * @param {Object} to - { label, items: [], color }
 * @param {Object} bridge - { label, items: [] } - what enables the crossing
 * @param {Object} opts - { x, y, w, h }
 */
function addBridgeGap(slide, from, to, bridge, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.5;
  const w = opts.w || sp.contentW;
  const h = opts.h || 3.5;

  const platformW = w * 0.3;
  const platformH = h * 0.5;
  const gapW = w * 0.35;
  const bridgeY = y + h * 0.35;

  // Left platform (FROM state)
  slide.addShape('roundedRectangle', {
    x: x,
    y: bridgeY,
    w: platformW,
    h: platformH,
    fill: { color: from.color || C.accentAmberLight },
    line: { color: from.color || C.accentAmber, pt: 2 },
    rectRadius: 0.08,
  });

  slide.addText('CURRENT STATE', {
    x: x,
    y: bridgeY + 0.1,
    w: platformW,
    h: 0.25,
    fontFace: 'Roboto',
    fontSize: 8,
    color: C.textMid,
    align: 'center',
  });

  slide.addText(from.label, {
    x: x + 0.1,
    y: bridgeY + 0.35,
    w: platformW - 0.2,
    h: 0.35,
    fontFace: 'Roboto Medium',
    fontSize: 11,
    color: C.textDark,
    align: 'center',
  });

  if (from.items && from.items.length > 0) {
    const fromText = from.items.map(item => `- ${item}`).join('\n');
    slide.addText(fromText, {
      x: x + 0.1,
      y: bridgeY + 0.75,
      w: platformW - 0.2,
      h: platformH - 0.85,
      fontFace: 'Roboto',
      fontSize: 8,
      color: C.textMid,
      wrap: true,
    });
  }

  // Right platform (TO state)
  const rightX = x + w - platformW;
  slide.addShape('roundedRectangle', {
    x: rightX,
    y: bridgeY,
    w: platformW,
    h: platformH,
    fill: { color: to.color || C.grabGreenMint },
    line: { color: to.color || C.grabGreen, pt: 2 },
    rectRadius: 0.08,
  });

  slide.addText('FUTURE STATE', {
    x: rightX,
    y: bridgeY + 0.1,
    w: platformW,
    h: 0.25,
    fontFace: 'Roboto',
    fontSize: 8,
    color: C.textMid,
    align: 'center',
  });

  slide.addText(to.label, {
    x: rightX + 0.1,
    y: bridgeY + 0.35,
    w: platformW - 0.2,
    h: 0.35,
    fontFace: 'Roboto Medium',
    fontSize: 11,
    color: C.textDark,
    align: 'center',
  });

  if (to.items && to.items.length > 0) {
    const toText = to.items.map(item => `- ${item}`).join('\n');
    slide.addText(toText, {
      x: rightX + 0.1,
      y: bridgeY + 0.75,
      w: platformW - 0.2,
      h: platformH - 0.85,
      fontFace: 'Roboto',
      fontSize: 8,
      color: C.textMid,
      wrap: true,
    });
  }

  // Bridge across the gap
  const bridgeX = x + platformW;
  const bridgeW = gapW + 0.1;

  // Bridge deck
  slide.addShape('rectangle', {
    x: bridgeX - 0.05,
    y: bridgeY + 0.05,
    w: bridgeW,
    h: 0.12,
    fill: { color: C.grabGreen },
    line: { pt: 0 },
  });

  // Bridge supports (arches)
  slide.addShape('arc', {
    x: bridgeX + bridgeW * 0.25 - 0.4,
    y: bridgeY + 0.15,
    w: 0.8,
    h: 0.6,
    fill: { type: 'none' },
    line: { color: C.grabGreenDark, pt: 2 },
    shapeName: 'arc',
  });

  slide.addShape('arc', {
    x: bridgeX + bridgeW * 0.75 - 0.4,
    y: bridgeY + 0.15,
    w: 0.8,
    h: 0.6,
    fill: { type: 'none' },
    line: { color: C.grabGreenDark, pt: 2 },
    shapeName: 'arc',
  });

  // Bridge label box
  slide.addShape('roundedRectangle', {
    x: bridgeX + bridgeW / 2 - 1.2,
    y: y + 0.3,
    w: 2.4,
    h: 0.9,
    fill: { color: C.grabGreenMint },
    line: { color: C.grabGreen, pt: 1.5 },
    rectRadius: 0.06,
  });

  slide.addText('THE BRIDGE', {
    x: bridgeX + bridgeW / 2 - 1.2,
    y: y + 0.35,
    w: 2.4,
    h: 0.25,
    fontFace: 'Roboto',
    fontSize: 8,
    color: C.grabGreenDark,
    align: 'center',
  });

  slide.addText(bridge.label, {
    x: bridgeX + bridgeW / 2 - 1.2,
    y: y + 0.55,
    w: 2.4,
    h: 0.3,
    fontFace: 'Roboto Medium',
    fontSize: 10,
    color: C.textDark,
    align: 'center',
  });

  // Bridge enablers below
  if (bridge.items && bridge.items.length > 0) {
    const bridgeItemsY = bridgeY + platformH + 0.3;
    bridge.items.forEach((item, i) => {
      const itemX = bridgeX + (bridgeW / bridge.items.length) * i + 0.1;
      const itemW = bridgeW / bridge.items.length - 0.2;

      slide.addShape('roundedRectangle', {
        x: itemX,
        y: bridgeItemsY,
        w: itemW,
        h: 0.6,
        fill: { color: 'FFFFFF' },
        line: { color: C.grabGreen, pt: 1 },
        rectRadius: 0.04,
      });

      slide.addText(item, {
        x: itemX,
        y: bridgeItemsY + 0.1,
        w: itemW,
        h: 0.4,
        fontFace: 'Roboto',
        fontSize: 8,
        color: C.textDark,
        align: 'center',
        valign: 'middle',
        wrap: true,
      });
    });
  }

  // Arrow indicating direction
  slide.addText('>>>', {
    x: bridgeX + bridgeW / 2 - 0.3,
    y: bridgeY - 0.25,
    w: 0.6,
    h: 0.25,
    fontFace: 'Roboto Black',
    fontSize: 14,
    color: C.grabGreen,
    align: 'center',
  });
}

// ============================================================================
// V12: Ladder/Steps - Progression, maturity model, skill levels
// ============================================================================

/**
 * Renders a ladder/steps metaphor showing progression levels
 * @param {Object} slide - PptxGenJS slide object
 * @param {Array} rungs - [{ label, description, metrics, color }]
 * @param {Object} opts - { x, y, w, h, direction: 'up'|'right', currentLevel }
 */
function addLadder(slide, rungs, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.3;
  const w = opts.w || sp.contentW;
  const h = opts.h || 4;
  const direction = opts.direction || 'up';
  const currentLevel = opts.currentLevel ?? -1;

  const rungCount = rungs.length;

  if (direction === 'up') {
    // Vertical ladder (bottom to top)
    const rungH = (h - 0.5) / rungCount;
    const ladderX = x + 0.8;
    const ladderW = w * 0.15;
    const contentX = ladderX + ladderW + 0.3;
    const contentW = w - ladderW - 1.4;

    // Draw ladder rails
    slide.addShape('rectangle', {
      x: ladderX,
      y: y,
      w: 0.08,
      h: h,
      fill: { color: C.textMid },
    });
    slide.addShape('rectangle', {
      x: ladderX + ladderW,
      y: y,
      w: 0.08,
      h: h,
      fill: { color: C.textMid },
    });

    rungs.forEach((rung, i) => {
      const rungY = y + h - (i + 1) * rungH;
      const isCurrentLevel = i === currentLevel;
      const isPastLevel = i < currentLevel;
      const rungColor = rung.color || (isCurrentLevel ? C.grabGreen : isPastLevel ? C.grabGreenLight : C.bgLightGray);

      // Rung (horizontal bar)
      slide.addShape('roundedRectangle', {
        x: ladderX - 0.1,
        y: rungY + rungH / 2 - 0.12,
        w: ladderW + 0.28,
        h: 0.24,
        fill: { color: rungColor },
        line: { color: isCurrentLevel ? C.grabGreenDark : C.borderLight, pt: isCurrentLevel ? 2 : 1 },
        rectRadius: 0.04,
      });

      // Level number
      slide.addText(String(i + 1), {
        x: x,
        y: rungY + rungH / 2 - 0.2,
        w: 0.6,
        h: 0.4,
        fontFace: 'Roboto Black',
        fontSize: 16,
        color: isCurrentLevel ? C.grabGreen : C.textMid,
        align: 'center',
        valign: 'middle',
      });

      // Content card
      slide.addShape('roundedRectangle', {
        x: contentX,
        y: rungY + 0.05,
        w: contentW,
        h: rungH - 0.1,
        fill: { color: isCurrentLevel ? C.grabGreenMint : 'FFFFFF' },
        line: { color: isCurrentLevel ? C.grabGreen : C.borderLight, pt: isCurrentLevel ? 2 : 1 },
        rectRadius: 0.06,
      });

      // Label
      slide.addText(rung.label, {
        x: contentX + 0.15,
        y: rungY + 0.1,
        w: contentW - 0.3,
        h: 0.3,
        fontFace: 'Roboto Medium',
        fontSize: 10,
        color: C.textDark,
      });

      // Description
      if (rung.description) {
        slide.addText(rung.description, {
          x: contentX + 0.15,
          y: rungY + 0.4,
          w: contentW - 0.3,
          h: rungH - 0.55,
          fontFace: 'Roboto',
          fontSize: 8,
          color: C.textMid,
          wrap: true,
        });
      }

      // Metrics badge
      if (rung.metrics) {
        slide.addText(rung.metrics, {
          x: contentX + contentW - 1.2,
          y: rungY + 0.1,
          w: 1,
          h: 0.25,
          fontFace: 'Roboto Medium',
          fontSize: 9,
          color: isCurrentLevel ? C.grabGreen : C.textMid,
          align: 'right',
        });
      }

      // Current level indicator
      if (isCurrentLevel) {
        slide.addText('YOU ARE HERE', {
          x: x - 0.3,
          y: rungY + rungH / 2 + 0.15,
          w: 1.2,
          h: 0.2,
          fontFace: 'Roboto',
          fontSize: 7,
          color: C.grabGreen,
          align: 'center',
        });
      }
    });

  } else {
    // Horizontal progression (left to right)
    const stepW = (w - 0.5) / rungCount;
    const stepH = h * 0.5;
    const stepY = y + h * 0.25;

    rungs.forEach((rung, i) => {
      const stepX = x + i * stepW + 0.1;
      const isCurrentLevel = i === currentLevel;
      const isPastLevel = i < currentLevel;
      const stepColor = rung.color || (isCurrentLevel ? C.grabGreen : isPastLevel ? C.grabGreenLight : C.bgLightGray);

      // Step block
      slide.addShape('roundedRectangle', {
        x: stepX,
        y: stepY,
        w: stepW - 0.2,
        h: stepH,
        fill: { color: isCurrentLevel ? C.grabGreenMint : 'FFFFFF' },
        line: { color: stepColor, pt: isCurrentLevel ? 2 : 1 },
        rectRadius: 0.06,
      });

      // Step number
      slide.addShape('oval', {
        x: stepX + (stepW - 0.2) / 2 - 0.2,
        y: stepY - 0.25,
        w: 0.4,
        h: 0.4,
        fill: { color: stepColor },
        line: { pt: 0 },
      });
      slide.addText(String(i + 1), {
        x: stepX + (stepW - 0.2) / 2 - 0.2,
        y: stepY - 0.22,
        w: 0.4,
        h: 0.34,
        fontFace: 'Roboto Black',
        fontSize: 11,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle',
      });

      // Label
      slide.addText(rung.label, {
        x: stepX + 0.1,
        y: stepY + 0.25,
        w: stepW - 0.4,
        h: 0.35,
        fontFace: 'Roboto Medium',
        fontSize: 9,
        color: C.textDark,
        align: 'center',
      });

      // Description
      if (rung.description) {
        slide.addText(rung.description, {
          x: stepX + 0.1,
          y: stepY + 0.6,
          w: stepW - 0.4,
          h: stepH - 0.7,
          fontFace: 'Roboto',
          fontSize: 8,
          color: C.textMid,
          align: 'center',
          wrap: true,
        });
      }

      // Arrow to next step
      if (i < rungCount - 1) {
        slide.addText('>', {
          x: stepX + stepW - 0.3,
          y: stepY + stepH / 2 - 0.15,
          w: 0.3,
          h: 0.3,
          fontFace: 'Roboto Black',
          fontSize: 14,
          color: C.grabGreen,
          align: 'center',
        });
      }
    });
  }
}

// ============================================================================
// V13: Puzzle Pieces - Fit, completeness, missing elements
// ============================================================================

/**
 * Renders puzzle pieces showing fit or completeness
 * @param {Object} slide - PptxGenJS slide object
 * @param {Array} pieces - [{ label, status: 'complete'|'missing'|'partial', items: [], color }]
 * @param {Object} opts - { x, y, w, h, layout: '2x2'|'row' }
 */
function addPuzzle(slide, pieces, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.5;
  const w = opts.w || sp.contentW;
  const h = opts.h || 3.5;
  const layout = opts.layout || '2x2';

  const statusColors = {
    complete: C.grabGreen,
    partial: C.accentAmber,
    missing: C.accentRed,
  };

  const statusFills = {
    complete: C.grabGreenMint,
    partial: C.accentAmberLight,
    missing: 'F5F5F5',
  };

  if (layout === '2x2' && pieces.length === 4) {
    // 2x2 grid layout
    const pieceW = (w - 0.3) / 2;
    const pieceH = (h - 0.3) / 2;

    pieces.forEach((piece, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const px = x + col * (pieceW + 0.15);
      const py = y + row * (pieceH + 0.15);
      const status = piece.status || 'complete';
      const pieceColor = piece.color || statusColors[status];
      const pieceFill = statusFills[status];

      // Puzzle piece shape (rounded rectangle with notch indicators)
      slide.addShape('roundedRectangle', {
        x: px,
        y: py,
        w: pieceW,
        h: pieceH,
        fill: { color: pieceFill },
        line: { color: pieceColor, pt: 2, dashType: status === 'missing' ? 'dash' : 'solid' },
        rectRadius: 0.08,
      });

      // Interlocking notch (visual indicator on edge)
      if (col === 0) {
        slide.addShape('oval', {
          x: px + pieceW - 0.1,
          y: py + pieceH / 2 - 0.15,
          w: 0.2,
          h: 0.3,
          fill: { color: pieceFill },
          line: { color: pieceColor, pt: 1 },
        });
      }
      if (row === 0) {
        slide.addShape('oval', {
          x: px + pieceW / 2 - 0.15,
          y: py + pieceH - 0.1,
          w: 0.3,
          h: 0.2,
          fill: { color: pieceFill },
          line: { color: pieceColor, pt: 1 },
        });
      }

      // Status indicator
      const statusLabel = status === 'complete' ? 'COMPLETE' : status === 'partial' ? 'IN PROGRESS' : 'MISSING';
      slide.addText(statusLabel, {
        x: px + 0.15,
        y: py + 0.1,
        w: pieceW - 0.3,
        h: 0.2,
        fontFace: 'Roboto',
        fontSize: 7,
        color: pieceColor,
      });

      // Label
      slide.addText(piece.label, {
        x: px + 0.15,
        y: py + 0.3,
        w: pieceW - 0.3,
        h: 0.35,
        fontFace: 'Roboto Medium',
        fontSize: 11,
        color: C.textDark,
      });

      // Items
      if (piece.items && piece.items.length > 0) {
        const itemsText = piece.items.map(item => `- ${item}`).join('\n');
        slide.addText(itemsText, {
          x: px + 0.15,
          y: py + 0.7,
          w: pieceW - 0.3,
          h: pieceH - 0.85,
          fontFace: 'Roboto',
          fontSize: 8,
          color: status === 'missing' ? C.textMid : C.textDark,
          wrap: true,
        });
      }
    });

  } else {
    // Row layout
    const pieceW = (w - (pieces.length - 1) * 0.15) / pieces.length;
    const pieceH = h * 0.8;
    const py = y + 0.2;

    pieces.forEach((piece, i) => {
      const px = x + i * (pieceW + 0.15);
      const status = piece.status || 'complete';
      const pieceColor = piece.color || statusColors[status];
      const pieceFill = statusFills[status];

      slide.addShape('roundedRectangle', {
        x: px,
        y: py,
        w: pieceW,
        h: pieceH,
        fill: { color: pieceFill },
        line: { color: pieceColor, pt: 2, dashType: status === 'missing' ? 'dash' : 'solid' },
        rectRadius: 0.08,
      });

      // Interlocking notch
      if (i < pieces.length - 1) {
        slide.addShape('oval', {
          x: px + pieceW - 0.1,
          y: py + pieceH / 2 - 0.2,
          w: 0.2,
          h: 0.4,
          fill: { color: pieceFill },
          line: { color: pieceColor, pt: 1 },
        });
      }

      // Status
      const statusLabel = status === 'complete' ? 'COMPLETE' : status === 'partial' ? 'IN PROGRESS' : 'MISSING';
      slide.addText(statusLabel, {
        x: px + 0.1,
        y: py + 0.1,
        w: pieceW - 0.2,
        h: 0.2,
        fontFace: 'Roboto',
        fontSize: 7,
        color: pieceColor,
        align: 'center',
      });

      // Label
      slide.addText(piece.label, {
        x: px + 0.1,
        y: py + 0.35,
        w: pieceW - 0.2,
        h: 0.35,
        fontFace: 'Roboto Medium',
        fontSize: 10,
        color: C.textDark,
        align: 'center',
      });

      // Items
      if (piece.items && piece.items.length > 0) {
        const itemsText = piece.items.map(item => `- ${item}`).join('\n');
        slide.addText(itemsText, {
          x: px + 0.1,
          y: py + 0.75,
          w: pieceW - 0.2,
          h: pieceH - 0.9,
          fontFace: 'Roboto',
          fontSize: 8,
          color: status === 'missing' ? C.textMid : C.textDark,
          wrap: true,
        });
      }
    });
  }

  // Completeness summary
  const completeCount = pieces.filter(p => p.status === 'complete').length;
  const totalCount = pieces.length;
  slide.addText(`${completeCount}/${totalCount} COMPLETE`, {
    x: x + w - 1.5,
    y: y - 0.3,
    w: 1.5,
    h: 0.25,
    fontFace: 'Roboto Medium',
    fontSize: 9,
    color: completeCount === totalCount ? C.grabGreen : C.accentAmber,
    align: 'right',
  });
}

// ============================================================================
// V14: Venn Diagram - Intersection, unique + shared attributes
// ============================================================================

/**
 * Renders a Venn diagram showing intersection and overlap
 * @param {Object} slide - PptxGenJS slide object
 * @param {Array} circles - [{ label, items: [], color }] (2-3 circles)
 * @param {Object} opts - { x, y, w, h, intersectionLabel, intersectionItems }
 */
function addVenn(slide, circles, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.3;
  const w = opts.w || sp.contentW;
  const h = opts.h || 4;

  const circleCount = Math.min(circles.length, 3);

  if (circleCount === 2) {
    // Two-circle Venn
    const circleD = Math.min(w * 0.45, h * 0.7);
    const overlap = circleD * 0.35;
    const centerY = y + h / 2;

    const c1x = x + w / 2 - circleD / 2 - overlap / 2;
    const c2x = x + w / 2 - circleD / 2 + overlap / 2;

    // Circle 1
    slide.addShape('oval', {
      x: c1x,
      y: centerY - circleD / 2,
      w: circleD,
      h: circleD,
      fill: { color: circles[0].color || C.grabGreen, transparency: 60 },
      line: { color: circles[0].color || C.grabGreen, pt: 2 },
    });

    // Circle 2
    slide.addShape('oval', {
      x: c2x,
      y: centerY - circleD / 2,
      w: circleD,
      h: circleD,
      fill: { color: circles[1].color || C.accentAmber, transparency: 60 },
      line: { color: circles[1].color || C.accentAmber, pt: 2 },
    });

    // Labels
    slide.addText(circles[0].label, {
      x: c1x - 0.3,
      y: centerY - circleD / 2 - 0.35,
      w: circleD * 0.6,
      h: 0.3,
      fontFace: 'Roboto Medium',
      fontSize: 10,
      color: C.textDark,
      align: 'center',
    });

    slide.addText(circles[1].label, {
      x: c2x + circleD * 0.4 + 0.3,
      y: centerY - circleD / 2 - 0.35,
      w: circleD * 0.6,
      h: 0.3,
      fontFace: 'Roboto Medium',
      fontSize: 10,
      color: C.textDark,
      align: 'center',
    });

    // Unique items for circle 1
    if (circles[0].items && circles[0].items.length > 0) {
      const items1Text = circles[0].items.slice(0, 3).map(i => `- ${i}`).join('\n');
      slide.addText(items1Text, {
        x: c1x + 0.15,
        y: centerY - 0.4,
        w: circleD * 0.4,
        h: 0.8,
        fontFace: 'Roboto',
        fontSize: 8,
        color: C.textDark,
        wrap: true,
      });
    }

    // Unique items for circle 2
    if (circles[1].items && circles[1].items.length > 0) {
      const items2Text = circles[1].items.slice(0, 3).map(i => `- ${i}`).join('\n');
      slide.addText(items2Text, {
        x: c2x + circleD * 0.5,
        y: centerY - 0.4,
        w: circleD * 0.4,
        h: 0.8,
        fontFace: 'Roboto',
        fontSize: 8,
        color: C.textDark,
        wrap: true,
      });
    }

    // Intersection
    if (opts.intersectionLabel) {
      const intX = x + w / 2;
      slide.addText(opts.intersectionLabel, {
        x: intX - 0.7,
        y: centerY - 0.15,
        w: 1.4,
        h: 0.3,
        fontFace: 'Roboto Medium',
        fontSize: 9,
        color: C.textDark,
        align: 'center',
      });
    }

    if (opts.intersectionItems && opts.intersectionItems.length > 0) {
      const intItemsText = opts.intersectionItems.slice(0, 2).join('\n');
      slide.addText(intItemsText, {
        x: x + w / 2 - 0.8,
        y: centerY + 0.15,
        w: 1.6,
        h: 0.5,
        fontFace: 'Roboto',
        fontSize: 8,
        color: C.grabGreenDark,
        align: 'center',
      });
    }

  } else if (circleCount === 3) {
    // Three-circle Venn
    const circleD = Math.min(w * 0.38, h * 0.55);
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    const offset = circleD * 0.35;

    // Circle positions (triangle arrangement)
    const positions = [
      { x: centerX - circleD / 2, y: centerY - offset - circleD / 2 },  // Top
      { x: centerX - circleD / 2 - offset * 0.8, y: centerY + offset * 0.3 - circleD / 2 },  // Bottom left
      { x: centerX - circleD / 2 + offset * 0.8, y: centerY + offset * 0.3 - circleD / 2 },  // Bottom right
    ];

    const defaultColors = [C.grabGreen, C.accentAmber, '4A90D9'];

    circles.slice(0, 3).forEach((circle, i) => {
      const pos = positions[i];
      const color = circle.color || defaultColors[i];

      slide.addShape('oval', {
        x: pos.x,
        y: pos.y,
        w: circleD,
        h: circleD,
        fill: { color: color, transparency: 65 },
        line: { color: color, pt: 2 },
      });

      // Label position based on circle
      let labelX, labelY;
      if (i === 0) {
        labelX = pos.x + circleD / 2 - 0.6;
        labelY = pos.y - 0.35;
      } else if (i === 1) {
        labelX = pos.x - 0.4;
        labelY = pos.y + circleD + 0.1;
      } else {
        labelX = pos.x + circleD - 0.8;
        labelY = pos.y + circleD + 0.1;
      }

      slide.addText(circle.label, {
        x: labelX,
        y: labelY,
        w: 1.2,
        h: 0.3,
        fontFace: 'Roboto Medium',
        fontSize: 9,
        color: C.textDark,
        align: 'center',
      });
    });

    // Center intersection
    if (opts.intersectionLabel) {
      slide.addText(opts.intersectionLabel, {
        x: centerX - 0.6,
        y: centerY - 0.15,
        w: 1.2,
        h: 0.3,
        fontFace: 'Roboto Medium',
        fontSize: 9,
        color: C.textDark,
        align: 'center',
      });
    }
  }
}

// ============================================================================
// V15: Radial Timeline - Cyclical time, quarterly rhythm
// ============================================================================

/**
 * Renders a radial/circular timeline showing cyclical events
 * @param {Object} slide - PptxGenJS slide object
 * @param {Array} events - [{ label, time, description, color, isCurrent }]
 * @param {Object} opts - { x, y, w, h, centerLabel }
 */
function addRadialTimeline(slide, events, opts = {}) {
  const x = opts.x || sp.marginH;
  const y = opts.y || 1.3;
  const w = opts.w || sp.contentW;
  const h = opts.h || 4;

  const centerX = x + w / 2;
  const centerY = y + h / 2;
  const outerRadius = Math.min(w, h) / 2 - 0.8;
  const innerRadius = outerRadius * 0.5;

  const eventCount = events.length;
  const angleStep = (2 * Math.PI) / eventCount;
  const startAngle = -Math.PI / 2;  // Start at 12 o'clock

  // Outer circle (track)
  slide.addShape('oval', {
    x: centerX - outerRadius,
    y: centerY - outerRadius,
    w: outerRadius * 2,
    h: outerRadius * 2,
    fill: { type: 'none' },
    line: { color: C.borderLight, pt: 3 },
  });

  // Inner circle
  slide.addShape('oval', {
    x: centerX - innerRadius,
    y: centerY - innerRadius,
    w: innerRadius * 2,
    h: innerRadius * 2,
    fill: { color: C.grabGreenMint },
    line: { color: C.grabGreen, pt: 2 },
  });

  // Center label
  if (opts.centerLabel) {
    slide.addText(opts.centerLabel, {
      x: centerX - innerRadius + 0.2,
      y: centerY - 0.2,
      w: innerRadius * 2 - 0.4,
      h: 0.4,
      fontFace: 'Roboto Medium',
      fontSize: 11,
      color: C.grabGreenDark,
      align: 'center',
      valign: 'middle',
    });
  }

  // Event markers
  events.forEach((event, i) => {
    const angle = startAngle + i * angleStep;
    const markerX = centerX + Math.cos(angle) * outerRadius;
    const markerY = centerY + Math.sin(angle) * outerRadius;

    const eventColor = event.color || (event.isCurrent ? C.grabGreen : C.textMid);
    const markerSize = event.isCurrent ? 0.35 : 0.25;

    // Marker dot
    slide.addShape('oval', {
      x: markerX - markerSize / 2,
      y: markerY - markerSize / 2,
      w: markerSize,
      h: markerSize,
      fill: { color: eventColor },
      line: { color: 'FFFFFF', pt: 2 },
    });

    // Connection line to center
    slide.addShape('line', {
      x: centerX,
      y: centerY,
      w: (markerX - centerX) * 0.7,
      h: (markerY - centerY) * 0.7,
      line: { color: C.borderLight, pt: 1, dashType: 'dash' },
    });

    // Label and description - position based on quadrant
    const labelOffset = 0.5;
    let labelX, labelY, labelAlign;

    if (Math.cos(angle) >= 0) {
      labelX = markerX + labelOffset;
      labelAlign = 'left';
    } else {
      labelX = markerX - 1.5 - labelOffset;
      labelAlign = 'right';
    }

    if (Math.sin(angle) >= 0) {
      labelY = markerY + 0.1;
    } else {
      labelY = markerY - 0.6;
    }

    // Time badge
    slide.addShape('roundedRectangle', {
      x: labelX,
      y: labelY,
      w: 0.8,
      h: 0.25,
      fill: { color: event.isCurrent ? C.grabGreen : C.bgLightGray },
      line: { pt: 0 },
      rectRadius: 0.03,
    });

    slide.addText(event.time, {
      x: labelX,
      y: labelY,
      w: 0.8,
      h: 0.25,
      fontFace: 'Roboto Medium',
      fontSize: 8,
      color: event.isCurrent ? 'FFFFFF' : C.textMid,
      align: 'center',
      valign: 'middle',
    });

    // Event label
    slide.addText(event.label, {
      x: labelX,
      y: labelY + 0.3,
      w: 1.5,
      h: 0.25,
      fontFace: 'Roboto Medium',
      fontSize: 9,
      color: event.isCurrent ? C.grabGreen : C.textDark,
      align: labelAlign,
    });

    // Description
    if (event.description) {
      slide.addText(event.description, {
        x: labelX,
        y: labelY + 0.55,
        w: 1.5,
        h: 0.4,
        fontFace: 'Roboto',
        fontSize: 7,
        color: C.textMid,
        align: labelAlign,
        wrap: true,
      });
    }
  });

  // Current position indicator (arrow)
  const currentEvent = events.find(e => e.isCurrent);
  if (currentEvent) {
    const currentIndex = events.indexOf(currentEvent);
    const currentAngle = startAngle + currentIndex * angleStep;
    const arrowX = centerX + Math.cos(currentAngle) * (outerRadius + 0.4);
    const arrowY = centerY + Math.sin(currentAngle) * (outerRadius + 0.4);

    slide.addText('NOW', {
      x: arrowX - 0.3,
      y: arrowY - 0.15,
      w: 0.6,
      h: 0.3,
      fontFace: 'Roboto Black',
      fontSize: 8,
      color: C.grabGreen,
      align: 'center',
    });
  }
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // V8-V15 Visual Metaphor Templates
  addBalanceScale,
  addGearSystem,
  addIceberg,
  addBridgeGap,
  addLadder,
  addPuzzle,
  addVenn,
  addRadialTimeline,
};
