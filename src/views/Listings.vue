<template>
  <LoadingOverlay :is-loading="isLoading"/>
 
  <ListingGrid :listings="listingStore.listings" :is-loading="isLoading"/>

</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ListingGrid from "../components/ListingGrid.vue";
import { ref, onBeforeMount} from 'vue'
import { useListingStore } from "../stores/listing";

const listingStore = useListingStore()
const isLoading = ref(true)


onBeforeMount(() => {
  listingStore.setListings().then(() => isLoading.value = false)
})

  
</script>
<style scoped>

</style>