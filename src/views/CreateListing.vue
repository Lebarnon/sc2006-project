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
                />
                <p>About the Listing</p>
                <v-select 
                    v-model="listingData.flatType"
                    :items="flatTypes"
                    label="Flat Type"
                />
                <v-select 
                    v-model="listingData.flatModel"
                    :items = "flatModels"
                    label="Flat Model"
                />
                <v-text-field
                    v-model="listingData.town"
                    label="Town"
                />
                <v-text-field
                    v-model="listingData.streetName"
                    label="Street Name"
                />
                <v-text-field
                    v-model="listingData.remainingLease"
                    label="Remaining Lease"
                    disabled
                />

                <VueDatePicker
                    class="mb-6"
                    label="Lease Commencement Date"
                    v-model="listingData.leaseCommencementDate"
                ></VueDatePicker>

                <v-file-input
                    label="Add Images"
                    variant="filled"
                    prepend-icon="mdi-camera"
                    v-model="listingData.imageFiles"
                    multiple
                ></v-file-input>

                <v-textarea
                    v-model="listingData.description"
                    label="Description"
                />
                <v-row class="my-0">
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-text-field
                            v-model="listingData.floorSize"
                            label="Floor Size"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-text-field
                            v-model="listingData.storeyRange"
                            label="Storey Range"
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
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="my-0 py-0"
                    >
                        <v-text-field
                            v-model="listingData.noOfToilet"
                            label="No. of Toilet"
                        />
                    </v-col>
                </v-row>
                <v-text-field
                    v-model="listingData.price"
                    label="Price of Listing"
                />
                <!-- TODO: add help icon and functionality -->
                <v-row>
                    <p>Estimated Value: ${{ estimatedPrice }} </p>
                </v-row>
                <v-row class="my-8">
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
import { ref, computed } from 'vue';
import Gallery from '@/components/gallery.vue'
import { useListingStore } from '../stores/listing';

const isLoading = ref(false)

const listingData = ref({
    name: "",
    flatType: null,
    flatModel: null,
    town: "",
    streetName: "",
    remainingLease: null,
    leaseCommencementDate: "",
    description: "",
    floorSize: null,
    storeyRange: "",
    noOfRoom: null,
    noOfToilet: null,
    price: null,
    imageFiles: []
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
    isLoading.value = true  
    await listingStore.createListing(listingData.value)
    isLoading.value = false
}

// TODO: get estimated price from database
const estimatedPrice = ref(696969)

// TODO: Add dropdown options
const flatTypes = [
    "2 Room",
    "3 Room",
    "4 Room",
    "5 Room",
]
const flatModel = [
    "Model A"
]

</script>