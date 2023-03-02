<template>
  <!-- Search Bar -->
  <v-toolbar 
    flat
    width="300px"
    >
    <v-toolbar-title class="text-grey">
      Title
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

  </v-toolbar>

  <!-- Description -->
  <div
    class="text-center">
    <h1>Properties by Area</h1>
    <p>Lorem ipsum dolor sit amet elit. Molestiae, non! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, excepturi?</p>
  </div>

  <!-- Grid -->
  <v-container class="justify-center">
    <v-row>
      <v-col 
        v-for="i in [...Array(numOfCards).keys()]"
        cols="15"
      >
        <Card  />
      </v-col>
    </v-row>
    <v-row class="justify-center my-8">
      <v-btn
        @click="loadMore()"
        size="large"
      >
        View More
      </v-btn>
    </v-row>
  </v-container>

  <!-- Carousell -->
  <v-container>
    <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="800"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="n in 15"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-card
            :color="isSelected ? 'primary' : 'grey-lighten-1'"
            class="ma-4"
            height="200"
            width="100"
            @click="toggle"
          >
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon
                  v-if="isSelected"
                  color="white"
                  size="48"
                  icon="mdi-close-circle-outline"
                ></v-icon>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <v-btn
        @click="loadMore()"
        size="large"
      >
        View All
      </v-btn>
  </v-container>


</template>

<script setup>
import Card from "@/components/LandingGrid.vue"
import { ref } from 'vue'

const numOfCards = ref(1)

function loadMore() {
  numOfCards.value += 1
}
  
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
})
</script>

<style scoped>


</style>
