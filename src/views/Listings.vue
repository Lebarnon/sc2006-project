<template>
  <v-container class="justify-center">
    <v-row>
      <v-col 
        v-for="listing of listingStore.listings.slice(startingInd, endingInd)"
        :key="listing.id"
        cols="4"
      >
        <ListingCard  
          :listing = "listing" 
          :isFavListing= "userStore.isFavListing(listing.id)"
          :isOwnListing= "userStore.isOwnListing(listing.id)"
          @on-fav-clicked = "handleFavClicked"
        />
      </v-col>
    </v-row> 
    <div class="text-center mt-6">
      <v-pagination
        v-model="page"
        :length="numOfPages"
        :total-visible="7"
      ></v-pagination>
    </div>  
  </v-container>
</template>

<script setup>
import ListingCard from "@/components/ListingCard.vue"
import { ref, onBeforeMount, computed, watch} from 'vue'
import { useListingStore } from "../stores/listing";
import { useUserStore } from "../stores/user";

const listingStore = useListingStore()
const userStore = useUserStore()
const isLoading = ref(true)
const page = ref(1)
const startingInd = computed(() => {
  return (page.value-1) * numOfListingsPerPage
})
const endingInd = computed(() => {
  if(page.value * numOfListingsPerPage > listingStore.listings.length){
    return listingStore.listings.length
  }else{
    return page.value * numOfListingsPerPage
  }
})
const numOfListingsPerPage = 9

const numOfPages = computed(() => {
  return Math.ceil(listingStore.listings.length / 9)
})
onBeforeMount(() => {
  listingStore.setListings().then(() => isLoading.value = true)
})

function handleFavClicked(listingId){
  userStore.toggleFavListing(listingId)
}
  
</script>
<style scoped>

</style>