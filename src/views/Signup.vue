<template>
    <v-sheet width="300" class="mx-auto">
      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="email"
          label="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Signup</v-btn>
      </v-form>
    </v-sheet>
  </template>

<script setup>
import { ref } from 'vue';

const email = ref("")
const password = ref("")

const rules = []


</script>