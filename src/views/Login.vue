<template>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent :disabled = userStore.isLoading>
        <v-text-field
          v-model="email"
          label="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
        ></v-text-field>
        <v-btn 
            type="submit" 
            block 
            class="mt-2"
            :loading="userStore.isLoading"
            :disabled="userStore.isLoading"
            @click = "handleLogin()"
        >
        Login
        </v-btn>
       
      </v-form>
    </v-sheet>
  </template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from '@/stores/user.js'

const email = ref("")
const password = ref("")

const userStore = useUserStore()



async function handleLogin(){
    await userStore.signInWithEmail(email.value, password.value)
}


</script>