<template>
  <LoadingOverlay v-if="isLoading" :is-loading="isLoading"/>
  <ListingGrid v-else :listings-data="favListings"/>
</template>
  
<script setup>
import ListingGrid from "../components/ListingGrid.vue";
import LoadingOverlay from "../components/LoadingOverlay.vue";
import { ref, onBeforeMount} from 'vue'
import { useUserStore } from "../stores/user";
  
const favListings = ref([])
const userStore = useUserStore()
const isLoading = ref(false)

onBeforeMount(() => {
  userStore.getFavListings().then((result) => {
    favListings.value = result
    isLoading.value = false
  })
})
  
</script>
<style scoped>

</style>