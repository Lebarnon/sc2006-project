<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" v-if="listing != null">
        <DetailCard 
          :data = "listing" 
          :is-value-buy="isValueBuy" 
          :is-fav-listing="isFavListing"
          :is-own-listing="isOwnListing"
          @on-fav-clicked = "handleFavClicked"
          @on-edit-clicked = "handleEditClicked"/>
      </v-col>
      <p v-else> loading...</p>
    </v-row>
  </v-container>
</template>

<script setup>
import DetailCard from "@/components/DetailCard.vue"
import { onMounted, ref, watch,computed } from "vue";
import router from "../router";
import { useListingStore } from "../stores/listing";
import { usePricingStore } from "../stores/pricing";
import { useUserStore } from "../stores/user";
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const pricingStore = usePricingStore()
const listingStore = useListingStore()
const listing = ref(null)
const isValueBuy = ref(false)
const route = useRoute()
const isOwnListing = computed(() => userStore.isOwnListing(listing.value.id))
const isFavListing = computed(() => userStore.isFavListing(listing.value.id))
onMounted(async () => {
  const result = await listingStore.getListingById(route.params.id)
  if (result == null) router.push("/error")
  listing.value = result
  isValueBuy.value = await pricingStore.isValueBuy(result)
  console.log(isValueBuy.value)
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