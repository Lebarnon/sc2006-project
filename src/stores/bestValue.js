import { defineStore } from "pinia";

export const useBestValueStore = defineStore("bestvalue", {
  state: () => {
    return {
    
    }
  },
  actions:{
    getBestValue(newSelectedListings){
      var curBestI = 0
      var largestPercentageDiff = -1
      var percentageDiffs =[0,0,0]
      
      for(let i=0; i<newSelectedListings.length; i++){
        var curListing = newSelectedListings[i]
        if(curListing == null) continue
        var curPercentageDiff = Math.round((curListing.estimatedPrice - curListing.price) / curListing.price * 100)
        percentageDiffs[i] = curPercentageDiff
        if(curPercentageDiff > largestPercentageDiff){
          curBestI = i
          largestPercentageDiff = curPercentageDiff
        }
      }
      return([percentageDiffs, curBestI])
    }
  }
})