<template>
    <h1>
        {{ data.name }}
    </h1>
    <v-divider class="my-4"/>
    <Gallery :image-urls="data.imageUrls"/>
    <v-divider/>
    <div class="d-flex align-center mt-4">
        <h1 v-if="!isValueBuy">
            ${{ data.price }}
        </h1>
       <ValueBuyLogo v-show="isValueBuy" :icon="true"/>
       <v-spacer/>
       <v-btn
        class="mr-2"
        color="grey-darken-3"
        v-if="isOwnListing"
        append-icon="edit"
        @click.prevent="onEditClicked"
        >
        Edit
        </v-btn>
        <v-btn
        color="red-darken-1"
        v-if="isOwnListing"
        append-icon="delete"
        @click.prevent="onDeleteClicked()"
        >
        Delete
        </v-btn>
        <div v-else class="d-flex align-center">
            <v-btn
            color="red-darken-4"
            :icon="isFavListing ? 'mdi:mdi-heart' :'mdi:mdi-heart-outline'" 
            size="large"
            variant = "text"
            @click.prevent="onFavouriteClicked"
            />
            <v-sheet class="py-1 px-3 bg-blue-darken-4 rounded">
                <v-icon icon="phone"></v-icon>
                {{data.phoneNo ?? 91234567}}
            </v-sheet>
        </div>
    </div>

    <p>
    <h1 v-if="isValueBuy">
    <div v-if="isValueBuy">
      <span class="text-h4">
        ${{ data.price }}
      </span>
     
    </div>
    </h1>
    </p>

    <v-row>
        <v-col cols="auto">
            <v-icon icon="mdi:mdi-bed">
            </v-icon>
            {{ data.noOfRoom }}
        </v-col>
        <v-col cols="auto">
            <v-icon icon="mdi:mdi-bathtub">
            </v-icon>
            {{ data.noOfToilet }}
        </v-col>

    </v-row>

    <h1 class="mt-10">
        Estimated Price
    </h1>
    <p class="text-h6">
        ${{ data.estimatedPrice }}
    </p>

    <h1 class="mt-10">
        Unit Details
    </h1>

    <v-row>
        <v-col cols="6" sm="4">
            <p>
                Flat Type
            </p>
            <p>
                {{ data.flatType }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col cols="6" sm="4">
            <p>
                Flat Model
            </p>
            <p>
                {{ data.flatModel }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col cols="6" sm="4">
            <p>
                Floor Size
            </p>
            <p>
                {{ data.floorSize }} sq ft
            </p>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="6" sm="4">
            <p>
                Remaining Lease
            </p>
            <p>
                {{ data.remainingLease }} Years
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col cols="6" sm="4">
            <p>
                Lease Commence Date
            </p>
            <p>
                {{ data.leaseCommencementDate }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col cols="6" sm="4">
            <p>
                Storey Range
            </p>
            <p>
                {{ data.storeyRange }}
            </p>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="6" sm="4">
            <p>
                Town
            </p>
            <p>
                {{ data.town }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col cols="6" sm="4">
            <p>
                Street Name
            </p>
            <p>
                {{ data.streetName }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col cols="6" sm="4">
            <p>
                Price Per SqFt
            </p>
            <p>
                {{ (data.price / data.floorSize).toFixed(2) }}
            </p>
            <v-divider></v-divider>
        </v-col>
    </v-row>

    <h1 class="mt-10">
        Description
    </h1>

    <p>
        {{ data.description }}
    </p>

    <h1 class="mt-10">
        Pricing History
    </h1>
</template>
  
<script setup>
import ValueBuyLogo from './ValueBuyLogo.vue';
import { ref, defineProps } from 'vue';
import { useListingStore } from '../stores/listing';
import { useRouter } from 'vue-router';
import Gallery from './Gallery.vue';

const props = defineProps(["data", "isOwnListing", "isValueBuy", "isFavListing"])
const emit = defineEmits(['onFavClicked', 'onEditClicked'])
const isDeleting = ref("false")
const listingStore = useListingStore()
const router = useRouter()

function onDeleteClicked(){
    listingStore.deleteListing(props.data).then(() => {
        router.push("./mylistings")
    })
}
async function onFavouriteClicked() {
  emit('onFavClicked', props.data.id)
}
async function onEditClicked() {
  emit('onEditClicked', props.data.id)
}
</script>

<style scoped>
.invisible{
  visibility: hidden;
}
</style>