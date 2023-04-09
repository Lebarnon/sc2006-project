<template>
  <LoadingOverlay v-if="isRecommendedLoading" :is-loading="isRecommendedLoading"/>
  <ListingGrid v-else :listings-data="recommendedListings"/>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ListingGrid from "../components/ListingGrid.vue";
import { useListingStore } from "../stores/listing";
import { ref, onBeforeMount } from "vue";
const listingStore = useListingStore()
const isRecommendedLoading = ref(true)
const recommendedListings = ref([])

onBeforeMount(() => {
  listingStore.findRecommendedListings().then((result) => {
    recommendedListings.value = result
  })
  isRecommendedLoading.value = false
})


</script>
<style scoped>

</style>