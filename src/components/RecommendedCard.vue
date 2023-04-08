<template>
<v-card
  :color="isSelected ? 'primary' : 'grey-lighten-1'"
  class="ma-4"
  height="200"
  width="120"
  @click="handleCardSelected"
>
  <div class="d-flex fill-height align-center justify-center">
    <v-scale-transition>
      <v-icon
        v-if="isSelected"
        color="white"
        size="48"
        icon="mdi-close-circle-outline"
      ></v-icon>
    </v-scale-transition>
  </div>
</v-card>
</template>

<script setup>

const props = defineProps(["isSelected"])
const emits = defineEmits(["handleCardSelected"])

function handleCardSelected(){
  emits("handleCardSelected")
}

</script>

