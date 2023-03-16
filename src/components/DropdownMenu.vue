<template>
    <div class="text-center">
      <v-select 
        v-model="selected"
        :items="locations"
        label="Select From Your Favourites"
        @update:modelValue="onFavouriteSelected"
      ></v-select>  
    </div>
</template>

<script setup>
import { ref } from 'vue';

  const emit = defineEmits(['onFavouriteSelected'])
  const props = defineProps(['locations'])

  const selected = ref("")

  function onFavouriteSelected(value) {
    emit("onFavouriteSelected", value)
  }
</script> 