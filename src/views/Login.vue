<template>
  <v-container class="d-flex justify-content-center">
  <v-sheet class="mx-auto" width="1200" height="600">
    <v-row>
      <v-col cols="auto">
        <v-img cover width="600" height="600" src="https://picsum.photos/250"></v-img>
      </v-col>
      <v-col align-self="center">
        <div class="text-center">
          <v-icon size="70" icon="mdi:mdi-home"></v-icon>
        </div>
        <h1 class="text-center">
          Welcome!
        </h1>
        <p class="text-center">
          Lorem ipsum dolor sit amet
        </p>
        <v-form class="mt-10" @submit.prevent :disabled=userStore.isLoading>
          <v-responsive class="mx-auto" max-width="344">
            <v-text-field max-width="500" v-model="email" label="email"></v-text-field>
            <v-text-field v-model="password" label="password"></v-text-field>
            <p class="text-right text-subtitle-2 mt-n2">
                <a href="/resetPassword">Reset Password</a>
            </p>
            <v-btn color="primary" variant="outlined" type="submit" block class="mt-4" :loading="userStore.isLoading"
              :disabled="userStore.isLoading" @click="handleLogin()">
              Login
            </v-btn>
          </v-responsive>
        </v-form>
      </v-col>
    </v-row>
  </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js'

const email = ref("")
const password = ref("")

const userStore = useUserStore()



async function handleLogin() {
  await userStore.signInWithEmail(email.value, password.value)
}


</script>