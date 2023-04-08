<template>
  <v-img
    :src="LandingCoverImg"
    aspect-ratio="16/9"
    cover
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    class="coverImg d-flex text-center align-center text-white"
  >
    <h1 class="mb-5">Find Your Dream Home</h1>
    <p>Lorem ipsum dolor sit amet elit. Molestiae, non! Lorem ipsum, dolor sit amet <br/>  consectetur adipisicing elit. Voluptates, excepturi?</p>
  </v-img>
  <!-- Search Bar -->
  <v-row text-xs-center
    class="justify-center"
    flat
    height="60px"
  >
  <v-sheet
    style="z-index: 2;"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    class="py-4 px-6 mt-n12 mb-16 text-center mx-auto d-flex no-wrap align-center "
  >
      <v-text-field
        variant="outlined"
        class="mb-n4"
        label="Search for your dream property"
        v-model="searchValue"
      >
        <template v-slot:append>
          <v-btn 
            @click="handleSearch"
            class="mt-n2 text-white text-capitalize" 
            color="#2C3A61"
            >
            Search
          </v-btn>
        </template>
      </v-text-field>
  </v-sheet>
      
  </v-row>

  <!-- Description -->
  <div
    class="text-center my-4">
    <h1>Properties by Area</h1>
    <p>Lorem ipsum dolor sit amet elit. Molestiae, non! Lorem ipsum, <br/> dolor sit amet consectetur adipisicing elit. Voluptates, excepturi?</p>
  </div>

  <!-- Grid -->
  <v-container class="justify-center bg-transparent">
    <v-row>
      <v-col 
        cols="15"
      >
        <CategoryGrid/>
      </v-col>
    </v-row>
    <v-row class="justify-center my-8">
      <v-btn
        @click=""
        size="large"
      >
        View More
      </v-btn>
    </v-row>
  </v-container>

  <!-- Carousell -->
  <div class="bg-grey-lighten-2 py-8 text-center">
    <v-container>
      <h1 class="mb-8">Recommended Properties</h1>
      <ListingCarousell :listings="listingStore.listings"/>
  
      <v-row class="justify-center my-8">
        <v-btn
          @click=""
          size="large"
        >
          View All
        </v-btn>
      </v-row>
    </v-container>
  </div>


</template>

<script setup>
import LandingCoverImg from "../assets/landing-cover.jpg"
import CategoryGrid from "@/components/CategoryGrid.vue"
import { useSnackbarStore } from "../stores/snackbar";
import { useListingStore } from "../stores/listing";
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";
import ListingCarousell from "../components/ListingCarousell.vue";

const searchValue = ref("")
const sbStore = useSnackbarStore()
const listingStore = useListingStore()
const router = useRouter()

onMounted(() => listingStore.setListings())

function handleSearch(){
  if(searchValue.value.trim().length == 0){
    sbStore.display("Please enter a keyword to search")
    return
  }
  router.push("/search" + '?q=' + searchValue.value)
}

</script>

<style scoped>
.coverImg{
  margin-top: -64px;
  max-height: 800px;
}

</style>
