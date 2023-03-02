<template>
  <v-container class="justify-center">
    <v-row>
      <v-col 
        v-for="i in [...Array(numOfCards).keys()]"
        cols="4"
      >
      </v-col>
    </v-row>
    <v-row class="justify-center my-8">
      <v-btn
        @click="loadMore()"
        size="large"
      >
        Load More
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const numOfCards = ref(5)

function loadMore() {
  numOfCards.value += 1
} 
</script>
<style scoped>

</style>
