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
                        Reset Password
                    </h1>
                    <p class="text-center">
                        Please enter your new password
                    </p>
                    <v-form class="mt-10" @submit.prevent :disabled=userStore.isLoading>
                        <v-responsive class="mx-auto" max-width="344">
                            <v-text-field v-model="password" label="New Password"></v-text-field>
                            <v-text-field v-model="passwordConfirm" label="Confirm Password"></v-text-field>
                            <v-btn color="primary" variant="outlined" type="submit" block class="mt-4">
                                Confirm
                            </v-btn>
                        </v-responsive>
                    </v-form>
                    <p class="d-flex justify-center text-subtitle-2 mt-16">
                        <a href="/Login">Return To Login</a>
                    </p>
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

const password = ref("")
const passwordConfirm = ref("")
const userStore = useUserStore()


</script>