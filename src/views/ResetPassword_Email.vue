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
                <v-col align-self="center" class="d-flex flex-column justify-space-between">
                    <div>
                        <div class="text-center">
                            <img width="60" height="60" :src="HomelyHubIconBlue" />
                        </div>
                        <h1 class="text-center">
                            Reset Password
                        </h1>
                        <p class="text-center mt-2">
                            Please key in the email that is  <br/> associated with your account
                        </p>
                        <v-form class="mt-10 px-4 px-sm-8" @submit.prevent="handleResetPassword" :disabled="isLoading">
                            <v-text-field 
                                v-model="email" 
                                variant="outlined" 
                                label="Email"
                                :rules="[emailRule]"
                                />
                            <v-btn color="blue-darken-4" type="submit" block>
                                Send Email
                            </v-btn>
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
const characterToCheck = '@';
const emailRule = (v) => (v && v.indexOf(characterToCheck) !== -1) || 'Please enter a valid email address'

function handleResetPassword(){
    isLoading.value = true
    userStore.resetPassword(email.value).then(() => isLoading.value=false)
}

</script>