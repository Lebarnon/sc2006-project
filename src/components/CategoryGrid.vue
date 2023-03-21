<template>
    <v-sheet
      class="mx-auto bg-transparent"
      max-width="2700"
    >
      <v-container 
        width="2000px"
        fluid
        >
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card :to="'/search/' + '?town=' + card.title">
              <v-img
                :src="card.src"
                class="justify-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                width ="2000px"
                cover
              >
                <v-card-title class="text-white" v-text="card.title"></v-card-title>
              </v-img>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </template>

<script setup>
const cards= [
  { title: 'Sembawang', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
  { title: 'Nearest to MRT in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4 },
  { title: 'Best value per square feet in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4 },
  { title: 'Longer Bar', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 8 },
  { title: 'Best Prices in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 }
]
</script>