<template>
    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-calculator-variant-outline" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Estimated Value
          </p>
          <p class="text-center">
              ${{ data.price }}
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="straighten" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Size
          </p>
          <p class="text-center">
              {{ data.squareFeet }} Square Feet
          </p>
          <br/>
          <p class="text-center">
              Unit Cost
          </p>
          <p class="text-center">
              ${{ data.pricePerSquareFeet }}/Sq ft
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-map" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Town
          </p>
          <p class="text-center">
              {{ data.town }}
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-sign-direction" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Street Name
          </p>
          <p class="text-center">
              {{ data.street }}
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-bed-double-outline" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Flat Type
          </p>
          <p class="text-center">
              {{ data.roomNumber }} Rooms
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-home-outline" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Flat Model
          </p>
          <p class="text-center">
              {{ data.model }}
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-clock-time-five-outline" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Remaining Lease
          </p>
          <p class="text-center">
              {{ data.lease }} Years
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-calendar-blank-outline" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Lease Commence Date
          </p>
          <p class="text-center">
              {{ data.leaseDate }}
          </p>
      </v-card-title>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-item>
      <div style="text-align:center;">
          <v-icon icon="mdi:mdi-stairs" :size="48"></v-icon>
      </div>
      <v-card-title>
          <p class="text-center">
              Storey Range
          </p>
          <p class="text-center">
              {{ data.lowerStoreyRange }} TO {{ data.upperStoreyRange }}
          </p>
      </v-card-title>
    </v-card-item>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true)
const data = ref({
  price: 600000,
  squareFeet: 5000,
  pricePerSquareFeet: 114,
  town: "Chai Chee",
  street: "Chai Chee Avenue",
  roomNumber: 4,
  model: "New Generation",
  lease: 78,
  leaseDate: 2002,
  lowerStoreyRange: 4,
  upperStoreyRange: 6
})

onMounted (()=> {
  setTimeout(() => {
    isLoading.value = false
  }, 1500);
})
  
</script>
