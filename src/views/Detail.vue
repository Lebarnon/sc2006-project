<template>
  <v-container>
    <LoadingOverlay v-if="isLoading"/>
    <v-row v-else justify="center">
      <v-col cols="12" sm="9" v-if="listing != null">
        <DetailCard 
          :data = "listing" 
          :is-value-buy="isValueBuy" 
          :is-fav-listing="isFavListing"
          :is-own-listing="isOwnListing"
          @on-fav-clicked = "handleFavClicked"
          @on-edit-clicked = "handleEditClicked"/>
      </v-col>
    </v-row>
    <PricingGraph :data="chartData"/>
  </v-container>
</template>

<script setup>
import LoadingOverlay from "../components/LoadingOverlay.vue";
import PricingGraph from "@/components/PricingGraph.vue"
import DetailCard from "@/components/DetailCard.vue"
import { onMounted, ref, watch, computed } from "vue";
import router from "../router";
import { useListingStore } from "../stores/listing";
import { usePricingStore } from "../stores/pricing";
import { useUserStore } from "../stores/user";
import { useGraphStore } from "../stores/graphStore";
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const pricingStore = usePricingStore()
const listingStore = useListingStore()
const graphStore = useGraphStore()
const listing = ref(null)
const isValueBuy = ref(false)
const chartData = ref(null)
const route = useRoute()
const isOwnListing = computed(() => userStore.isOwnListing(listing.value.id))
const isFavListing = computed(() => userStore.isFavListing(listing.value.id))
const isLoading = ref(true)

onMounted(async () => {
  const result = await listingStore.getListingById(route.params.id)
  if (result == null) router.push("/error")
  isLoading.value = false
  listing.value = result
  isValueBuy.value = await pricingStore.isValueBuy(result)
  graphStore.fetchChartData(listing.value).then(result => chartData.value = result)
})

function handleFavClicked(listingId){
  userStore.toggleFavListing(listingId)
}

function handleEditClicked(listingsId){
  if(userStore.isOwnListing(listingsId)){
    router.push(`/updatelisting/${listingsId}`)
  }
}

</script> 

<style scoped>
.invisible{
  visibility: hidden;
}
</style>