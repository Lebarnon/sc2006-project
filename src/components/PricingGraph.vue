<template>
  <v-container>
    <Line :data="chartData" :options="options" :style="styles"/>
  </v-container>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const props = defineProps(["data"])

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const styles = {
  height: '500px'
}
const chartData = computed(() => {
  if(props.data){
    return {
      labels: props.data.labels,
      datasets: [
        {
          label: 'Price',
          backgroundColor: '#f87979',
          data: props.data.resalePrice
        }
      ]
    }
  }
  return {
    labels: [],
    datasets: [
      {
        label: 'Price',
        backgroundColor: '#f87979',
        data: []
      }
    ]
  }
})

</script>
