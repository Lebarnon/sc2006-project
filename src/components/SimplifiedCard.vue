<template>
    <v-div>
      <v-img
        cover
        height="250"
        src="https://picsum.photos/250"
      ></v-img>

      <v-card-item>
        <v-card-title>
            <p class="text-center">
                Listed Price
            </p>
            <p class="text-center">
                $700,000
            </p>
        </v-card-title>
      </v-card-item>

      <div class="text-center">
        <v-card-item>
        <v-btn rounded="pill"
            color="primary">
        View Details
        </v-btn>
      </v-card-item>
      </div>
  </v-div>

  <v-div>
    <v-card-item>
        <v-card-title>
            <p class="text-center">
                None Selected
            </p>
        </v-card-title>
      </v-card-item>
  </v-div>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const isLoading = ref(true)

    
  </script>