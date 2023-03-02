<template>
    <v-container class="justify-center">
    <v-row justify = "center">
      <v-col
        v-for="i in [...Array(numOfEntries).keys()]"
        cols="3"
        :key = "i"
      >
        <DropdownMenu @on-favourite-selected="(e) => handleFavouriteSelected(e, i)" />
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row justify = "center">
      <v-col 
        v-for="i in [...Array(numOfEntries).keys()]"
        cols="3"
        :key="i"
      >
        <!-- suppose to pass this information to simplified card but showing this as an example now -->
        <!-- <SimplifiedCard /> -->
        <p class="text-center">{{ selectedListings[i] ?? "None Selected"}}</p>  
      </v-col>
    </v-row>
  </v-container>

  <v-row justify = "center">
      <v-col
      cols="9">
        <v-card-title>
          Summary
        </v-card-title>
        <v-divider/>
    </v-col>
  </v-row>

  <v-container>
    <v-row justify = "center">
      <v-col
        v-for="i in [...Array(numOfEntries).keys()]"
        cols="3"
        :key = "i"
      >
      <!-- TODO: pass the listing details into simplifiedCardDetail so for eg: <SimplifiedCardDetail :listing="selectedListing[i]" -->
        <!-- ofcus u must code simplifiedcarddetail to receive the data thats passed to it. -->
      <SimplifiedCardDetail />
        </v-col>
      </v-row>
  </v-container>

</template>

<script setup>
import DropdownMenu from "@/components/DropdownMenu.vue"
import SimplifiedCard from "@/components/SimplifiedCard.vue"
import SimplifiedCardDetail from "@/components/SimplifiedCardDetail.vue"
import { ref } from 'vue'

const numOfEntries = ref(3)

const selectedListings = ref([
  null,
  null,
  null
])

//e contains the payload, index is for which column
function handleFavouriteSelected(e, index) {
  console.log("handleFavouriteSelected Fired", e, index)
  // TODO: get listing object from listingStore
  // TODO: update selectedListings

  // this is a placeholder for now
  selectedListings.value[index] = e
}
const data = ref({
  showListing: false
})


</script> 

<style>

</style>