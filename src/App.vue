<script setup>
import { RouterLink, RouterView } from 'vue-router'

import AppBar from "./components/layout/AppBar.vue";
import Footer from "./components/layout/Footer.vue";

</script>

<template>
  <v-app>
    <AppBar/>
    <v-main class="bg-grey-lighten-3">
      <RouterView/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { RouterLink, RouterView } from 'vue-router'

import AppBar from "./components/layout/AppBar.vue";
import Footer from "./components/layout/Footer.vue";

const userStore = useUserStore()


onMounted(() => {
  userStore.setUser() 
})

</script>

<style scoped>

</style>
