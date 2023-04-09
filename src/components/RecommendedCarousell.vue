<template>
<v-sheet
  class="mx-auto"
  elevation="8"
  max-width="2000"
>
  <v-slide-group
    class="pa-4"
    center-active
    show-arrows="always"
  >
    <v-slide-group-item
      v-if="isLoading"
      v-for="i in 5"
      :key="i"
    >
      <v-card
        class="ma-4"
        height="325"
        width="225"
      />
    </v-slide-group-item>
    <v-slide-group-item
      v-else
      v-for="listing in listings"
      :key="listing.id"
    >
      <RecommendedCard 
        :listing="listing"
        :is-value-buy="pricingStore.isValueBuy(listing)"
        @handle-card-selected="handleCardSelected"
      />
    </v-slide-group-item>
  </v-slide-group>
</v-sheet>
</template>

<script setup>
import RecommendedCard from './RecommendedCard.vue';
import { useRouter } from 'vue-router';
import { usePricingStore } from '../stores/pricing';

const props = defineProps(["listings", "isLoading"])
const pricingStore = usePricingStore()
const router = useRouter()
function handleCardSelected(id){
  router.push(`/detail/${id}`)
}
</script>