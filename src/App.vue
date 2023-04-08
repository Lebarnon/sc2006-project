<template>
  <v-app v-if="listingStore.isLoading == false">
    <AppBar :isLanding="isLanding" :opacity="opacity"/>
    <v-main class="bg-grey-lighten-3">
      <RouterView/>
      <Snackbar />
    </v-main>
    <Footer/>
  </v-app>
</template>

<script setup>
import { onBeforeMount, onMounted,onBeforeUnmount, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import LoadingOverlay from './components/LoadingOverlay.vue';
import AppBar from "./components/layout/AppBar.vue";
import Footer from "./components/layout/Footer.vue";
import Snackbar from "./components/Snackbar.vue"
import { useRoute } from 'vue-router';
import {useUserStore} from './stores/user.js'
import { useListingStore } from './stores/listing';

const listingStore = useListingStore()
const route = useRoute()
const isLanding = ref(false)
const opacity = ref("00")

watch(() => route.path, (newpath, _) => {
  isLanding.value = route.path == '/'
})

onMounted(() => {
  listingStore.setListings()
  isLanding.value = route.path == '/'
  window.addEventListener("scroll", onScroll)
})
onBeforeUnmount(() => {
  
  window.removeEventListener("scroll", onScroll)
})

function onScroll(e) {
  if(window.scrollY > 400) {
    opacity.value = ""
    return
  }
  opacity.value =  Math.round(window.scrollY/4).toString().substring(0,2)
  if(opacity.value.length == 1)
  opacity.value = "0" + opacity.value

}

</script>

<style scoped>

</style>
