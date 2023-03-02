<template>
 <v-snackbar
      v-model="snackbarStore.show"
    >
      {{ snackbarStore.message }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import {useSnackbarStore} from "@/stores/snackbar.js"
const snackbarStore = useSnackbarStore()
</script>