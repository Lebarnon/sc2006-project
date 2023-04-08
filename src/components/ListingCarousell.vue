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
      v-for="listing in listings"
      :key="listing.id"
      v-slot="{ isSelected, toggle }"
    >
      <RecommendedCard :is-selected="isSelected" @handle-card-selected="handleCardSelected"/>
    </v-slide-group-item>
  </v-slide-group>
</v-sheet>
</template>

<script setup>
import RecommendedCard from './RecommendedCard.vue';
import { useRouter } from 'vue-router';

const props = defineProps(["listings"])
const router = useRouter()
function handleCardSelected(index){
  router.push(`/details/${props.listings[index].id}`)
}
</script>