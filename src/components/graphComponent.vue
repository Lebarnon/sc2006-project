<template>
  <div>
    <h2>{{ title }}</h2>
    <line-chart :data="chartData"></line-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { useGraphStore } from './graphStore'

export default {
  name: 'GraphComponent',
  extends: Line,
  props: {
    title: {
      type: String,
      default: 'My Time Series Chart'
    },
    flatType: {
      type: String,
      default: '3-ROOM'
    },
    town: {
      type: String,
      default: 'ANG MO KIO'
    }
  },
  setup(props) {
    const graphStore = useGraphStore()

    const chartData = graphStore.chartData

    const fetchChartData = async () => {
      await graphStore.fetchChartData(props.flatType, props.town)
      renderChart(chartData)
    }

    const renderChart = (chartData) => {
      this.renderChart(chartData, { responsive: true, maintainAspectRatio: false })
    }

    fetchChartData()

    return {
      chartData
    }
  }
}
</script>
