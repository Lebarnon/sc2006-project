<template>
  <LoadingOverlay v-if="listingStore.isLoading" :is-loading="listingStore.isLoading"/>
  <ListingGrid v-else :listings-data="listingStore.listings"/>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ListingGrid from "../components/ListingGrid.vue";
import { useListingStore } from "../stores/listing";

const listingStore = useListingStore()

</script>
<style scoped>

</style>