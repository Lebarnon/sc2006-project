<template>
    <v-sheet width="300" class="mx-auto">
      <v-form validate-on="submit" @submit.prevent="userStore.signUp(userInfo)">
        <v-text-field
          v-model="userInfo.email"
          label="email"
        ></v-text-field>
        <v-text-field
          v-model="userInfo.password"
          label="password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Signup</v-btn>
      </v-form>
    </v-sheet>
  </template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const userInfo = ref({
  email: null,
  password: null
  //TODO: add other fields
})

const rules = []
</script>