<template>
  <v-container class="justify-center">
    <v-row class="justify-center">
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          density="comfortable"
          append-inner-icon="search"
          label="Search"
          v-model="searchValue"
        />
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class="align-center my-1" no-gutters>
      <v-col class="mt-n2 mr-n8" cols="1">
        <p class="text-caption text-grey-darken-2">
          Sort by:
        </p>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="filterValue"
          density="compact"
          single-line
          :items="filters"
          variant="underlined"
        ></v-select>
      </v-col>
    </v-row>
    <NoResultFound v-if="!listings || listings.length == 0" />
    <v-row v-else class="mt-n6">
      <v-col 
        v-for="(listing, index) in listings"
        v-show="index >= startingInd && index < endingInd"
        :key="index"
        cols="4"
      >
        <ListingCard  
          :listing = "listing" 
          :isFavListing= "userStore.isFavListing(listing.id)"
          :isOwnListing= "userStore.isOwnListing(listing.id)"
          :isValueBuy="pricingStore.isValueBuy(listing)"
          @on-fav-clicked = "handleFavClicked"
          @on-edit-clicked = "handleEditClicked"
        />
      </v-col>
    </v-row> 
    <div class="text-center mt-6">
      <v-pagination
        v-model="page"
        :length="numOfPages"
        :total-visible="7"
      ></v-pagination>
    </div>  
  </v-container>
</template>

<script setup>
import NoResultFound from "@/components/NoResultFound.vue"
import ListingCard from "@/components/ListingCard.vue"
import { ref, computed} from 'vue'
import { useUserStore } from "../stores/user";
import router from "../router";
import { useListingStore } from "../stores/listing";
import { usePricingStore } from "../stores/pricing";

const pricingStore = usePricingStore()
const props = defineProps(["listingsData"])
const page = ref(1)
const numOfListingsPerPage = 9
const userStore = useUserStore()
const listingStore = useListingStore()
const searchValue = ref("")
const filterValue = ref("Default")
const filters = ['Default','Street Name', 'Price', 'Town', 'Flat Model', 'Flat Type', 'Floor Area', 'Storey Range', 'Num Of Toilet', 'Remaining Lease']

const listings = computed(() => listingStore.filterListings(props.listingsData, searchValue.value, filterValue.value))
const listingLength = computed(() => listings.value.length)

const startingInd = computed(() => {
  return (page.value-1) * numOfListingsPerPage
})
const endingInd = computed(() => {
  if(page.value * numOfListingsPerPage > listingLength.value){
    return listingLength.value
  }else{
    return page.value * numOfListingsPerPage
  }
})

const numOfPages = computed(() => {
  return Math.ceil(listingLength.value / 9)
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

</style>