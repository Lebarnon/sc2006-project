<template>
  <NoResultFound v-if="listings.length == 0" />
  <v-container v-else class="justify-center">
    <v-row class="justify-center">
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          append-inner-icon="search"
          label="Search"
          v-model="searchValue"
        />
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class="align-center">
      <v-col class="mt-n4" cols="1">
        <p class="text-caption text-grey-darken-2">
          Sort by:
        </p>
      </v-col>
      <v-col cols="2">
        <v-select
          label="Default"
          density="compact"
          single-line
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="underlined"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col 
        v-for="listing of listings.slice(startingInd, endingInd)"
        :key="listing.id"
        cols="4"
      >
        <ListingCard  
          :listing = "listing" 
          :isFavListing= "userStore.isFavListing(listing.id)"
          :isOwnListing= "userStore.isOwnListing(listing.id)"
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
const props = defineProps(["listings"])
const page = ref(1)
const numOfListingsPerPage = 9
const userStore = useUserStore()
const searchValue = ref("")

const startingInd = computed(() => {
  return (page.value-1) * numOfListingsPerPage
})
const endingInd = computed(() => {
  if(page.value * numOfListingsPerPage > props.listings.length){
    return props.listings.length
  }else{
    return page.value * numOfListingsPerPage
  }
})

const numOfPages = computed(() => {
  return Math.ceil(props.listings.length / 9)
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