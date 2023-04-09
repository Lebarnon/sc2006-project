import axios from 'axios';
import { defineStore } from 'pinia';
import { useSnackbarStore } from './snackbar';

export const useGraphStore = defineStore('graph', {
  actions: {
    async fetchChartData(listing) {
      const {flatType, town, storeyRange} = listing
      this.loading = true;
      let resalePrice;
      let labels;
      try {
        const response = await axios({
          method: 'get',
          url: 'https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3',
          params: {
            q: `{
              "flat_type" : "${flatType}",
              "town" : "${town}"
            }`,
          },
        });
        const records = response.data.result.records;

        // Sort records by lease_commence_date
        records.sort((a, b) => a.lease_commence_date - b.lease_commence_date);

        // Aggregate resale prices for each label (lease_commence_date)
        const aggregatedData = records.reduce((acc, record) => {
          const key = record.lease_commence_date;
          if (!acc[key]) {
            acc[key] = {
              resalePriceSum: 0,
              count: 0,
            };
          }
          acc[key].resalePriceSum += parseFloat(record.resale_price);
          acc[key].count++;
          return acc;
        }, {});

        // Get the final resalePrice and labels
        resalePrice = Object.values(aggregatedData).map(
          (value) => value.resalePriceSum / value.count
        );
        labels = Object.keys(aggregatedData);
        

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.message;
      }
      if(resalePrice.length==0){
        useSnackbarStore().display("No Resale Price History Found", "red-darken-2")
      }

      return {
        resalePrice,
        labels,
      };
    },
  },
});
