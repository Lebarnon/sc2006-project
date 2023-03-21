<template>
  <v-container class="d-flex justify-content-center">
    <v-sheet class="mx-auto" width="1200" height="750">
      <v-row>
        <v-col cols="auto">
          <v-img :src="LoginCoverImg" width="600" height="750" cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="coverImg d-flex text-left align-start text-white">
          </v-img>
        </v-col>
        <v-col align-self="center">
          <div class="text-center">
            <img width="60" height="60" :src="HomelyHubIconBlue" />
          </div>
          <h1 class="text-center">
            Welcome!
          </h1>
          <p class="text-center">
            Please key in your details
          </p>
          <v-form class="mt-10" @submit.prevent :disabled=userStore.isLoading>
            <v-responsive class="mx-auto" max-width="344">
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
              <p class="text-right text-subtitle-2 mt-n2">
                <a href="/resetPassword_Email">Reset Password</a>
              </p>
              <p class="text-right text-subtitle-2 mt-2">
                <a href="/resetPassword_Password">To access confirming new password page (temp)</a>
              </p>
              <v-btn color="primary" variant="outlined" type="submit" block class="mt-4" :loading="userStore.isLoading"
                :disabled="userStore.isLoading" @click="handleLogin()">
                Login
              </v-btn>
              <span v-if="hasError">{{ error }}</span>
            </v-responsive>
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

const email = ref("")
const password = ref("")

const userStore = useUserStore()

async function handleLogin() {
  if(isEmpty.value){
    error.value = 'Please fill up all fields'
  } else {
    await userStore.signInWithEmail(email.value, password.value)
    // TODO: handle sign in error
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