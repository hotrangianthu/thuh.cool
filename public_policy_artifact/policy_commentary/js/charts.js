/**
 * Vietnam Budget Infographics — ECharts Visualizations
 * Reusable chart components for budget data display
 */

const VN_COLORS = {
  red: '#DA251D',
  redDark: '#B01E17',
  yellow: '#FFCD00',
  yellowDark: '#CCA400'
};

const CHART_PALETTE = [
  '#DA251D', '#FFCD00', '#3498db', '#27ae60', '#9b59b6',
  '#e67e22', '#1abc9c', '#2c3e50', '#7f8c8d', '#f39c12'
];

/**
 * Budget Overview Pie Chart
 */
function renderBudgetPieChart(containerId, data) {
  const chart = echarts.init(document.getElementById(containerId));

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} trillion VND ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      textStyle: { fontSize: 11 }
    },
    series: [{
      name: 'Budget Allocation',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      data: data.map((item, i) => ({
        value: item.amount,
        name: item.name,
        itemStyle: { color: item.color || CHART_PALETTE[i % CHART_PALETTE.length] }
      }))
    }]
  };

  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

/**
 * Revenue vs Expenditure Trend Line Chart
 */
function renderTrendChart(containerId, trendData) {
  const chart = echarts.init(document.getElementById(containerId));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Revenue', 'Expenditure', 'Deficit (% GDP)'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trendData.years,
      axisLabel: { fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Trillion VND',
        position: 'left',
        axisLabel: { fontSize: 10 }
      },
      {
        type: 'value',
        name: '% GDP',
        position: 'right',
        max: 6,
        axisLabel: { fontSize: 10 }
      }
    ],
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: trendData.revenue,
        smooth: true,
        lineStyle: { width: 3, color: '#27ae60' },
        itemStyle: { color: '#27ae60' },
        areaStyle: { color: 'rgba(39, 174, 96, 0.1)' }
      },
      {
        name: 'Expenditure',
        type: 'line',
        data: trendData.expenditure,
        smooth: true,
        lineStyle: { width: 3, color: '#e74c3c' },
        itemStyle: { color: '#e74c3c' },
        areaStyle: { color: 'rgba(231, 76, 60, 0.1)' }
      },
      {
        name: 'Deficit (% GDP)',
        type: 'line',
        yAxisIndex: 1,
        data: trendData.deficit_pct,
        smooth: true,
        lineStyle: { width: 2, color: '#f39c12', type: 'dashed' },
        itemStyle: { color: '#f39c12' }
      }
    ]
  };

  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

/**
 * Sector Budget Breakdown Bar Chart
 */
function renderSectorBreakdownChart(containerId, sectorData) {
  const chart = echarts.init(document.getElementById(containerId));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c} trillion VND'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: sectorData.breakdown.map(d => d.item),
      axisLabel: { fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: sectorData.breakdown.map(d => d.amount),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: VN_COLORS.red },
          { offset: 1, color: VN_COLORS.redDark }
        ]),
        borderRadius: [0, 4, 4, 0]
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{c}T',
        fontSize: 10
      }
    }]
  };

  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

/**
 * KPI Gauge Chart
 */
function renderGaugeChart(containerId, value, title, max = 100, color = VN_COLORS.red) {
  const chart = echarts.init(document.getElementById(containerId));

  const option = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: max,
      splitNumber: 5,
      radius: '100%',
      center: ['50%', '70%'],
      axisLine: {
        lineStyle: {
          width: 12,
          color: [
            [value / max, color],
            [1, '#f0f0f0']
          ]
        }
      },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 11,
        color: '#666'
      },
      detail: {
        fontSize: 24,
        fontWeight: 'bold',
        offsetCenter: [0, '20%'],
        valueAnimation: true,
        formatter: value => value.toFixed(1) + '%',
        color: color
      },
      data: [{ value: value, name: title }]
    }]
  };

  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

/**
 * Revenue Source Treemap
 */
function renderRevenueTreemap(containerId, data) {
  const chart = echarts.init(document.getElementById(containerId));

  const option = {
    tooltip: {
      formatter: info => {
        return `${info.name}: ${info.value} trillion VND (${info.data.pct}%)`;
      }
    },
    series: [{
      type: 'treemap',
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      label: {
        show: true,
        formatter: '{b}\n{c}T',
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      data: data.map((item, i) => ({
        name: item.category,
        value: item.amount,
        pct: item.pct,
        itemStyle: { color: CHART_PALETTE[i % CHART_PALETTE.length] }
      }))
    }]
  };

  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

/**
 * Initialize dashboard charts on main page
 */
async function initDashboardCharts() {
  try {
    const res = await fetch('data/budget-2025.json');
    if (!res.ok) throw new Error('Failed to load budget data');
    const budget = await res.json();

    // Pie chart - expenditure by sector
    if (document.getElementById('chart-expenditure-pie')) {
      renderBudgetPieChart('chart-expenditure-pie', budget.expenditure_by_sector);
    }

    // Trend chart
    if (document.getElementById('chart-trend')) {
      renderTrendChart('chart-trend', budget.trend_data);
    }

    // Revenue treemap
    if (document.getElementById('chart-revenue')) {
      renderRevenueTreemap('chart-revenue', budget.revenue_breakdown);
    }

    // Update overview stats
    updateOverviewStats(budget.overview);

  } catch (err) {
    console.warn('Could not load budget data for charts:', err);
  }
}

/**
 * Update overview statistics display
 */
function updateOverviewStats(overview) {
  const statEls = {
    'stat-revenue': overview.total_revenue.toLocaleString() + 'T',
    'stat-expenditure': overview.total_expenditure.toLocaleString() + 'T',
    'stat-deficit': overview.deficit.toLocaleString() + 'T',
    'stat-deficit-pct': overview.deficit_gdp_pct + '% GDP'
  };

  Object.entries(statEls).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

/**
 * Initialize sector page charts
 */
async function initSectorCharts(sectorId) {
  try {
    const res = await fetch('../data/budget-2025.json');
    if (!res.ok) throw new Error('Failed to load budget data');
    const budget = await res.json();

    const sectorData = budget.sector_details[sectorId];
    if (!sectorData) return;

    // Breakdown bar chart
    if (document.getElementById('chart-breakdown')) {
      renderSectorBreakdownChart('chart-breakdown', sectorData);
    }

    // KPI gauges
    if (sectorData.kpis) {
      Object.entries(sectorData.kpis).forEach(([key, value]) => {
        const gaugeEl = document.getElementById(`gauge-${key}`);
        if (gaugeEl && typeof value === 'number') {
          renderGaugeChart(`gauge-${key}`, value, key.replace(/_/g, ' '), 100);
        }
      });
    }

    // Update metric values
    updateSectorMetrics(sectorData);

  } catch (err) {
    console.warn('Could not load sector data for charts:', err);
  }
}

/**
 * Update sector metric cards with real data
 */
function updateSectorMetrics(sectorData) {
  if (!sectorData.kpis) return;

  document.querySelectorAll('.metric-card').forEach(card => {
    const label = card.querySelector('.metric-label');
    const value = card.querySelector('.metric-value');
    if (!label || !value) return;

    const labelText = label.textContent.toLowerCase();

    Object.entries(sectorData.kpis).forEach(([key, val]) => {
      if (labelText.includes(key.replace(/_/g, ' ').toLowerCase().slice(0, 10))) {
        value.textContent = typeof val === 'number' ? val.toLocaleString() : val;
      }
    });
  });
}

// Export for use in pages
window.VNBudgetCharts = {
  renderBudgetPieChart,
  renderTrendChart,
  renderSectorBreakdownChart,
  renderGaugeChart,
  renderRevenueTreemap,
  initDashboardCharts,
  initSectorCharts
};
