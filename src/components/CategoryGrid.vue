<template>
<v-lazy
  :options="{'threshold':0.5}"
  transition="slide-y-reverse-transition"
>
  <v-sheet
    class="mx-auto bg-transparent"
    max-width="1500"
  >
    <v-container 
      fluid
      >
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          cpls="12"
          :sm="card.flex"
        >
        
          <v-hover v-slot="{isHovering, props}">
            <v-card 
            :to="'/search' + '?q=' + card.title"
            :elevation="isHovering ? 12 : 2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            >
              <v-img
                :src="card.src"
                class="justify-center"
                gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
                height="200px"
                cover
              >
                <v-card-title class="text-white" v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</v-lazy>

</template>

<script setup>
import amk from "@/assets/town/amk.jpeg"
import bb from "@/assets/town/bb.jpg"
import bedok from "@/assets/town/bedok.png"
import bishan from "@/assets/town/bishan.png"
import bm from "@/assets/town/bm.jpg"
import { useListingStore } from "../stores/listing"
import { computed } from "@vue/reactivity"

const listingStore = useListingStore()

const commonTowns = listingStore.findCommonTown()
const images = [amk, bedok, bishan, bb, bm]
const cards= computed(() => {
  var townsObj = []
  for(const town of commonTowns){
    townsObj.push({
      title: town,
      src: images[commonTowns.indexOf(town)],
      flex: commonTowns.indexOf(town) == 3 ? 8 : 4
    })
  }
  return townsObj
})
</script>

<style scoped>
  .v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.9;
  }
</style>
