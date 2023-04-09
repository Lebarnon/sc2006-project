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
            <v-card :to="'/search' + '?q=' + card.title">
              <v-img
                :src="card.src"
                class="justify-center"
                gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
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
import amk from "@/assets/town/amk.jpeg"
import bb from "@/assets/town/bb.jpg"
import bedok from "@/assets/town/bedok.png"
import bishan from "@/assets/town/bishan.png"
import bm from "@/assets/town/bm.jpg"


const cards= [
  { title: 'Ang Mo Kio', src: amk, flex: 4 },
  { title: 'Bedok', src:bedok, flex: 4 },
  { title: 'Bishan', src: bishan, flex: 4 },
  { title: 'Bukit Batok', src: bb, flex: 8 },
  { title: 'Bukit Merah', src: bm, flex: 4 },
  // { title: 'Bukit Panjang', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
  // { title: 'Bukit Timah', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
  // { title: 'Central Area', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
  // { title: 'Choa Chu Kang', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
  // { title: 'Clementi', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
]
</script>


['Ang Mo Kio', 'Bedok', 'Bishan', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang', 'Bukit Timah', 'Central Area', 'Choa Chu Kang', 'Clementi', 'Geylang', 'Hougang', 'Jurong East', 'Jurong West', 'Kallang/Whampoa', 'Marine Parade', 'Pasir Ris', 'Punggol', 'Queenstown', 'Sembawang', 'Sengkang', 'Serangoon', 'Tampines', 'Toa Payoh', 'Woodlands', 'Yishun']