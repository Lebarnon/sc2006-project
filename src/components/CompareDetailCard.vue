<template>
    <div v-if="listing">
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-calculator-variant-outline" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Estimated Value
              </p>
              <p class="text-center">
                  ${{ listing.price }}
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="straighten" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Size
              </p>
              <p class="text-center">
                  {{ listing.floorSize }} Square Feet
              </p>
              <br/>
              <p class="text-center">
                  Unit Cost
              </p>
              <p class="text-center">
                  ${{ Math.floor(listing.price/listing.floorSize) }}/Sq ft
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-map" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Town
              </p>
              <p class="text-center">
                  {{ listing.town }}
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-sign-direction" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Street Name
              </p>
              <p class="text-center">
                  {{ listing.streetName }}
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-bed-double-outline" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Flat Type
              </p>
              <p class="text-center">
                  {{ listing.noOfRoom }} Rooms
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-home-outline" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Flat Model
              </p>
              <p class="text-center">
                  {{ listing.flatModel }}
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-clock-time-five-outline" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Remaining Lease
              </p>
              <p class="text-center">
                  {{ listing.remainingLease }} Years
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="my-4">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-calendar-blank-outline" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Lease Commence Date
              </p>
              <p class="text-center">
                  {{ listing.leaseCommencementDate }}
              </p>
          </v-card-title>
        </v-card-item>
  
        <v-divider></v-divider>
  
        <v-card-item class="mt-4 mb-8">
          <div style="text-align:center;">
              <v-icon icon="mdi:mdi-stairs" :size="48"></v-icon>
          </div>
          <v-card-title>
              <p class="text-center">
                  Storey Range
              </p>
              <p class="text-center">
                {{ listing.storeyRange }}
              </p>
          </v-card-title>
        </v-card-item>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['listing'])
    
  </script>

  