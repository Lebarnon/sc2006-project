<template>
    <v-container>
    <v-row>
        <v-col
            cols="6"
        >
            <Gallery :imageUrls = "imageUrls"/>
        </v-col>
        <v-col
            cols="6"
        >
            <v-form>
                <v-text-field
                    v-model="listingData.name"
                    label="Name of Listing"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule, nameRule]"
                />
                <p>About the Listing</p>
                <v-select 
                    v-model="listingData.flatType"
                    :items="flatTypes"
                    label="Flat Type"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule]"
                />
                <v-select 
                    v-model="listingData.flatModel"
                    :items = "flatModel"
                    label="Flat Model"
                    variant="solo"
                    bg-color="#E8E9EB"
                    required 
                />
                <v-text-field
                    v-model="listingData.town"
                    label="Town"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule]"
                />
                <v-text-field
                    v-model="listingData.streetName"
                    label="Street Name"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule]"
                />
                <v-text-field
                    v-model="listingData.remainingLease"
                    label="Remaining Lease"
                    disabled
                    variant="solo"
                    bg-color="#E8E9EB"
                />

                <VueDatePicker
                    class="mb-6"
                    label="Lease Commencement Date"
                    v-model="listingData.leaseCommencementDate"
                    placeholder="Lease Commencement Date"
                    :disabled-dates="disabledDates"
                ></VueDatePicker>

                <v-file-input
                    label="Add Images"
                    variant="filled"
                    prepend-icon="mdi:mdi-camera"
                    v-model="listingData.imageFiles"
                    multiple
                ></v-file-input>

                <v-textarea
                    v-model="listingData.description"
                    label="Description"
                    variant="solo"
                    bg-color="#E8E9EB"
                    :rules="[requiredRule,descRule]"
                />
                <v-row class="my-0">
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-text-field
                            v-model="listingData.floorSize"
                            label="Floor Size"
                            suffix="SQFT"
                            variant="solo"
                            bg-color="#E8E9EB"
                            :rules="[requiredRule,numberRule,positivenumRule]"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-select 
                            v-model="listingData.storeyRange"
                            :items="storeyRange"
                            label="Storey Range"
                            variant="solo"
                            bg-color="#E8E9EB"
                        />
                    </v-col>
                </v-row>
                <v-row class="my-0">
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-text-field
                            v-model="listingData.noOfRoom"
                            label="No. of Bedroom"
                            variant="solo"
                            bg-color="#E8E9EB"
                            :rules="[requiredRule,numberRule,positivenumRule]"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-text-field
                            v-model="listingData.noOfToilet"
                            label="No. of Toilet"
                            variant="solo"
                            bg-color="#E8E9EB"
                            :rules="[requiredRule,numberRule,positivenumRule]"
                        />
                    </v-col>
                </v-row>
                <v-text-field
                    v-model="listingData.price"
                    label="Price of Listing"
                    variant="solo"
                    bg-color="#E8E9EB"
                    prefix="S$"
                    :rules="[requiredRule,numberRule,positivenumRule]"
                />
                <!-- TODO: add help icon and functionality -->
                <v-row>
                    <p>Estimated Value: ${{ estimatedPrice }} </p>
                    <v-tooltip activator="parent" location="start">
                        <template v-slot:activator="{on}">
                    <v-icon icon="mdi:mdi-help-circle-outline"></v-icon>
                    </template>
                    <span>This is our estimated on the value for this unit</span>
                    <br>
                    <span>Our estimated is based on: Price History, Location, Size, Age, etc.</span>
                    </v-tooltip>
                </v-row>
                
                <v-row class="my-8">
                    <span v-if="hasError">{{ error }}</span>
                    <v-btn
                        class="ml-auto"
                        @click="handleSubmit()"
                        size="large"
                        :loading = isLoading
                    >
                        submit
                    </v-btn>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Gallery from '@/components/gallery.vue'
import { useListingStore } from '../stores/listing';
import { list } from '@firebase/storage';



const isLoading = ref(false)

const listingData = ref({
    name: null,
    flatType: null,
    flatModel: null,
    town: null,
    streetName: null,
    remainingLease: null,
    leaseCommencementDate: null,
    description: null,
    floorSize: null,
    storeyRange: null,
    noOfRoom: null,
    noOfToilet: null,
    price: null,
    imageFiles: []
})

watch(() => listingData.value.leaseCommencementDate, (newDate, _) =>{
    const remainingLease = 99 - (new Date(Date.now()).getFullYear() - new Date(newDate).getFullYear())
    listingData.value.remainingLease = remainingLease
})

const imageUrls = computed(() => {
    var imageUrls = []
    for(var imageFile of listingData.value.imageFiles){
        imageUrls.push(URL.createObjectURL(imageFile))
    }
    return imageUrls
})




const listingStore = useListingStore()
async function handleSubmit(){
    if (isEmpty.value) {
        error.value = 'Please fill up all fields';
    } else {
        error.value = 'Submitted';
        //isLoading.value = true  
        //await listingStore.createListing(listingData.value)
        //isLoading.value = false
    }
    
}




const hasError = computed(() => {
    return error.value.length >0;
});

// TODO: get estimated price from database
const estimatedPrice = ref(696969)

// TODO: Add dropdown options
const flatTypes = [
    "1 Room",
    "2 Room",
    "3 Room",
    "4 Room",
    "5 Room",
    "Executive",
    "Multi Generation"
]
const flatModel = [
    "2 Room",
    "Apartment",
    "Improved",
    "Improved Maisonette",
    "Maisonette",
    "Model A",
    "Model A-Maisonette",
    "Multi Generation",
    "New Generation",
    "Premium Apartment",
    "Simplified",
    "Standard",
    "Terrace"
]

const storeyRange = [
    "1 to 3",
    "4 to 6",
    "7 to 9",
    "10 to 13",
    "14 to 16",
    "16 to 18",
    "19 to 21",
    "22 to 24",
    "25 to 27"
]


//For Rules
const text = ref('')
const requiredRule = (v) => !!v || 'Field is required';
const nameRule = (v) => (v && v.length <=100) || 'Text must be less than 100 characters'
const descRule = (v) => (v && v.length <=255) || 'Text must be less than 255 characters'
const numberRule = (v) => !isNaN(v) || 'Value must be a number'
const positivenumRule = (v) => v >= 0 || 'Value must be a positive number'

const disabledDates = (date) => {
    const day=date.getDay();
    const today=new Date();
    return day === 0 || day === 8 || date > today;
}

//For validation
const error = ref('');
const isEmpty = computed(() => {
    return listingData.value.name === null ||
    listingData.value.name === '' || 
    listingData.value.flatType === null ||
    listingData.value.flatType === '' || 
    listingData.value.flatModel === null ||
    listingData.value.flatModel === '' ||
    listingData.value.town === null ||
    listingData.value.town === '' ||
    listingData.value.streetName === null ||
    listingData.value.streetName === '' ||
    listingData.value.leaseCommencementDate === null ||
    listingData.value.imageFiles.length === 0 ||
    listingData.value.description === null ||
    listingData.value.description === '' ||
    listingData.value.floorSize === null ||
    listingData.value.floorSize === '' ||
    isNaN(parseFloat(listingData.value.floorSize)) ||
    listingData.value.storeyRange === null ||
    listingData.value.noOfRoom === null ||
    listingData.value.noOfRoom === '' ||
    isNaN(parseFloat(listingData.value.noOfRoom)) ||
    listingData.value.noOfToilet === null ||
    listingData.value.noOfToilet === '' ||
    isNaN(parseFloat(listingData.value.noOfToilet)) ||
    listingData.value.price === null ||
    listingData.value.price === '' ||
    isNaN(parseFloat(listingData.value.price));
});

</script>