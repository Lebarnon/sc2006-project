<template>
  <v-container class="justify-center">
    <v-row>
      <v-col 
        v-for="listing of listingStore.listings"
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
  </v-container>
</template>

<script setup>
import ListingCard from "@/components/ListingCard.vue"
import { ref, onBeforeMount} from 'vue'
import { useListingStore } from "../stores/listing";
import { useUserStore } from "../stores/user";

const listingStore = useListingStore()
const userStore = useUserStore()
const isLoading = ref(true)

onBeforeMount(() => {
  listingStore.setListings().then(() => isLoading.value = true)
})

function handleFavClicked(listingId){
  userStore.toggleFavListing(listingId)
}
  
</script>
<style scoped>

</style>