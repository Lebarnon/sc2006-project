<template>
  <v-app-bar
    class="px-3"
    color="#2C3A61"
    flat
  >
    <router-link to="/" class="text-decoration-none">
      <div class="d-flex no-wrap align-center">
        <img
          class="logo mr-2"
          :src="HomelyHubIcon"
          contain
          color="white"
        />
        <p class="text-white font-weight-medium logo-text">HomelyHub</p>
      </div>
    </router-link>

    <v-spacer></v-spacer>
    
    <v-btn
      class="text-capitalize"
      v-for="route in routes"
      :to="route.link"
      size="large"
      color="white"
    >
      {{ route.name }}
    </v-btn>
  
    <hr role="separator" aria-orientation="vertical" class="mx-6 my-auto v-divider v-divider--inset v-divider--vertical seperator" style="height: 16px;">
    <div v-if="!userStore.isAuthenticated">
      <v-btn
        color="white"
        variant="outlined"
        class="text-capitalize"
        size="large"
        :to="'/login'"
      >
        Log In
      </v-btn>
      <v-btn
        class="text-capitalize"
        color="blue-lighten-4"
        size="large"
        :to="'/signup'"
        
      >
        Sign Up
      </v-btn>
    </div>
    <div v-else>
      <v-btn 
        class="text-capitalize"
        size="large"
        :to="'/create-listing'"
        color="white"
      >
        Create Listing
      </v-btn>
      <v-btn
        class="text-capitalize"
        size="large"
        @click="userStore.signOut()"
        color="white"
      >
        Sign Out
      </v-btn>

    </div>
  </v-app-bar>
</template>

<script setup>
import {useUserStore} from '@/stores/user.js'
import HomelyHubIcon from '@/assets/homelyHubIcon.png'

const routes = [
  {
    name: 'All',
    link: '/listings'
  },
  {
    name: 'Favourites',
    link: ''
  },
  {
    name: 'Compare',
    link: '/compare'
  },
  {
    name: 'Forum',
    link: ''
  }
]
const userStore = useUserStore()
  
</script>

<style scoped>
.logo{
  max-width: 35px;
}

.logo-text{
  letter-spacing: 2px;
}

.seperator{
  color: white;
}
</style>
