<template>
  <LoadingOverlay :is-loading="isLoading"/>
  <ListingGrid :listings-data="listings" :is-loading="isLoading"/>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ListingGrid from "../components/ListingGrid.vue";
import { ref, onBeforeMount} from 'vue'
import { useUserStore } from "../stores/user";

const userStore = useUserStore()
const isLoading = ref(true)
const listings = ref([])
onBeforeMount(() => {
  userStore.getOwnListings().then((result) => {
    listings.value = result
    isLoading.value = false
  })
})

  
</script>
<style scoped>

</style>