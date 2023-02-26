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

                <v-textarea
                    v-model="listingData.description"
                    label="Description"
                />

                
            </v-form>
        </v-col>
    </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Gallery from '@/components/gallery.vue'


const imageUrls = ref([
    "https://picsum.photos/id/1/400",
    "https://picsum.photos/id/2/400",
    "https://picsum.photos/id/3/400",
    "https://picsum.photos/id/4/400",
    "https://picsum.photos/id/5/400",
    "https://picsum.photos/id/6/400",
    "https://picsum.photos/id/7/400",
])

const listingData = ref({
    name: "",
    flatType: null,
    flatModel: null,
    town: "",
    streetName: "",
    remainingLease: null,
    leaseCommencementDate: null,
    description: "",
    floorSize: null,
    storeyRange: "",
    noOfRoom: null,
    noOfToilet: null,
    price: null,
    imageUrls: []
})

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