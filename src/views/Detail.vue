<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" v-if="listing != null">
        <DetailCard :data = "listing"/>
      </v-col>
      <p v-else> loading...</p>
    </v-row>
  </v-container>
</template>

<script setup>
import DetailCard from "@/components/DetailCard.vue"
import { onMounted, ref, watch } from "vue";
import router from "../router";
import { useListingStore } from "../stores/listing";
import { useRoute } from 'vue-router'

const listingStore = useListingStore()
const listing = ref(null)
const route = useRoute()
onMounted(() => {
  listingStore.getListingById(route.params.id).then(result => {
    if (result == null) router.push("/error")
    listing.value = result
  })
  
})


</script> 

<style>

</style>