<template>
  <LoadingOverlay v-if="isLoading" :is-loading="isLoading"/>
  <ListingGrid v-else :listings="searchResults" />
</template>

<script setup>
import ListingGrid from "../components/ListingGrid.vue";
import LoadingOverlay from "../components/LoadingOverlay.vue";
import { ref, onBeforeMount, computed} from 'vue'
import { useListingStore } from "../stores/listing";
import { useRoute } from "vue-router";
const listingStore = useListingStore()
const searchResults = ref(null)
const isLoading = ref(true)
const route = useRoute()


onBeforeMount(() => {
  listingStore.searchListing(route.query).then((result) => {
    searchResults.value = result
    isLoading.value = false
  })
})

  
</script>
<style scoped>

</style>