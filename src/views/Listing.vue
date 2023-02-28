<template>
    <v-container class="justify-center">
    <v-row justify = "center">
      <v-col 
        v-for="i in [...Array(numOfEntries).keys()]"
        cols="3"
      >
        <DropdownMenu  />
      </v-col>
    </v-row>
  </v-container>
  
  <v-container>
    <v-row justify = "center">
      <v-col
        v-for="i in [...Array(numOfEntries).keys()]"
        cols="3"
      ><SimplifiedCard />
        </v-col>
      </v-row>
  </v-container>

  <v-container class="justify-center">
    <v-row justify = "center">
       <v-col
        cols="9">
        <v-card-item>
          <v-card-title>
            Summary
          </v-card-title>
          <v-divider></v-divider>
        </v-card-item>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row justify = "center">
      <v-col
        v-for="i in [...Array(numOfEntries).keys()]"
        cols="3"
      ><SimplifiedCardDetail />
        </v-col>
      </v-row>
  </v-container>

  <v-row class="justify-center my-8">
      <v-btn
        @click="loadMore()"
        size="large"
      >
        Load More
      </v-btn>
    </v-row>
</template>

<script setup>
import DropdownMenu from "@/components/DropdownMenu.vue"
import SimplifiedCard from "@/components/SimplifiedCard.vue"
import SimplifiedCardDetail from "@/components/SimplifiedCardDetail.vue"
import { ref } from 'vue'

function loadMore() {
  numOfEntries.value += 1
}

const numOfEntries = ref(3)
</script> 

<style>

</style>