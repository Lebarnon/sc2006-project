<template>
  <v-card
    :to="`/detail/${listing.id}`"
    class="mx-auto"
    width="370"
  >
    <v-img
      cover
      height="200"
      :src="listing.imageUrls[0]"
    ></v-img>

    <v-card-item>
      <v-card-title>{{listing.streetName}}</v-card-title>
      <div class="d-flex justify-space-between align-center">
        <v-card-subtitle :class="'d-flex ' + isValueBuy ? ' invisible': ''">
          <span class="mr-1">Value Buy</span>
           <v-icon
            color="error"
            icon="whatshot"
            size="small"
          ></v-icon>
        </v-card-subtitle>
        <v-btn
          v-if="isOwnListing"
          icon="edit"
          size="large"
          variant = "text"
          @click.prevent="onEditClicked"
        >

        </v-btn>
        <v-btn
        v-else
        color="red-darken-4"
        :icon="isFavListing ? 'mdi:mdi-heart' :'mdi:mdi-heart-outline'" 
        size="large"
        variant = "text"
        @click.prevent="onFavouriteClicked"
        />
      </div>
    </v-card-item>
    
    <v-card-text class="my-4 text-subtitle-1">
      ${{ listing.price }}
    </v-card-text>
    
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
    

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