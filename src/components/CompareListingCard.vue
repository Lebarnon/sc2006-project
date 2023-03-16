<template>
  <div v-if="listing">
    <v-img
    class="mx-auto"
      cover
      aspect-ratio="1/1"
      height="250"
      :src="listing.imageUrls[0]"
    ></v-img>

    <v-card-item>
      <v-card-title>
          <p class="text-center">
            Listed Price
          </p>
          <p class="text-center">
            {{ listing.price }}
          </p>
      </v-card-title>
    </v-card-item>

    <div class="text-center">
      <v-card-item>
      <v-btn 
        :to="'/detail/' + listing.id"
        rounded="pill"
        color="blue-darken-4">
        View Details
      </v-btn>
    </v-card-item>
    </div>
</div>

<div v-else>
  <v-card-item>
      <v-card-title>
          <p class="text-center">
              None Selected
          </p>
      </v-card-title>
    </v-card-item>
</div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['listing'])
const isLoading = ref(true)

  
</script>