<template>
  <v-overlay
      :model-value="isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="Black"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<script setup>
const props = defineProps(["isLoading"])
</script>