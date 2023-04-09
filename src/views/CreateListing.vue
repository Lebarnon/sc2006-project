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
            <v-form class="mt-6">
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
                <v-autocomplete
                    v-model="listingData.town"
                    label="Town"
                    variant="solo"
                    :items="towns"
                    bg-color="#E8E9EB"
                    hide-no-data
                    :rules="[requiredRule]"
                />
                <v-autocomplete
                    v-model="listingData.streetName"
                    label="Street Name"
                    variant="solo"
                    :items="streets"
                    :disabled="listingData.town == null"
                    bg-color="#E8E9EB"
                    hide-no-data
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
                    year-picker
                    :max-date="new Date()"
                    min-date="1924"
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
                <v-row class="px-4">
                    <p>Estimated Value: ${{ estimatedPrice }} </p>
                    <v-tooltip activator="parent" location="start">
                        <template v-slot:activator="{on}">
                        <v-icon icon="mdi:mdi-help-circle-outline"></v-icon>
                        </template>
                        <span>This is our estimated on the value for this unit.<br/></span>
                        <span>Our estimate is based on: <br/></span> 
                        <span>- Price History, Location, Size, Age, etc </span>
                    </v-tooltip>
                    
                </v-row>
                
                <v-row class="my-8 px-2">
                    <v-btn
                        class="ml-auto"
                        color="blue-darken-4"
                        @click="handleSubmit()"
                        size="large"
                        :loading = isLoading
                    >
                        Create
                    </v-btn>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <div class="d-flex align-center mt-4">
        <h1>Pricing History</h1>
        <v-btn
                class="ml-4"
                @click="handleChart()"
                size="large"
                :loading = updateIsLoading
            >
                Update Prices
        </v-btn>
    </div>
    <PricingGraph class="my-4" :data="chartData"/>
    </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Gallery from '@/components/Gallery.vue'
import { useListingStore } from '../stores/listing';
import { usePricingStore } from '../stores/pricing';
import { useGraphStore } from '../stores/graphStore';
import PricingGraph from "@/components/PricingGraph.vue"
import { useSnackbarStore } from '../stores/snackbar';
const sbStore = useSnackbarStore()
const isLoading = ref(false)
const updateIsLoading = ref(false)

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
    const remainingLease = 99 - (new Date(Date.now()).getFullYear() - newDate)
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
        sbStore.display('Please fill up all fields', 'red-darken-2');
    } else {
        isLoading.value = true  
        await listingStore.createListing(listingData.value)
        isLoading.value = false
    }
    
}

const pricingStore = usePricingStore()
const estimatedPrice = ref(0)
watch(() => {
    const { flatType, flatModel, town, streetName, remainingLease, storeyRange, floorSize, noOfRoom, noOfToilet} = listingData.value
    return [flatType, flatModel, town, streetName, remainingLease, storeyRange, floorSize, noOfRoom, noOfToilet]
}, async (newData, oldData) => {
    estimatedPrice.value = await pricingStore.getEstimatedPrice(listingData.value)
} )

const hasError = computed(() => {
    return error.value.length >0;
});

const chartData = ref(null)
const chart = useGraphStore()
//need some help with this function
async function handleChart(){
    updateIsLoading.value = true  
    chartData.value = await chart.fetchChartData(listingData.value.flatType,listingData.value.town)
    updateIsLoading.value = false
}

const towns = computed(() => Object.keys(townAndStreetInfo) )

const streets = computed(() => townAndStreetInfo[listingData.value.town])

//For Rules
const requiredRule = (v) => !!v || 'Field is required';
const nameRule = (v) => (v && v.length <=100) || 'Text must be less than 100 characters'
const descRule = (v) => (v && v.split(" ").length <=255) || 'Text must be less than 255 words' // TODO: update SRS to reflect words instead of characters
const numberRule = (v) => !isNaN(v) || 'Value must be a number'
const positivenumRule = (v) => v >= 0 || 'Value must be a positive number'

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


// Fixed data
const flatTypes = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE', '1 ROOM',
       'MULTI-GENERATION']

const flatModel = ['Improved', 'New Generation', 'DBSS', 'Standard', 'Apartment',
       'Simplified', 'Model A', 'Premium Apartment', 'Adjoined flat',
       'Model A-Maisonette', 'Maisonette', 'Type S1', 'Type S2',
       'Model A2', 'Terrace', 'Improved-Maisonette', 'Premium Maisonette',
       'Multi Generation', 'Premium Apartment Loft', '2-room', '3Gen']

const storeyRange = ['01 TO 03', '04 TO 06', '07 TO 09', '10 TO 12', '13 TO 15',
       '16 TO 18','19 TO 21', '22 TO 24',  '34 TO 36', '28 TO 30',
       '37 TO 39', '49 TO 51', '25 TO 27', '40 TO 42', '31 TO 33',
       '46 TO 48', '43 TO 45']
const townAndStreetInfo = {"ANG MO KIO": ["ANG MO KIO AVE 10", "ANG MO KIO AVE 4", "ANG MO KIO AVE 5", "ANG MO KIO AVE 1", "ANG MO KIO AVE 3", "ANG MO KIO AVE 9", "ANG MO KIO AVE 8", "ANG MO KIO AVE 6", "ANG MO KIO ST 52", "ANG MO KIO ST 32", "ANG MO KIO ST 31", "ANG MO KIO ST 11", "ANG MO KIO ST 21", "ANG MO KIO AVE 2", "ANG MO KIO ST 61", "ANG MO KIO ST 44", "ANG MO KIO ST 51"], "BEDOK": ["BEDOK NTH AVE 4", "BEDOK NTH AVE 1", "BEDOK NTH RD", "BEDOK STH AVE 1", "BEDOK RESERVOIR RD", "CHAI CHEE ST", "BEDOK NTH ST 3", "BEDOK STH RD", "CHAI CHEE AVE", "NEW UPP CHANGI RD", "CHAI CHEE DR", "BEDOK STH AVE 2", "BEDOK NTH AVE 3", "BEDOK RESERVOIR VIEW", "CHAI CHEE RD", "LENGKONG TIGA", "BEDOK CTRL", "JLN DAMAI", "BEDOK NTH AVE 2", "BEDOK STH AVE 3", "BEDOK NTH ST 2", "BEDOK NTH ST 1", "JLN TENAGA", "BEDOK NTH ST 4", "BEDOK RESERVOIR CRES"], "BISHAN": ["SIN MING RD", "SIN MING AVE", "BISHAN ST 12", "BISHAN ST 13", "BISHAN ST 22", "BISHAN ST 24", "BISHAN ST 23", "BRIGHT HILL DR", "SHUNFU RD", "BISHAN ST 11"], "BUKIT BATOK": ["BT BATOK ST 34", "BT BATOK ST 51", "BT BATOK ST 11", "BT BATOK ST 52", "BT BATOK ST 21", "BT BATOK EAST AVE 5", "BT BATOK WEST AVE 6", "BT BATOK CTRL", "BT BATOK WEST AVE 8", "BT BATOK EAST AVE 4", "BT BATOK ST 31", "BT BATOK ST 25", "BT BATOK EAST AVE 3", "BT BATOK WEST AVE 5", "BT BATOK ST 24", "BT BATOK WEST AVE 4", "BT BATOK WEST AVE 2", "BT BATOK ST 32", "BT BATOK ST 33", "BT BATOK ST 22", "BT BATOK WEST AVE 7", "BT BATOK EAST AVE 6", "BT BATOK WEST AVE 9"], "BUKIT MERAH": ["JLN BT HO SWEE", "TELOK BLANGAH DR", "BEO CRES", "TELOK BLANGAH CRES", "TAMAN HO SWEE", "TELOK BLANGAH RISE", "TELOK BLANGAH WAY", "JLN BT MERAH", "JLN KLINIK", "TELOK BLANGAH HTS", "BT MERAH VIEW", "INDUS RD", "BT MERAH LANE 1", "TELOK BLANGAH ST 31", "MOH GUAN TER", "HAVELOCK RD", "HENDERSON CRES", "BT PURMEI RD", "KIM TIAN RD", "DEPOT RD", "JLN RUMAH TINGGI", "DELTA AVE", "JLN MEMBINA", "REDHILL RD", "LENGKOK BAHRU", "ZION RD", "CANTONMENT CL", "BOON TIONG RD", "SPOTTISWOODE PK RD", "REDHILL CL", "KIM TIAN PL", "HOY FATT RD", "SILAT AVE", "EVERTON PK", "BT MERAH CTRL", "TIONG BAHRU RD", "KIM PONG RD", "KIM CHENG ST", "LOWER DELTA RD", "REDHILL LANE", "LIM LIAK ST", "SENG POH RD", "HENDERSON RD"], "BUKIT PANJANG": ["PETIR RD", "PENDING RD", "BANGKIT RD", "SEGAR RD", "JELAPANG RD", "SENJA RD", "FAJAR RD", "BT PANJANG RING RD", "SENJA LINK", "LOMPANG RD", "GANGSA RD", "CASHEW RD", "JELEBU RD", "SAUJANA RD"], "BUKIT TIMAH": ["TOH YI DR", "FARRER RD", "QUEEN'S RD", "EMPRESS RD"], "CENTRAL AREA": ["JLN KUKOH", "ROWELL RD", "WATERLOO ST", "NEW MKT RD", "TG PAGAR PLAZA", "QUEEN ST", "BAIN ST", "CANTONMENT RD", "CHANDER RD", "KELANTAN RD", "SAGO LANE", "UPP CROSS ST", "CHIN SWEE RD", "SMITH ST", "VEERASAMY RD", "KLANG LANE", "BUFFALO RD", "SELEGIE RD", "JLN BERSEH", "KRETA AYER RD"], "CHOA CHU KANG": ["TECK WHYE LANE", "CHOA CHU KANG AVE 4", "CHOA CHU KANG AVE 3", "CHOA CHU KANG CRES", "CHOA CHU KANG ST 54", "CHOA CHU KANG CTRL", "JLN TECK WHYE", "CHOA CHU KANG ST 62", "CHOA CHU KANG NTH 6", "CHOA CHU KANG DR", "CHOA CHU KANG NTH 5", "CHOA CHU KANG ST 52", "CHOA CHU KANG AVE 2", "TECK WHYE AVE", "CHOA CHU KANG ST 51", "CHOA CHU KANG AVE 5", "CHOA CHU KANG AVE 1", "CHOA CHU KANG ST 64", "CHOA CHU KANG ST 53", "CHOA CHU KANG NTH 7", "CHOA CHU KANG LOOP", "TECK WHYE CRES", "CHOA CHU KANG AVE 7", "KEAT HONG CL", "KEAT HONG LINK"], "CLEMENTI": ["CLEMENTI WEST ST 2", "WEST COAST RD", "CLEMENTI WEST ST 1", "CLEMENTI AVE 4", "CLEMENTI AVE 5", "CLEMENTI ST 11", "CLEMENTI AVE 2", "CLEMENTI AVE 3", "CLEMENTI AVE 1", "C'WEALTH AVE WEST", "WEST COAST DR", "CLEMENTI AVE 6", "CLEMENTI ST 13", "CLEMENTI ST 14", "CLEMENTI ST 12"], "GEYLANG": ["CIRCUIT RD", "BALAM RD", "MACPHERSON LANE", "EUNOS CRES", "UBI AVE 1", "HAIG RD", "OLD AIRPORT RD", "GEYLANG EAST AVE 1", "SIMS DR", "PIPIT RD", "GEYLANG EAST CTRL", "EUNOS RD 5", "CASSIA CRES", "PAYA LEBAR WAY", "ALJUNIED CRES", "JOO CHIAT RD", "PINE CL", "GEYLANG SERAI", "JLN TIGA", "ALJUNIED RD", "SIMS PL", "DAKOTA CRES", "JLN DUA", "SIMS AVE", "ALJUNIED AVE 2", "GEYLANG EAST AVE 2"], "HOUGANG": ["BUANGKOK CRES", "HOUGANG AVE 3", "HOUGANG AVE 8", "HOUGANG AVE 1", "HOUGANG AVE 5", "HOUGANG ST 61", "HOUGANG ST 11", "HOUGANG AVE 7", "HOUGANG AVE 4", "HOUGANG AVE 2", "LOR AH SOO", "HOUGANG ST 92", "HOUGANG ST 52", "HOUGANG AVE 10", "HOUGANG ST 51", "UPP SERANGOON RD", "HOUGANG CTRL", "HOUGANG ST 91", "BUANGKOK LINK", "HOUGANG ST 31", "HOUGANG ST 22", "HOUGANG AVE 9", "HOUGANG AVE 6", "HOUGANG ST 21", "BUANGKOK GREEN", "UPP SERANGOON CRES", "UPP SERANGOON VIEW", "HOUGANG ST 32"], "JURONG EAST": ["PANDAN GDNS", "TEBAN GDNS RD", "JURONG EAST ST 24", "JURONG EAST ST 21", "JURONG EAST AVE 1", "JURONG EAST ST 13", "JURONG EAST ST 32", "TOH GUAN RD", "JURONG EAST ST 31"], "JURONG WEST": ["JURONG WEST ST 93", "BOON LAY AVE", "HO CHING RD", "BOON LAY DR", "TAO CHING RD", "JURONG WEST ST 91", "JURONG WEST ST 42", "JURONG WEST ST 92", "BOON LAY PL", "JURONG WEST ST 52", "JURONG WEST ST 81", "YUNG SHENG RD", "JURONG WEST ST 25", "JURONG WEST ST 73", "JURONG WEST ST 72", "JURONG WEST AVE 3", "JURONG WEST AVE 5", "YUNG HO RD", "JURONG WEST ST 74", "JURONG WEST AVE 1", "JURONG WEST ST 71", "JURONG WEST ST 61", "JURONG WEST ST 65", "TAH CHING RD", "JURONG WEST CTRL 1", "JURONG WEST ST 64", "JURONG WEST ST 62", "JURONG WEST ST 41", "JURONG WEST ST 24", "JURONG WEST ST 75", "KANG CHING RD", "YUNG LOH RD", "YUNG AN RD", "YUAN CHING RD", "CORPORATION DR", "YUNG PING RD", "JURONG WEST ST 51", "YUNG KUANG RD", "JURONG WEST CTRL 3"], "KALLANG/WHAMPOA": ["JLN BATU", "JLN BAHAGIA", "LOR LIMAU", "ST. GEORGE'S RD", "KALLANG BAHRU", "DORSET RD", "GEYLANG BAHRU", "BENDEMEER RD", "WHAMPOA DR", "UPP BOON KENG RD", "RACE COURSE RD", "OWEN RD", "NTH BRIDGE RD", "TOWNER RD", "FARRER PK RD", "MCNAIR RD", "JLN TENTERAM", "BOON KENG RD", "JLN RAJAH", "KG KAYU RD", "CRAWFORD LANE", "WHAMPOA WEST", "BEACH RD", "CAMBRIDGE RD", "ST. GEORGE'S LANE", "JELLICOE RD", "JLN MA'MOR", "WHAMPOA RD", "LOR 3 GEYLANG", "WHAMPOA STH", "TESSENSOHN RD", "JLN DUSUN", "FRENCH RD", "GLOUCESTER RD", "KG ARANG RD", "MOULMEIN RD", "KENT RD", "AH HOOD RD", "KING GEORGE'S AVE"], "MARINE PARADE": ["MARINE DR", "MARINE CRES", "MARINE TER", "MARINE PARADE CTRL"], "PASIR RIS": ["CHANGI VILLAGE RD", "PASIR RIS ST 71", "PASIR RIS ST 11", "PASIR RIS DR 3", "PASIR RIS DR 6", "PASIR RIS ST 21", "PASIR RIS DR 4", "PASIR RIS ST 53", "PASIR RIS DR 10", "PASIR RIS ST 52", "PASIR RIS ST 12", "PASIR RIS ST 51", "PASIR RIS ST 72", "PASIR RIS DR 1", "ELIAS RD", "PASIR RIS ST 13", "PASIR RIS ST 41"], "PUNGGOL": ["PUNGGOL FIELD", "EDGEDALE PLAINS", "PUNGGOL FIELD WALK", "EDGEFIELD PLAINS", "PUNGGOL RD", "PUNGGOL EAST", "PUNGGOL DR", "PUNGGOL CTRL", "PUNGGOL PL", "PUNGGOL WALK", "PUNGGOL WAY", "SUMANG LINK", "SUMANG WALK", "SUMANG LANE"], "QUEENSTOWN": ["C'WEALTH CL", "STIRLING RD", "MEI LING ST", "C'WEALTH CRES", "C'WEALTH DR", "GHIM MOH RD", "DOVER RD", "HOLLAND AVE", "STRATHMORE AVE", "HOLLAND DR", "GHIM MOH LINK", "CLARENCE LANE", "DOVER CRES", "HOLLAND CL", "TANGLIN HALT RD", "C'WEALTH AVE", "QUEEN'S CL", "DOVER CL EAST", "QUEENSWAY", "DAWSON RD"], "SEMBAWANG": ["SEMBAWANG DR", "SEMBAWANG CL", "MONTREAL DR", "ADMIRALTY LINK", "ADMIRALTY DR", "SEMBAWANG CRES", "CANBERRA RD", "WELLINGTON CIRCLE", "CANBERRA LINK", "SEMBAWANG VISTA", "SEMBAWANG WAY", "MONTREAL LINK", "CANBERRA CRES", "CANBERRA ST", "CANBERRA WALK"], "SENGKANG": ["FERNVALE RD", "COMPASSVALE LANE", "ANCHORVALE RD", "RIVERVALE DR", "RIVERVALE CRES", "SENGKANG EAST WAY", "RIVERVALE ST", "RIVERVALE WALK", "FERNVALE LANE", "ANCHORVALE LINK", "COMPASSVALE RD", "COMPASSVALE CRES", "JLN KAYU", "COMPASSVALE WALK", "COMPASSVALE DR", "COMPASSVALE LINK", "COMPASSVALE BOW", "SENGKANG CTRL", "ANCHORVALE LANE", "ANCHORVALE DR", "COMPASSVALE ST", "SENGKANG WEST AVE", "SENGKANG EAST RD", "FERNVALE LINK", "SENGKANG WEST WAY", "SENGKANG EAST AVE", "ANCHORVALE CRES", "ANCHORVALE ST", "FERNVALE ST"], "SERANGOON": ["SERANGOON AVE 4", "LOR LEW LIAN", "SERANGOON AVE 2", "SERANGOON NTH AVE 1", "SERANGOON AVE 1", "SERANGOON CTRL", "SERANGOON NTH AVE 4", "SERANGOON CTRL DR", "SERANGOON AVE 3", "SERANGOON NTH AVE 3", "SERANGOON NTH AVE 2"], "TAMPINES": ["TAMPINES ST 22", "TAMPINES ST 41", "TAMPINES AVE 4", "TAMPINES ST 44", "TAMPINES ST 81", "TAMPINES ST 11", "TAMPINES ST 23", "TAMPINES ST 91", "TAMPINES ST 21", "TAMPINES ST 83", "TAMPINES ST 42", "TAMPINES ST 71", "TAMPINES ST 45", "TAMPINES ST 34", "TAMPINES ST 82", "TAMPINES AVE 9", "SIMEI ST 1", "SIMEI ST 5", "TAMPINES ST 72", "TAMPINES ST 84", "SIMEI ST 2", "TAMPINES CTRL 7", "TAMPINES ST 33", "TAMPINES ST 32", "TAMPINES AVE 5", "TAMPINES AVE 8", "TAMPINES ST 24", "TAMPINES ST 12", "SIMEI LANE", "SIMEI ST 4", "TAMPINES ST 43", "SIMEI RD", "TAMPINES CTRL 1", "TAMPINES AVE 7", "TAMPINES CTRL 8", "TAMPINES AVE 1", "TAMPINES ST 86"], "TOA PAYOH": ["LOR 5 TOA PAYOH", "LOR 7 TOA PAYOH", "LOR 4 TOA PAYOH", "LOR 1 TOA PAYOH", "TOA PAYOH EAST", "POTONG PASIR AVE 1", "TOA PAYOH NTH", "LOR 8 TOA PAYOH", "LOR 3 TOA PAYOH", "POTONG PASIR AVE 3", "JOO SENG RD", "LOR 2 TOA PAYOH", "TOA PAYOH CTRL", "LOR 6 TOA PAYOH", "KIM KEAT LINK", "KIM KEAT AVE", "UPP ALJUNIED LANE", "POTONG PASIR AVE 2", "LOR 1A TOA PAYOH"], "WOODLANDS": ["MARSILING DR", "WOODLANDS ST 13", "WOODLANDS DR 52", "WOODLANDS ST 41", "MARSILING CRES", "WOODLANDS ST 83", "WOODLANDS CIRCLE", "WOODLANDS DR 40", "WOODLANDS ST 31", "WOODLANDS DR 16", "WOODLANDS ST 81", "WOODLANDS RING RD", "WOODLANDS DR 53", "WOODLANDS DR 62", "WOODLANDS DR 70", "WOODLANDS DR 42", "WOODLANDS DR 50", "WOODLANDS AVE 6", "WOODLANDS DR 14", "WOODLANDS AVE 1", "WOODLANDS AVE 5", "MARSILING RISE", "WOODLANDS CRES", "WOODLANDS DR 73", "WOODLANDS DR 44", "MARSILING LANE", "WOODLANDS ST 82", "WOODLANDS DR 60", "WOODLANDS AVE 3", "WOODLANDS DR 75", "WOODLANDS AVE 4", "WOODLANDS ST 32", "WOODLANDS DR 72", "MARSILING RD", "WOODLANDS DR 71", "WOODLANDS AVE 9", "WOODLANDS ST 11", "WOODLANDS RISE"], "YISHUN": ["YISHUN RING RD", "YISHUN AVE 3", "YISHUN ST 11", "YISHUN AVE 4", "YISHUN ST 22", "YISHUN ST 71", "YISHUN AVE 5", "YISHUN ST 21", "YISHUN ST 41", "YISHUN ST 61", "YISHUN AVE 6", "YISHUN AVE 11", "YISHUN CTRL", "YISHUN ST 81", "YISHUN ST 72", "YISHUN AVE 2", "YISHUN AVE 7", "YISHUN AVE 9", "YISHUN ST 20", "YISHUN CTRL 1", "YISHUN ST 31", "YISHUN AVE 1", "YISHUN ST 51"]}
</script>