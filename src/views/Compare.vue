<template>
    <v-container class="justify-center">
    <LoadingOverlay :is-loading="isLoading"/>
    <v-row justify = "center">
      <v-col
        v-for="i in [...Array(numOfCompareCards).keys()]"
        cols="3"
        :key = "i"
      >
        <DropdownMenu 
          :locations="locations"
          @on-favourite-selected="(e) => handleFavouriteSelected(e, i)" />
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row justify = "center">
      <v-col 
        v-for="i in [...Array(numOfCompareCards).keys()]"
        cols="3"
        :key="i"
      >
        <CompareListingCard :listing="selectedListings[i]"/>
      </v-col>
    </v-row>
  </v-container>

  <v-row justify = "center">
      <v-col
      cols="9">
        <v-card-title>
          Summary
        </v-card-title>
        <v-divider/>
    </v-col>
  </v-row>

  <v-container>
    <v-row justify = "center">
      <v-col
        v-for="i in [...Array(numOfCompareCards).keys()]"
        cols="3"
        :key = "i"
      >
      <CompareDetailCard 
        :listing="selectedListings[i]" 
        :is-best-value="bestValueIndex == i" 
        />
        </v-col>
      </v-row>
  </v-container>

</template>

<script setup>
import LoadingOverlay from "../components/LoadingOverlay.vue"
import DropdownMenu from "@/components/DropdownMenu.vue"
import CompareListingCard from "@/components/CompareListingCard.vue"
import CompareDetailCard from "@/components/CompareDetailCard.vue"
import { ref, onBeforeMount, computed, watch} from 'vue'
import { useUserStore } from "../stores/user";
import { usePricingStore } from "../stores/pricing"

const userStore = useUserStore()
const isLoading = ref(true)
const numOfCompareCards = ref(3)

const selectedListings = ref([
  null,
  null,
  null
])

const bestValueIndex = ref(0)
watch(() => selectedListings.value, (newSelected, oldSelected)=> {
  var curBestI = 0
  var largestPercentageDiff = -1
  
  for(let i=0; i<newSelected.length; i++){
    var curListing = newSelected[i]
    if(curListing == null) continue
    var curPercentageDiff = Math.round((curListing.price - curListing.estimatedPrice) / curListing.price * 100)
    if(curPercentageDiff > largestPercentageDiff){
      curBestI = i
      largestPercentageDiff = curPercentageDiff
    }
  }
  bestValueIndex.value = curBestI
},{deep:true})

const favListings = ref([])
const locations = computed(() => {
  return favListings.value.map(e => e.name)
})

  
onBeforeMount(() => {
  userStore.getFavListings().then((result) => {
    favListings.value = result
    isLoading.value = false
  })
})
  

//e contains the payload, index is for which column
function handleFavouriteSelected(name, index) {
  // e is the listing name
  // index is which card is this selection for
  selectedListings.value[index] = favListings.value.find(e => e.name == name)
  
}
const data = ref({
  showListing: false
})


</script> 

<style>

</style>