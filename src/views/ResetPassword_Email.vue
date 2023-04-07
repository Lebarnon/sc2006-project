<template>
    <v-container class="d-flex justify-content-center">
        <v-sheet class="mx-auto" width="1000" height="600">
            <v-row>
                <v-col cols="auto">
                    <v-img :src="LoginCoverImg" width="500" height="600" cover
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="coverImg d-flex text-left align-start text-white">
                    </v-img>
                </v-col>
                <v-col align-self="center" class="d-flex flex-column justify-space-between">
                    <div>
                        <div class="text-center">
                            <img width="60" height="60" :src="HomelyHubIconBlue" />
                        </div>
                        <h1 class="text-center">
                            Reset Password
                        </h1>
                        <p class="text-center">
                            Please key in the email that is associated with your account
                        </p>
                        <v-form class="mt-16" @submit.prevent="handleResetPassword" :disabled="isLoading">
                            <v-responsive class="mx-auto" max-width="344">
                                <v-text-field v-model="email" variant="outlined" label="Email"></v-text-field>
                                <v-btn color="blue-darken-4" type="submit" block>
                                    Send Email
                                </v-btn>
                            </v-responsive>
                        </v-form>
                    </div>
                    <div class="text-center mt-4">
                        <router-link class="text-decoration-none" to="/Login">
                            <p class="text-subtitle-2 text-blue-darken-4">
                            Return To Login
                            </p>
                        </router-link>  
                    </div>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js'
import HomelyHubIconBlue from '@/assets/homelyHubIconBlue.png'
import LoginCoverImg from "../assets/login-cover.png"

const email = ref("")
const userStore = useUserStore()
const isLoading = ref(false)

function handleResetPassword(){
    isLoading.value = true
    useUserStore
}

</script>