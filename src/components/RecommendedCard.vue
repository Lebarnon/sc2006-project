<template>
<v-hover v-slot="{isHovering, props}">
  
<v-card
  class="ma-4"
  height="325"
  width="225"
  @click="handleCardSelected"
  :elevation="isHovering ? 12 : 2"
  v-bind="props"
>
  <v-img
    :src="listing.imageUrls[0]"
    height="325"
    cover
    gradient="0deg, rgba(25,25,25,1) 0%, rgba(25,25,25,.8) 10%, rgba(25,25,25,.4) 25%, rgba(146,146,166,0.2) 50%, rgba(146,146,166,0.2) 0%"
    class="d-flex "
    >
    <v-sheet height="325" class="d-flex flex-column justify-space-between bg-transparent">
      <div v-show="isValueBuy" class="ml-2 mt-2 d-flex justify-left">
        <ValueBuyLogo/> 
      </div>
      <div class="my-2 d-flex text-white">
          <v-btn
          class="text-capitalize text-truncate"
          text
          size="small"
          variant="plain"
        >
          <v-icon
            start
            icon="location_on"
            size="x-small"
          ></v-icon>
          <span
          class="text-truncate"
          style="max-width: 150px;"
          
          >
            {{ listing.town }}

          </span>
          </v-btn>
          <v-btn
          class="text-capitalize"
          text
          size="small"
          variant="plain"
        >
          <v-icon
            start
            icon="straighten"
            size="x-small"
          ></v-icon>
          {{ listing.floorSize }}
        </v-btn>
      </div>

    </v-sheet>
          
  </v-img>
</v-card>
</v-hover>

</template>

<script setup>
import ValueBuyLogo from "./ValueBuyLogo.vue"
const props = defineProps(["listing", "isValueBuy"])
const emits = defineEmits(["handleCardSelected"])

function handleCardSelected(){
  emits("handleCardSelected", props.listing.id)
}

</script>



