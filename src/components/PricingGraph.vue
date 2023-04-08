<template>
  <div>
    <h2>Graph Component</h2>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const canvas = this.$refs.canvas;
      const chartData = this.chartData;

      if (!canvas || !chartData) {
        return;
      }

      const chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: chartData.label,
              data: chartData.data,
              borderColor: chartData.borderColor,
              backgroundColor: chartData.backgroundColor,
              fill: chartData.fill,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'month',
                  tooltipFormat: 'll',
                },
              },
            ],
          },
        },
      });
    },
  },
};
</script>
