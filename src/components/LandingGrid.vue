<template>
    <v-card
      class="mx-auto"
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
            <v-card>
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
  
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>
  
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
  
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>

<script>
export default {
  data: () => ({
    cards: [
      { title: 'Best Prices in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
      { title: 'Nearest to MRT in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4 },
      { title: 'Best value per square feet in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4 },
      { title: 'Longer Bar', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 8 },
      { title: 'Best Prices in Potong Pasir', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 }
    ],
  }),
}
</script>