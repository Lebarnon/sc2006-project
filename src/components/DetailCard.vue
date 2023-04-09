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
       <v-sheet :class="'py-1 px-3 bg-blue-darken-4 rounded ' + isValueBuy ? '': 'invisible'" >
           <v-icon
               color="red"
               icon="whatshot"
               size="small"
           ></v-icon>
           <span>
             Value Buy
           </span>
       </v-sheet>
       <v-spacer/>
        <v-btn
            class="mr-2"
            v-if="isOwnListing"
            append-icon="edit"
            size="large"
            variant = "text"
            @click.prevent="onEditClicked"
            >
            Edit
        </v-btn>
        <v-btn
            v-else
            color="red-darken-4"
            :icon="isFavListing ? 'mdi:mdi-heart' :'mdi:mdi-heart-outline'" 
            size="large"
            variant = "text"
            @click.prevent="onFavouriteClicked"
        />
        <v-sheet class="py-1 px-3 bg-blue-darken-4 rounded">
            <v-icon icon="phone"></v-icon>
            9123 4567
        </v-sheet>
        </div>

    <p>
    <h1 v-if="isValueBuy">
        ${{ data.price }}
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
        Unit Details
    </h1>


    <v-row>
        <v-col>
            <p>
                Flat Type
            </p>
            <p>
                {{ data.flatType }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Flat Model
            </p>
            <p>
                {{ data.flatModel }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Floor Size
            </p>
            <p>
                {{ data.floorSize }} sq ft
            </p>
            <v-divider></v-divider>
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <p>
                Remaining Lease
            </p>
            <p>
                {{ data.remainingLease }} Years
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Lease Commence Date
            </p>
            <p>
                {{ data.leaseCommencementDate }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Storey Range
            </p>
            <p>
                {{ data.storeyRange }}
            </p>
            <v-divider></v-divider>
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <p>
                Town
            </p>
            <p>
                {{ data.town }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Street Name
            </p>
            <p>
                {{ data.streetName }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
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
        <!-- TODO: insert pricing history graph here -->
    </h1>
</template>
  
<script setup>
import { ref, defineProps } from 'vue';
import Gallery from './Gallery.vue';

const props = defineProps(["data", "isOwnListing", "isValueBuy", "isFavListing"])
const emit = defineEmits(['onFavClicked', 'onEditClicked'])

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