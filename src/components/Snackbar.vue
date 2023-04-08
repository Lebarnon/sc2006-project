<template>
 <v-snackbar
      v-model="snackbarStore.show"
      :color="snackbarStore.color"
    >
      {{ snackbarStore.message }}

      <template v-slot:actions>
        <v-btn
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