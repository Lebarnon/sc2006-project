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
    <v-btn
      @click="sbStore.display('test')"
      >test</v-btn>
   
  </v-container>
</template>

<script setup>
import ListingCard from "@/components/ListingCard.vue"
import { ref, onBeforeMount} from 'vue'
import { useListingStore } from "../stores/listing";
import { useSnackbarStore } from "../stores/snackbar";

const listingStore = useListingStore()
const isLoading = ref(true)
const sbStore = useSnackbarStore()

onBeforeMount(() => {
  listingStore.setListings().then(() => isLoading.value = true)
})

  
</script>
<style scoped>

</style>