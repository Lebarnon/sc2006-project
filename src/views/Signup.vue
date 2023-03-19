<template>
  <v-container class="d-flex justify-content-center">
    <v-sheet class="mx-auto" width="1200" height="750">
      <v-row>
        <v-col cols="auto">
          <v-img :src="RegisterCoverImg" width="350" height="750" cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="coverImg d-flex text-left align-start text-white">
            <div class="ml-4">
              <img width="30" height="30" class="mt-4" :src="HomelyHubIcon" /> Name
              <h1 class="mt-8">
                A few clicks away from creating your account
              </h1>
              <h4 class="mt-4">
                We would just like to know some information about you!
              </h4>
            </div>
          </v-img>
        </v-col>


        <v-col class="ml-4 mr-8">
            <h3 class="mt-8">
              Register
            </h3>
            <v-divider theme="dark" length="700"></v-divider>
       
            <v-form class="mt-6">
              <v-row>
                <v-col>
                  <v-text-field 
                      v-model="userInfo.firstName" 
                      label="First Name"
                      variant="solo"
                      bg-color="#E8E9EB"
                      :rules="[requiredRule,nameRule]">
                  </v-text-field>
                </v-col>
                
                <v-col>
                  <v-text-field 
                      v-model="userInfo.lastName" 
                      label="Last Name"
                      variant="solo"
                      bg-color="#E8E9EB"
                      :rules="[requiredRule,nameRule]">
                  </v-text-field>
                </v-col>
              </v-row>

                <v-text-field 
                    class="mt-6"
                    v-model="userInfo.email" 
                    label="Email"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule,emailRule]">
                </v-text-field>

                <v-text-field 
                    class="mt-6"
                    v-model="userInfo.address" 
                    label="Address"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule,addressRule]">
                </v-text-field>

              <v-row class="mt-6">
                <v-col>
                  <v-text-field 
                      v-model="userInfo.phoneNo" 
                      label="Phone Number"
                      variant="solo"
                      bg-color="#E8E9EB"
                      :rules="[requiredRule,phonenumRule,lengthRule]">
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-text-field 
                      v-model="userInfo.age" 
                      label="Age"
                      variant="solo"
                      bg-color="#E8E9EB"
                      :rules="[requiredRule,ageRule]">
                  </v-text-field>
                </v-col>
              </v-row>  

          
              <v-row class="mt-6">
                <v-col>
                  <v-text-field 
                      v-model="userInfo.password" 
                      label="Password"
                      variant="solo"
                      bg-color="#E8E9EB"
                      :rules="[requiredRule]">
                  </v-text-field>
                </v-col>
                
                <v-col>
                  <v-text-field 
                      v-model="userInfo.confirmPassword" 
                      label="Confirm Password"
                      variant="solo"
                      bg-color="#E8E9EB"
                      :rules="[requiredRule]">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          
          <v-row class="mt-3">
            <v-btn color="primary" variant="outlined" type="submit" block class="mt-4" :loading="userStore.isLoading"
              :disabled="userStore.isLoading" @click="handleLogin()">
              Create Account
            </v-btn>
            <span v-if="hasError">{{ error }}</span>
          </v-row>
          <p class="d-flex justify-center text-subtitle-2 mt-16">
              Already have an account?&nbsp;<a href="/Login">Login</a>
          </p>
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

async function handleLogin() {
  if (isEmpty.value){
    error.value = 'Please fill up all fields';
  } else {
    error.value = "Submitted";
  }
}

const requiredRule = (v) => !!v || 'Field is required';
const nameRule = (v) => (v && v.length <=100) || 'Text must be less than 100 characters';
const numberRule = (v) => !isNan(v) || 'Value must be a phone number';
const phonenumRule = (v) => v >= 0 || 'Value must be a valid phone number';
const lengthRule = (v) => v.length >= 8 || 'Please enter a valid phone number';
const addressRule = (v) => (v && v.length<=255) || 'Text must be less than 255 characters';
const ageRule = (v) => v>=0 || 'Value must be a valid age';




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
