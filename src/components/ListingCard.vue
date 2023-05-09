<template>
  <v-card
    :to="`/detail/${listing.id}`"
    class="mx-auto"
    max-width="370"
  >
    <v-img
      cover
      height="200"
      :src="listing.imageUrls[0]"
    ></v-img>

    <v-card-item>
      <v-card-title class="py-1 d-flex text-capitalize">
        <span
        class="text-truncate text-capitalize"
        style="max-width: 220px;"
        >
        {{listing.name}} 
        </span>
        <ValueBuyLogo class="ml-2" v-if="isValueBuy" :icon="true"/> 
      </v-card-title>
    </v-card-item>
    
    <v-card-text class="my-2 text-h6 font-weight-bold text-blue-darken-3">
      ${{ listing.price }}
    </v-card-text>

    <div class="d-flex text-grey-darken-2 text-subtitle-2 align-center ml-4 mb-4">
      <span>
        <v-icon
          icon="bed"
          size="small"
        />
        {{ listing.noOfRoom }}
      </span>
      <span class="ml-4">
        <v-icon
          icon="mdi:mdi-bathtub-outline"
          size="small"
        />
        {{ listing.noOfToilet }}
      </span>
      <span class="ml-4">
        <v-icon
          icon="mdi:mdi-arrow-expand-all"
          size="small"
        />
        {{ listing.floorSize }} sqft
      </span>

    </div>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions >
      <v-icon icon="account_circle" color="grey-darken-2" class="mx-1"></v-icon>
      <span  
        class="text-truncate"
        style="max-width: 150px;">
        {{ listing.ownerName ?? "Name" }}
      </span>
      <div class="ml-auto">
        <v-btn
          v-if="isOwnListing"
          icon="edit"
          variant = "text"
          @click.prevent="onEditClicked"
        />
        <v-btn
        v-else
        color="red-darken-4"
        :icon="isFavListing ? 'mdi:mdi-heart' :'mdi:mdi-heart-outline'" 
        variant = "text"
        @click.prevent="onFavouriteClicked"
        />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import ValueBuyLogo from './ValueBuyLogo.vue';
import { useListingStore } from '../stores/listing';

const props = defineProps(['listing', 'isFavListing', 'isOwnListing', 'isValueBuy'])
const emit = defineEmits(['onFavClicked', 'onEditClicked'])

async function onFavouriteClicked() {
  emit('onFavClicked', props.listing.id)
}
async function onEditClicked() {
  emit('onEditClicked', props.listing.id)
}


</script>

<style scoped>
.invisible{
  visibility: hidden;
}
</style>