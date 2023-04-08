<template>
  <v-container>
    <Line :data="chartData" :options="options"/>
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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 39, 10, 40, 39, 80, 40]
      }
    ]
  }
})

</script>
