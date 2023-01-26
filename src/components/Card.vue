<template>
  <v-card
    :loading="isLoading"
    :to="'/'"
    class="mx-auto"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      src="https://picsum.photos/250"
    ></v-img>

    <v-card-item>
      <v-card-title>HDB House</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Popular Area</span>

        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ 699999
      </div>

      <div>Lorem ipsum dolor sit amet elit. Molestiae, non! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, excepturi?</div>
    </v-card-text>

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

onMounted (()=> {
  setTimeout(() => {
    isLoading.value = false
  }, 1500);
})
  
</script>