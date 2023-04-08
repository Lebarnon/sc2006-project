import axios from 'axios';
import { defineStore } from 'pinia'
import { reactive } from 'vue'



export const useGraphStore = defineStore('graph',{
    actions: {
      async fetchChartData(flatType, town) {
        this.loading = true
        let resalePrice
        let labels
        try {
          const response = await axios({
            method: "get",
            url: 'https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3',
            params:{
              q: `{
                "flat_type" : "${flatType}",
                "town" : "${town}"
              }`,
              limit: '10'
            }
          })
          console.log(response.status)
          console.log(response.data.help)
          console.log(response.data)
          resalePrice = response.data.result.records.map(record => record.resale_price)
          labels = response.data.result.records.map(record => record.lease_commence_date)

          this.loading = false
        } catch (error) {
          this.loading = false 
          this.error = error.message
        }
      
    
      return ({
        resalePrice, labels
      })
    }
  }
})

