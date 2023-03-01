<template>
  <v-container class="justify-center">
    <v-row>
      <v-col 
        v-for="listing of listingStore.listings"
        cols="4"
      >
        <ListingCard  :listing = "listing"/>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script setup>
import ListingCard from "@/components/ListingCard.vue"
import { ref, onBeforeMount} from 'vue'
import { useListingStore } from "../stores/listing";

const listingStore = useListingStore()
const isLoading = ref(true)

onBeforeMount(() => {
  listingStore.setListings().then(() => isLoading.value = true)
})

  
</script>
<style scoped>

</style>