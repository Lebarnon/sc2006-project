<template>
<v-container class="align-center">
  <v-row class="mt-12">
    <v-img
      :src = "SearchImg"
      width="350"
      height="350"
    ></v-img>
  </v-row>
  <v-row class="justify-center mt-6">
    <p class="text-h4 "> Sorry! No Results Found :(</p>
  </v-row>
  <v-row class="justify-center mt-6">
    <p class="text-subtitle">We couldn't find what you were looking for</p>
  </v-row>
  <v-row class="justify-center mt-10">
    <v-btn
      color="blue-darken-4"
      @click="router.go(-1)"
    >
      Go Back
    </v-btn>
  </v-row>
</v-container>
</template>

<script setup>
import SearchImg from '@/assets/search-illustration.png'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>