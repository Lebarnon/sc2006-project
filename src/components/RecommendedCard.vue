<template>
<v-card
  class="ma-4"
  height="300"
  width="200"
  @click="handleCardSelected"
>
  <v-img
    :src="listing.imageUrls[0]"
    height="300"
    cover
    gradient="to top, rgba(146,146,166,.5), rgba(0,0,0,.01)"
    >
    <div>test</div>
    <div class="mt-auto">test1</div>
  
  </v-img>
    
</v-card>
</template>

<script setup>

const props = defineProps(["listing"])
const emits = defineEmits(["handleCardSelected"])

function handleCardSelected(){
  emits("handleCardSelected")
}

</script>

