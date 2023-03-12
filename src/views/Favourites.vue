<template>
    <v-container class="justify-center text-center">
      <LoadingOverlay :is-loading="isLoading"></LoadingOverlay>
      <v-row v-if="favListings.length > 0">
        <v-col 
          v-for="listing of favListings"
          :key="listing.id"
          cols="4"
        >
          <ListingCard  
            :listing = "listing" 
            :isFavListing= "userStore.isFavListing(listing.id)"
            @on-fav-clicked = "handleFavClicked"
          />
        </v-col>
      </v-row>   
      <v-row v-else >
        <p>You have no favourite listing</p>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import ListingCard from "@/components/ListingCard.vue"
  import LoadingOverlay from "../components/LoadingOverlay.vue";
  import { ref, onBeforeMount} from 'vue'
  import { useUserStore } from "../stores/user";
  
  const favListings = ref([])
  const userStore = useUserStore()
  const isLoading = ref(true)
  
  onBeforeMount(() => {
    userStore.getFavListings().then((result) => {
      favListings.value = result
      isLoading.value = false
    })
  })
  
  function handleFavClicked(listingId){
    userStore.toggleFavListing(listingId)
  }
    
  </script>
  <style scoped>
  
  </style>