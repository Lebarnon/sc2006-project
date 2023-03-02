<template>
    <div class="text-left">
        <p>
        <h1>
            {{ data.address }}
        </h1>
        </p>
    </div>

    <v-img cover width="2000" height="500" src="https://picsum.photos/250"></v-img>


    <v-row class="mt-1">
        <v-col cols="8">
            <v-card width="200" variant="tonal" color="#2F58CD">
                <h2 class="text-center">
                    Value Buy <v-icon icon="mdi:mdi-fire"></v-icon>
                </h2>
            </v-card>
        </v-col>
        <v-col cols="auto">
            <h2>
                Favourite it!
            </h2>
        </v-col>
        <v-col class="mt-n1">
            <v-btn icon="mdi:mdi-heart" color="primary"></v-btn>
        </v-col>
        <v-col class="mt-n2" cols="auto">
            <v-btn rounded="pill" size="x-large" color="primary">
                <v-icon icon="mdi:mdi-phone"></v-icon>
                9123 4567
            </v-btn>
        </v-col>
    </v-row>

    <p>
    <h1>
        ${{ data.price }}
    </h1>
    </p>


    <v-row>

        <v-col cols="auto">
            <v-icon icon="mdi:mdi-bed">
            </v-icon>
            {{ data.bed }}
        </v-col>
        <v-col cols="auto">
            <v-icon icon="mdi:mdi-bathtub">
            </v-icon>
            {{ data.bathtub }}
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
                {{ data.flatType }} Room
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Flat Model
            </p>
            <p>
                Model {{ data.flatModel }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Floor Size
            </p>
            <p>
                {{ data.squareFeet }}
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
                {{ data.lease }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Lease Commence Date
            </p>
            <p>
                {{ data.leaseDate }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Storey Range
            </p>
            <p>
                {{ data.lowerStoreyRange }} TO {{ data.upperStoreyRange }}
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
                {{ data.street }}
            </p>
            <v-divider></v-divider>
        </v-col>

        <v-col>
            <p>
                Price Per SqFt
            </p>
            <p>
                {{ data.pricePerSquareFeet }}
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
import { ref, onMounted } from 'vue';

const isLoading = ref(true)

const data = ref({
    address: "13 Novena Terrace, Singapore 307909",
    price: 590693,
    bed: 4,
    bathtub: 4,
    description: "Lorem ipsum dolor sit amet",
    flatType: 4,
    flatModel: "A",
    squareFeet: 5000,
    lease: 78,
    leaseDate: 2002,
    lowerStoreyRange: 4,
    upperStoreyRange: 6,
    town: "Chai Chee",
    street: "Chai Chee Avenue",
    pricePerSquareFeet: 114,

})

</script>