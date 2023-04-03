<template>
  <NoResultFound v-if="listings.length == 0" />
  <v-container v-else class="justify-center">
    <v-row>
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
import { useRouter } from "vue-router";
import router from "../router";
const props = defineProps(["listings"])
const page = ref(1)
const numOfListingsPerPage = 9
const userStore = useUserStore()

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