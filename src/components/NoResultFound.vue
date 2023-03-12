<template>
<v-contianer class="justify-center align-center">
  <v-row>
    <v-img
      :src = "SearchImg"
    ></v-img>
  </v-row>
  <v-row>
    <p class="text-h4"> Sorry! No Result Found :(</p>
  </v-row>
  <v-row>
    <p class="text-subtitle">We couldn't find what you were looking for</p>
  </v-row>
</v-contianer>
</template>

<script setup>
import SearchImg from '@/assets/search-illustration.png'
</script>