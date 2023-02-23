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
      {{ link}}
    </v-btn>
  
    <hr role="separator" aria-orientation="vertical" class="mx-6 my-auto v-divider v-divider--inset v-divider--vertical theme--light" style="height: 16px;">
    
    <v-btn
      text
      class="text-capitalize"
      size="large"
    >
      Log In
    </v-btn>
    <v-btn
      class="text-capitalize"
      variant="tonal"
      color="blue-darken-4"
      size="large"
    >
      Sign Up
    </v-btn>
  </v-app-bar>
</template>

<script setup>

const links = ['Home','Recommended','Properties','Favourites','Compare Properties']

  
</script>

<style scoped>
.logo{
  max-width: 100px;
}
</style>
