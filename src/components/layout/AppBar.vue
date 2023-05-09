<template>

  <v-app-bar
    class=""
    :color="isLanding && !drawer ? '#2C3A61' + opacity : '#2C3A61'"
    flat
    dense="false"
  >
    <v-app-bar-nav-icon 
      variant="text"
      class="d-lg-none" 
      color="white" 
      @click.stop="drawer = !drawer"/>

    <router-link to="/" class="text-decoration-none ml-2">
      <div class="d-flex no-wrap align-center">
        <img
          class="logo mx-2"
          :src="HomelyHubIcon"
          contain
          color="white"
        />
        <p class="text-white font-weight-medium logo-text">HomelyHub</p>
      </div>
    </router-link>

    <v-spacer></v-spacer>
    <div class="d-none d-lg-flex" >
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
    </div>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    class="px-1"
    color="#2C3A61"
    theme="dark"
    temporary
  >
    <v-list>
      <v-list-item v-for="route in routes" :prepend-icon="route.icon" :title="route.name" :to="route.link"></v-list-item>
      <v-list-item v-if="userStore.isAuthenticated" prepend-icon="add_circle" title="Create Listing" :to="'/create-listing'"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <div v-if="!userStore.isAuthenticated">
          <v-btn
            class="text-capitalize"
            block
            size="large"
            :to="'/login'"
          >
            Log In
          </v-btn>
          <v-btn
            class="text-capitalize mt-2"
            color="white"
            block
            size="large"
            :to="'/signup'"
          >
            Sign Up
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            class="text-capitalize"
            block
            size="large"
            @click="userStore.signOut()"
          >
            Sign Out
          </v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import {useUserStore} from '@/stores/user.js'
import HomelyHubIcon from '@/assets/homelyHubIcon.png'
import { ref } from 'vue';

defineProps({
  isLanding: {
    type: Boolean,
    default: false
  },
  opacity: {
    type: String,
    default: "00"
  }
})
const drawer = ref(false)
const routes = [
  {
    name: 'Recommended',
    link: '/recommended',
    icon: 'recommend'
  }, 
  {
    name: 'All',
    link: '/listings',
    icon: 'grid_view'
  },
  {
    name: 'Favourites',
    link: '/favourites',
    icon: 'favorite'
  },
  {
    name: 'Compare',
    link: '/compare',
    icon: 'compare'
  },
  {
    name: 'My Listings',
    link: '/mylistings',
    icon: 'list_alt'
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
