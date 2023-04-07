import axios from 'axios';
import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { doc, collection, query, where, getDocs, getDoc } from "firebase/firestore"; 
import { mdiTagPlus } from '@mdi/js';
import { reactive } from 'vue'

const storageRef = ref(storage)

const graphStore = reactive({
  chartData: null,
  loading: false,
  error: null
})

export const useGraphStore = defineStore('graph',{
    actions: {
      async fetchChartData(flatType, town){
        graphStore.loading = true
        try {
          print('hihihii')
          const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&q=3ROOM')
          const ResalePrice = response.data.result.records.map(record => record.resalePrice)
          const labels = response.data.result.records.map(record => record.timestamp)
          graphStore.chartData = {
            labels,
            datasets: [
              {
                label: 'Price History',
                backgroundColor: '#f87979',
                data: ResalePrice
              }
            ]
          }
          graphStore.loading = false
        } catch (error) {
          graphStore.loading = false
          graphStore.error = error.message
        }
      
    
      return {
        chartData: graphStore.chartData,
        loading: graphStore.loading,
        error: graphStore.error,
        fetchChartData
      }
    }
  }
}

)

