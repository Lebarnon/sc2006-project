<template>
  <v-container class="d-flex justify-content-center fill-height">
    <v-sheet class="mx-auto rounded-lg" max-width="1000" width="100%">
      <v-row class="fill-height">
        <v-col cols="6" class="d-none d-sm-flex">
          <v-img :src="RegisterCoverImg" cover height="95vh"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="d-flex text-left align-start text-white rounded-s-lg">
            <div class="mx-6 mt-6">
              <div class="d-flex no-wrap align-center">
                <img
                  width="35"
                  class="logo mr-2"
                  :src="HomelyHubIcon"
                  contain
                  color="white"
                />
                <p class="text-white font-weight-medium logo-text">HomelyHub</p>
              </div>
              <h1 class="mt-6 lower-line-height">
                A few clicks away from creating your account
              </h1>
              <h5 class="mt-4 text-subtitle-1 lower-line-height">
                We would just like to know some information about you!
              </h5>
            </div>
          </v-img>
        </v-col>
        <v-col class="mx-4">
          <h3 class="mt-8">
            Register
          </h3>
          <v-divider theme="dark" length="700"></v-divider>
          <v-form class="mt-6">
            <v-row>
              <v-col>
                <v-text-field 
                  density="comfortable"
                  v-model="userInfo.firstName" 
                  label="First Name"
                  variant="solo"
                  bg-color="blue-grey-lighten-5"
                  :rules="[requiredRule,nameRule]">
                </v-text-field>
              </v-col>
              
              <v-col>
                <v-text-field 
                  density="comfortable"
                  v-model="userInfo.lastName" 
                  label="Last Name"
                  variant="solo"
                  bg-color="blue-grey-lighten-5"
                  :rules="[requiredRule,nameRule]">
                </v-text-field>
              </v-col>
            </v-row>
            <v-text-field 
              density="comfortable"
              v-model="userInfo.email" 
              label="Email"
              variant="solo"
              bg-color="blue-grey-lighten-5"
              :rules="[requiredRule,emailRule]">
            </v-text-field>
            <v-text-field 
              density="comfortable"
              class="mt-2"
              v-model="userInfo.address" 
              label="Address"
              variant="solo"
              bg-color="blue-grey-lighten-5"
              :rules="[requiredRule,addressRule]">
            </v-text-field>
            <v-row class="pa-0 ma-0">
              <v-col class="py-0 pl-0">
                <v-text-field 
                  density="comfortable"
                  v-model="userInfo.phoneNo" 
                  label="Phone Number"
                  variant="solo"
                  bg-color="blue-grey-lighten-5"
                  :rules="[requiredRule,phonenumRule,lengthRule]">
                </v-text-field>
              </v-col>
              <v-col class="py-0 pr-0">
                <v-text-field 
                  density="comfortable"
                  v-model="userInfo.age" 
                  label="Age"
                  variant="solo"
                  bg-color="blue-grey-lighten-5"
                  :rules="[requiredRule,ageRule]">
                </v-text-field>
              </v-col>
            </v-row>  
            <v-row class="pa-0 ma-0" no-gutters>
              <v-col cols="12" md="6" class="pr-1">
                <v-text-field 
                  density="comfortable"
                  :append-icon="show1 ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  v-model="userInfo.password" 
                  label="Password"
                  variant="solo"
                  bg-color="blue-grey-lighten-5"
                  :rules="[requiredRule]"
                  @click:append="show1 = !show1"
                  />
              </v-col>
              <v-col cols="12" md="6" class="pl-1">
                <v-text-field 
                    density="comfortable"
                    :append-icon="show2 ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    v-model="userInfo.confirmPassword" 
                    label="Confirm Password"
                    variant="solo"
                    bg-color="blue-grey-lighten-5"
                    :rules="[requiredRule]"
                    @click:append="show2 = !show2"
                    />
              </v-col>
            </v-row>
          </v-form>
          <v-row class="mt-sm-4 mt-md-8 px-2">
            <v-btn block size="large" color="blue-darken-4" type="submit" :loading="userStore.isLoading"
              :disabled="userStore.isLoading" @click="handleLogin()">
              Create Account
            </v-btn>
          </v-row>
          <div class="text-center my-4 mb-8">
            <p class="text-subtitle-2">
                Already have an account?&nbsp;<router-link class="text-decoration-none text-blue-darken-4" to="/Login">Login</router-link>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/user';
import RegisterCoverImg from "../assets/register-cover.png"
import HomelyHubIcon from '@/assets/homelyHubIcon.png'
import { useSnackbarStore } from '../stores/snackbar';

const sbStore = useSnackbarStore()
const userStore = useUserStore()
const userInfo = ref({
  firstName: null,
  lastName: null,
  email: null,
  address: null,
  phoneNo: null,
  age: null,
  password: null,
  confirmPassword: null
})
const show1 = ref(false)
const show2 = ref(false)

//TODO change to signup
async function handleLogin() {
  if (isEmpty.value){
    sbStore.display('Please fill up all fields', 'red-darken-2')
  } else {
    userStore.signUp(userInfo.value)
  }
}

const requiredRule = (v) => !!v || 'Field is required';
const nameRule = (v) => (v && v.length <=100) || 'Text must be less than 100 characters';
const numberRule = (v) => !isNan(v) || 'Value must be a phone number';
const phonenumRule = (v) => v >= 0 || 'Value must be a valid phone number';
const lengthRule = (v) => v.length >= 8 || 'Please enter a valid phone number';
const addressRule = (v) => (v && v.length<=255) || 'Text must be less than 255 characters';
const ageRule = (v) => v>=0 || 'Value must be a valid age';
const characterToCheck = '@';
const emailRule = (v) => (v && v.indexOf(characterToCheck) !== -1) || 'Please enter a valid email address'

const hasError = computed(() => {
  return error.value.length >0;
});

const error = ref('');
const isEmpty = computed(() => {
  return userInfo.value.firstName === null ||
  userInfo.value.firstName === '' ||
  userInfo.value.lastName === null ||
  userInfo.value.lastName === '' ||
  userInfo.value.email === null ||
  userInfo.value.email === '' ||
  userInfo.value.address === null ||
  userInfo.value.address === '' ||
  userInfo.value.phoneNo === null ||
  userInfo.value.phoneNo === '' ||
  isNaN(parseFloat(userInfo.value.phoneNo)) ||
  userInfo.value.age === null ||
  userInfo.value.age === '' ||
  isNaN(parseFloat(userInfo.value.age)) ||
  userInfo.value.password === null ||
  userInfo.value.password === '' ||
  userInfo.value.confirmPassword === null ||
  userInfo.value.confirmPassword === '';
});

</script>

<style scroped>
.lower-line-height{
  line-height: 1.2;
}
</style>