<template>
  <v-img
  eager
  height="60vh"
  :src="LandingCoverImg"
  aspect-ratio="16/9"
  cover
  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
  class="coverImg d-flex text-center align-center text-white px-4"
  >
 
  <v-lazy
  :options="{'threshold':0.5}"
  transition="slide-y-reverse-transition">
    <div>
      <h1 class="text-h5 text-sm-h4 mb-3 font-weight-bold font-weight-sm-medium">Find Your Dream Home</h1>
      <p class="text-subtitle-2 text-sm-subtitle-1 font-weight-light">Finding your dream home with our extensive list of resale properties. <br/> </p>
      <p class="d-none d-sm-block"> Start browsing today and find your perfect resale property!</p>    
    </div>
  </v-lazy>
  </v-img>
  <v-lazy
  :options="{'threshold':0.5}"
  transition="slide-y-reverse-transition">
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
    </v-lazy> 
    
    <v-lazy
    :options="{'threshold':0.5}"
    transition="slide-y-reverse-transition"
    >
    <!-- Description -->
    <div
      class="text-center mt-2 mb-2">
      <h1>Properties by Area</h1>
     
    </div>
  </v-lazy>
 
    <!-- Grid -->
    <v-container class="justify-center bg-transparent mb-4">
      <v-row>
        <v-col 
          cols="15"
        >
          <CategoryGrid/>
        </v-col>
      </v-row>

    </v-container>
    <!-- Carousell -->
    <v-lazy
    :min-height="200"
    :options="{'threshold':0.5}"
    transition="fade-transition"
    >
    <div class="bg-grey-lighten-2 py-8 text-center">
      <v-container>
        <h1 class="mb-8">Recommended Properties</h1>
        <ListingCarousell :listings="recommendedListings" :is-loading="isRecommendedLoading"/>
    
        <v-row class="justify-center my-8">
          <v-btn
            :to="'/recommended'"
            class="text-white"
            color="#2C3A61"
            size="large"
          >
            View All
          </v-btn>
        </v-row>
      </v-container>
    </div>
    </v-lazy>


</template>

<script setup>
import LandingCoverImg from "../assets/landing-cover.jpg"
import CategoryGrid from "@/components/CategoryGrid.vue"
import { useSnackbarStore } from "../stores/snackbar";
import { useListingStore } from "../stores/listing";
import { onMounted, ref, computed, onBeforeMount } from 'vue'
import { useRouter } from "vue-router";
import ListingCarousell from "../components/RecommendedCarousell.vue";

const searchValue = ref("")
const sbStore = useSnackbarStore()
const listingStore = useListingStore()
const router = useRouter()
const isRecommendedLoading = ref(true)
const recommendedListings = ref([])

onBeforeMount(() => {
  listingStore.findRecommendedListings().then((result) => {
    recommendedListings.value = result
  })
  isRecommendedLoading.value = false
})

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
