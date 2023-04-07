<template>
  <NoResultFound v-if="!listings || listings.length == 0" />
  <v-container v-else class="justify-center">
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
    <v-row class="mt-n6">
      <v-col 
        v-for="listing in filterFunction(listings).slice(startingInd, endingInd)"
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
const filterValue = ref("Default")
const listingLength = ref(props.listings.length)
const filters = ['Default','Street Name', 'Price']

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

function filterFunction(listings){
  const filteredListings = listings.filter(listing => {
    //converts properties of each listing object to lowercase to compare with search
    const searchTerm = searchValue.value.toLowerCase();
    const name = listing.name.toLowerCase();
    const flatType = listing.flatType.toLowerCase();
    const flatModel = listing.flatModel.toLowerCase();
    const town = listing.town.toLowerCase();
    const streetName = listing.streetName.toLowerCase();
    const description = listing.description.toLowerCase();
    return ( 
      //returns listings if any one of the fields contain the search criteria
      name.indexOf(searchTerm) !== -1 ||
      flatType.indexOf(searchTerm) !== -1 ||
      flatModel.indexOf(searchTerm) !== -1 ||
      town.indexOf(searchTerm) !== -1 ||
      streetName.indexOf(searchTerm) !== -1 ||
      description.indexOf(searchTerm) !== -1
    );
  });

  if(filterValue.value =="Default"){
    filteredListings.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  }else if(filterValue.value == "Street Name"){
    filteredListings.sort((a,b) => (a.streetName > b.streetName) ? 1 : ((b.streetName > a.streetName) ? -1 : 0))
  }else if(filterValue.value == "Price"){
    filteredListings.sort((a,b) => a.price - b.price)
  }
  console.log(filteredListings.length)
  listingLength.value = filteredListings.length
  return [...filteredListings];
} 

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