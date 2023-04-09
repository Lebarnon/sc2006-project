<template>
  <span :class="`px-2 bg-blue-darken-4 rounded text-caption font-weight-medium ${icon ? ' py-2' : ' py-1'}` ">Value Buy
    <v-icon
      v-if="icon"
      color="red"
      icon="local_fire_department"
      size="x-small"
    ></v-icon>
  </span>
</template>

<script setup>
const props = defineProps(["icon"])
</script>