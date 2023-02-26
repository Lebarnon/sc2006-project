<template>
  <v-card
    :loading="isLoading"
    :to="'/'"
    class="mx-auto"
    max-width="370"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="200"
      :src="houseData.imageUrl"
    ></v-img>

    <v-card-item>
      <v-card-title>{{houseData.streetName}}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Value Buy</span>

        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="my-4 text-subtitle-1">
        ${{ houseData.price }}
    </v-card-text>

    <v-row>
      <v-col>
      
      </v-col>
    </v-row>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions >
      <v-btn
        variant="text"
        @click=""
      >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true)
const houseData = {
    imageUrl: "https://picsum.photos/200",
    streetName: "33 Chai Chee Avenue, Singapore 461033",
    price: "590693",
    noOfToilets: "4",
    noOfRooms: "5",
    owner: "Jenny Wilson",
    valueBuy: true
  }


onMounted (()=> {
  setTimeout(() => {
    isLoading.value = false
  }, 1500);
})
  
</script>