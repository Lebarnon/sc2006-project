<template>
  <v-container class="d-flex justify-content-center fill-height">
    <v-sheet class="mx-auto rounded-lg" max-width="1000" width="100%">
      <v-row no-gutters class="fill-height">
        <v-col class="d-none d-sm-flex" sm="6">
          <v-img :src="LoginCoverImg" height="100%" cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" 
            class="coverImg rounded-s-lg">
          </v-img>
        </v-col>
        <v-col cols="12" sm="6" align-self="center">
          <div class="text-center">
            <img width="60" height="60" :src="HomelyHubIconBlue" />
          </div>
          <h1 class="text-center">
            Welcome!
          </h1>
          <p class="text-center">
            Please key in your details
          </p>
          <v-form class="mt-10 px-4 px-sm-8" @submit.prevent :disabled=userStore.isLoading>
            <v-text-field 
                v-model="email" 
                label="Email"
                variant="solo"
                bg-color="#E8E9EB"
                :rules="[requiredRule]">
                
            </v-text-field>

            <v-text-field 
                v-model="password" 
                label="Password"
                variant="solo"
                bg-color="#E8E9EB"
                type = "password"
                :rules="[requiredRule]">
                
            </v-text-field>
            <router-link to="/resetPassword_Email" class="text-decoration-none">
                <p class="text-right text-subtitle-2 mt-n2 text-blue-darken-4">
                  Reset Password
                </p>
              </router-link>
            
            <v-btn color="blue-darken-4" type="submit" block class="mt-8 text-capitalized" :loading="userStore.isLoading"
              :disabled="userStore.isLoading" @click="handleLogin()">
              Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user.js'
import HomelyHubIconBlue from '@/assets/homelyHubIconBlue.png'
import LoginCoverImg from "../assets/login-cover.png"
import { useSnackbarStore } from '../stores/snackbar';

const email = ref("")
const password = ref("")

const sbStore = useSnackbarStore()
const userStore = useUserStore()

async function handleLogin() {
  if(isEmpty.value){
    sbStore.display("Missing Email or Password!", "red-darken-2")
  } else {
    await userStore.signInWithEmail(email.value, password.value)
  }
}

const requiredRule = (v) => !!v || 'Field is required';
const hasError = computed(() => {
  return error.value.length>0;
});

const error = ref('');
const isEmpty = computed(() => {
  return email.value === null ||
  email.value === '' ||
  password.value === null ||
  password.value === '';
});




</script>