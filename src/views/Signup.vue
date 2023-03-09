<template>
  <v-container class="d-flex justify-content-center">
    <v-sheet class="mx-auto" width="1200" height="600">
      <v-row>
        <v-col cols="auto">
          <v-img :src="LandingCoverImg" width="350" height="600" cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="coverImg d-flex text-left align-start text-white">
            <div class="ml-4">
              <img width="30" height="30" class="mt-4" :src="HomelyHubIcon" /> Name
              <h1 class="mt-8">
                A few clicks away from creating your (name) account
              </h1>
              <h4 class="mt-4">
                We would just like to know some information about you!
              </h4>
            </div>
          </v-img>
        </v-col>


        <v-col class="ml-4">
          <v-row>
            <h3 class="mt-16">
              Register
            </h3>
            <v-divider theme="dark" length="700"></v-divider>
          </v-row>
          <v-row>


            <v-form class="mt-5" @submit.prevent :disabled=userStore.isLoading>
              <v-responsive class="mx-auto" width="344">

                <v-col cols="auto">

                  <v-text-field v-model="userInfo.firstName" label="First Name"></v-text-field>
                </v-col>
                <v-col cols="auto">
                  <v-text-field v-model="userInfo.lastName" label="Last Name"></v-text-field>
                </v-col>


              </v-responsive>
            </v-form>

          </v-row>
          <v-row>
            <v-btn color="primary" variant="outlined" type="submit" block class="mt-4" :loading="userStore.isLoading"
              :disabled="userStore.isLoading" @click="handleLogin()">
              Create Account
            </v-btn>
          </v-row>

        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import LandingCoverImg from "../assets/landing-cover.jpg"
import HomelyHubIcon from '@/assets/homelyHubIcon.png'

const userStore = useUserStore()
const userInfo = ref({
  firstName: null,
  lastName: null,
  email: null,
  address: null,
  phoneNo: null,
  age: null,
  password: null
  //TODO: add other fields
})

const rules = []
</script>
