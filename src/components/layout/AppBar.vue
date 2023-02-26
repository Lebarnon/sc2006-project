<template>
  <v-app-bar
    class="px-3"
    color="white"
    flat
  >
    <router-link to="/">
      <img
        class="mx-2 mt-2 logo rounded"
        src="https://picsum.photos/50"
        contain
      />

    </router-link>

    <v-spacer></v-spacer>
    
    <v-btn
      text
      class="text-capitalize"
      v-for="link in links"
      size="large"
    >
      {{ link }}
    </v-btn>
  
    <hr role="separator" aria-orientation="vertical" class="mx-6 my-auto v-divider v-divider--inset v-divider--vertical theme--light" style="height: 16px;">
    <div v-if="!userStore.isAuthenticated">
      <v-btn
        class="text-capitalize"
        size="large"
        :to="'/login'"
      >
        Log In
      </v-btn>
      <v-btn
        class="text-capitalize"
        variant="tonal"
        color="blue-darken-4"
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
      >
        Create Listing
      </v-btn>
      <v-btn
        @click="userStore.signOut()"
      >
        Sign Out
      </v-btn>

    </div>
  </v-app-bar>
</template>

<script setup>
import {useUserStore} from '@/stores/user.js'

const links = ['All','Favourites','Forum']
const userStore = useUserStore()
  
</script>

<style scoped>
.logo{
  max-width: 100px;
}
</style>
