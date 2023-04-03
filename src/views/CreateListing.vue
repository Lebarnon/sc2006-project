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
                    <v-btn
                        class="ml-auto"
                        @click="handleRefresh()"
                        size="large"
                        :loading = isLoading
                    >
                        Refresh
                    </v-btn>
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
                <!-- <v-row class="my-8">
                    <v-btn
                        class="ml-auto"
                        @click="handleGenerateData()"
                        size="large"
                        :loading = isLoading
                    >
                        Generate Data
                    </v-btn>
                </v-row> -->
            </v-form>
        </v-col>
    </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Gallery from '@/components/gallery.vue'
import { useListingStore } from '../stores/listing';
import { usePricingStore } from '../stores/pricing';

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
        error.value = 'Please fill up all fields';
    } else {
        isLoading.value = true  
        await listingStore.createListing(listingData.value)
        isLoading.value = false
    }
    
}

async function handleGenerateData(){
    var flatTypeInd = Math.floor(Math.random() * flatTypes.length)
    var flatModelInd = Math.floor(Math.random() * flatModel.length)
    var storeyRangeInd = Math.floor(Math.random() * storeyRange.length)
    var townsInd = Math.floor(Math.random() * towns.length)
    var streetsInd = Math.floor(Math.random() * streets.length)
    var price = Math.floor(Math.random() * 250000) + 500000
    var leaseCommencementDate = Math.floor(Math.random() * 50) + 1950
    var remainingLease = 99 - (new Date(Date.now()).getFullYear() - leaseCommencementDate)
    var numOfRoom = Math.floor(Math.random() * 3) + 3
    var floorSize = Math.floor(Math.random() * 10 + numOfRoom * 20 + 25)

    var randomListingData = {
        name: streets[streetsInd],
        flatType: flatTypes[flatTypeInd],
        flatModel: flatModel[flatModelInd],
        town: towns[townsInd],
        streetName: streets[streetsInd],
        remainingLease: remainingLease,
        leaseCommencementDate: leaseCommencementDate,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        floorSize: floorSize,
        storeyRange: storeyRange[storeyRangeInd],
        noOfRoom: numOfRoom,
        noOfToilet: numOfRoom,
        price: price,
        imageFiles: listingData.value.imageFiles
    }
    isLoading.value = true  
    // await listingStore.createListing(randomListingData)
    // console.log(randomListingData)
    isLoading.value = false
}
const estimatedPrice = ref(0)
const pricingStore = usePricingStore()
async function handleRefresh(){
    isLoading.value = true  
    estimatedPrice.value = await pricingStore.getEstimatedPrice(listingData.value)
    isLoading.value = false
}



const hasError = computed(() => {
    return error.value.length >0;
});

// TODO: get estimated price from database

// TODO: Add dropdown options
const flatTypes = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE', '1 ROOM',
       'MULTI-GENERATION']

const flatModel = ['Improved', 'New Generation', 'DBSS', 'Standard', 'Apartment',
       'Simplified', 'Model A', 'Premium Apartment', 'Adjoined flat',
       'Model A-Maisonette', 'Maisonette', 'Type S1', 'Type S2',
       'Model A2', 'Terrace', 'Improved-Maisonette', 'Premium Maisonette',
       'Multi Generation', 'Premium Apartment Loft', '2-room', '3Gen']

const storeyRange = ['10 TO 12', '01 TO 03', '04 TO 06', '07 TO 09', '13 TO 15',
       '19 TO 21', '22 TO 24', '16 TO 18', '34 TO 36', '28 TO 30',
       '37 TO 39', '49 TO 51', '25 TO 27', '40 TO 42', '31 TO 33',
       '46 TO 48', '43 TO 45']

const town = ['ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH',
       'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG',
       'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST',
       'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL',
       'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES',
       'TOA PAYOH', 'WOODLANDS', 'YISHUN']


const streetName = ['ANG MO KIO AVE 10', 'ANG MO KIO AVE 4', 'ANG MO KIO AVE 5',
       'ANG MO KIO AVE 1', 'ANG MO KIO AVE 3', 'ANG MO KIO AVE 9',
       'ANG MO KIO AVE 8', 'ANG MO KIO AVE 6', 'ANG MO KIO ST 52',
       'BEDOK NTH AVE 4', 'BEDOK NTH AVE 1', 'BEDOK NTH RD',
       'BEDOK STH AVE 1', 'BEDOK RESERVOIR RD', 'CHAI CHEE ST',
       'BEDOK NTH ST 3', 'BEDOK STH RD', 'CHAI CHEE AVE',
       'NEW UPP CHANGI RD', 'CHAI CHEE DR', 'BEDOK STH AVE 2',
       'BEDOK NTH AVE 3', 'BEDOK RESERVOIR VIEW', 'CHAI CHEE RD',
       'LENGKONG TIGA', 'BEDOK CTRL', 'JLN DAMAI', 'BEDOK NTH AVE 2',
       'BEDOK STH AVE 3', 'SIN MING RD', 'SIN MING AVE', 'BISHAN ST 12',
       'BISHAN ST 13', 'BISHAN ST 22', 'BISHAN ST 24', 'BISHAN ST 23',
       'BRIGHT HILL DR', 'SHUNFU RD', 'BT BATOK ST 34', 'BT BATOK ST 51',
       'BT BATOK ST 11', 'BT BATOK ST 52', 'BT BATOK ST 21',
       'BT BATOK EAST AVE 5', 'BT BATOK WEST AVE 6', 'BT BATOK CTRL',
       'BT BATOK WEST AVE 8', 'BT BATOK EAST AVE 4', 'BT BATOK ST 31',
       'BT BATOK ST 25', 'BT BATOK EAST AVE 3', 'BT BATOK WEST AVE 5',
       'BT BATOK ST 24', 'JLN BT HO SWEE', 'TELOK BLANGAH DR', 'BEO CRES',
       'TELOK BLANGAH CRES', 'TAMAN HO SWEE', 'TELOK BLANGAH RISE',
       'TELOK BLANGAH WAY', 'JLN BT MERAH', 'JLN KLINIK',
       'TELOK BLANGAH HTS', 'BT MERAH VIEW', 'INDUS RD',
       'BT MERAH LANE 1', 'TELOK BLANGAH ST 31', 'MOH GUAN TER',
       'HAVELOCK RD', 'HENDERSON CRES', 'BT PURMEI RD', 'KIM TIAN RD',
       'DEPOT RD', 'JLN RUMAH TINGGI', 'DELTA AVE', 'JLN MEMBINA',
       'REDHILL RD', 'LENGKOK BAHRU', 'ZION RD', 'PETIR RD', 'PENDING RD',
       'BANGKIT RD', 'SEGAR RD', 'JELAPANG RD', 'SENJA RD', 'FAJAR RD',
       'BT PANJANG RING RD', 'SENJA LINK', 'LOMPANG RD', 'GANGSA RD',
       'TOH YI DR', 'FARRER RD', 'JLN KUKOH', 'ROWELL RD', 'WATERLOO ST',
       'NEW MKT RD', 'TG PAGAR PLAZA', 'QUEEN ST', 'BAIN ST',
       'CANTONMENT RD', 'TECK WHYE LANE', 'CHOA CHU KANG AVE 4',
       'CHOA CHU KANG AVE 3', 'CHOA CHU KANG CRES', 'CHOA CHU KANG ST 54',
       'CHOA CHU KANG CTRL', 'JLN TECK WHYE', 'CHOA CHU KANG ST 62',
       'CHOA CHU KANG NTH 6', 'CHOA CHU KANG DR', 'CHOA CHU KANG NTH 5',
       'CHOA CHU KANG ST 52', 'CHOA CHU KANG AVE 2', 'CLEMENTI WEST ST 2',
       'WEST COAST RD', 'CLEMENTI WEST ST 1', 'CLEMENTI AVE 4',
       'CLEMENTI AVE 5', 'CLEMENTI ST 11', 'CLEMENTI AVE 2',
       'CLEMENTI AVE 3', 'CLEMENTI AVE 1', "C'WEALTH AVE WEST",
       'CIRCUIT RD', 'BALAM RD', 'MACPHERSON LANE', 'EUNOS CRES',
       'UBI AVE 1', 'HAIG RD', 'OLD AIRPORT RD', 'GEYLANG EAST AVE 1',
       'SIMS DR', 'PIPIT RD', 'GEYLANG EAST CTRL', 'EUNOS RD 5',
       'CASSIA CRES', 'BUANGKOK CRES', 'HOUGANG AVE 3', 'HOUGANG AVE 8',
       'HOUGANG AVE 1', 'HOUGANG AVE 5', 'HOUGANG ST 61', 'HOUGANG ST 11',
       'HOUGANG AVE 7', 'HOUGANG AVE 4', 'HOUGANG AVE 2', 'LOR AH SOO',
       'HOUGANG ST 92', 'HOUGANG ST 52', 'HOUGANG AVE 10',
       'HOUGANG ST 51', 'UPP SERANGOON RD', 'HOUGANG CTRL',
       'HOUGANG ST 91', 'BUANGKOK LINK', 'HOUGANG ST 31', 'PANDAN GDNS',
       'TEBAN GDNS RD', 'JURONG EAST ST 24', 'JURONG EAST ST 21',
       'JURONG EAST AVE 1', 'JURONG EAST ST 13', 'JURONG EAST ST 32',
       'TOH GUAN RD', 'JURONG WEST ST 93', 'BOON LAY AVE', 'HO CHING RD',
       'BOON LAY DR', 'TAO CHING RD', 'JURONG WEST ST 91',
       'JURONG WEST ST 42', 'JURONG WEST ST 92', 'BOON LAY PL',
       'JURONG WEST ST 52', 'JURONG WEST ST 81', 'YUNG SHENG RD',
       'JURONG WEST ST 25', 'JURONG WEST ST 73', 'JURONG WEST ST 72',
       'JURONG WEST AVE 3', 'JURONG WEST AVE 5', 'YUNG HO RD',
       'JURONG WEST ST 74', 'JURONG WEST AVE 1', 'JURONG WEST ST 71',
       'JURONG WEST ST 61', 'JURONG WEST ST 65', 'TAH CHING RD',
       'JURONG WEST CTRL 1', 'JURONG WEST ST 64', 'JURONG WEST ST 62',
       'JURONG WEST ST 41', 'JURONG WEST ST 24', 'JLN BATU',
       'JLN BAHAGIA', 'LOR LIMAU', "ST. GEORGE'S RD", 'KALLANG BAHRU',
       'DORSET RD', 'GEYLANG BAHRU', 'BENDEMEER RD', 'WHAMPOA DR',
       'UPP BOON KENG RD', 'RACE COURSE RD', 'OWEN RD', 'NTH BRIDGE RD',
       'TOWNER RD', 'FARRER PK RD', 'MCNAIR RD', 'JLN TENTERAM',
       'BOON KENG RD', 'JLN RAJAH', 'MARINE DR', 'MARINE CRES',
       'MARINE TER', 'CHANGI VILLAGE RD', 'PASIR RIS ST 71',
       'PASIR RIS ST 11', 'PASIR RIS DR 3', 'PASIR RIS DR 6',
       'PASIR RIS ST 21', 'PASIR RIS DR 4', 'PASIR RIS ST 53',
       'PASIR RIS DR 10', 'PASIR RIS ST 52', 'PASIR RIS ST 12',
       'PASIR RIS ST 51', 'PASIR RIS ST 72', 'PASIR RIS DR 1',
       'PUNGGOL FIELD', 'EDGEDALE PLAINS', 'PUNGGOL FIELD WALK',
       'EDGEFIELD PLAINS', 'PUNGGOL RD', 'PUNGGOL EAST', 'PUNGGOL DR',
       'PUNGGOL CTRL', 'PUNGGOL PL', "C'WEALTH CL", 'STIRLING RD',
       'MEI LING ST', "C'WEALTH CRES", "C'WEALTH DR", 'GHIM MOH RD',
       'DOVER RD', 'HOLLAND AVE', 'STRATHMORE AVE', 'HOLLAND DR',
       'GHIM MOH LINK', 'CLARENCE LANE', 'DOVER CRES', 'SEMBAWANG DR',
       'SEMBAWANG CL', 'MONTREAL DR', 'ADMIRALTY LINK', 'ADMIRALTY DR',
       'SEMBAWANG CRES', 'CANBERRA RD', 'FERNVALE RD', 'COMPASSVALE LANE',
       'ANCHORVALE RD', 'RIVERVALE DR', 'RIVERVALE CRES',
       'SENGKANG EAST WAY', 'RIVERVALE ST', 'RIVERVALE WALK',
       'FERNVALE LANE', 'ANCHORVALE LINK', 'COMPASSVALE RD',
       'COMPASSVALE CRES', 'JLN KAYU', 'COMPASSVALE WALK',
       'COMPASSVALE DR', 'COMPASSVALE LINK', 'COMPASSVALE BOW',
       'SENGKANG CTRL', 'ANCHORVALE LANE', 'ANCHORVALE DR',
       'COMPASSVALE ST', 'SERANGOON AVE 4', 'LOR LEW LIAN',
       'SERANGOON AVE 2', 'SERANGOON NTH AVE 1', 'SERANGOON AVE 1',
       'SERANGOON CTRL', 'SERANGOON NTH AVE 4', 'TAMPINES ST 22',
       'TAMPINES ST 41', 'TAMPINES AVE 4', 'TAMPINES ST 44',
       'TAMPINES ST 81', 'TAMPINES ST 11', 'TAMPINES ST 23',
       'TAMPINES ST 91', 'TAMPINES ST 21', 'TAMPINES ST 83',
       'TAMPINES ST 42', 'TAMPINES ST 71', 'TAMPINES ST 45',
       'TAMPINES ST 34', 'TAMPINES ST 82', 'TAMPINES AVE 9', 'SIMEI ST 1',
       'SIMEI ST 5', 'TAMPINES ST 72', 'TAMPINES ST 84', 'SIMEI ST 2',
       'TAMPINES CTRL 7', 'TAMPINES ST 33', 'TAMPINES ST 32',
       'TAMPINES AVE 5', 'LOR 5 TOA PAYOH', 'LOR 7 TOA PAYOH',
       'LOR 4 TOA PAYOH', 'LOR 1 TOA PAYOH', 'TOA PAYOH EAST',
       'POTONG PASIR AVE 1', 'TOA PAYOH NTH', 'LOR 8 TOA PAYOH',
       'LOR 3 TOA PAYOH', 'POTONG PASIR AVE 3', 'JOO SENG RD',
       'LOR 2 TOA PAYOH', 'TOA PAYOH CTRL', 'MARSILING DR',
       'WOODLANDS ST 13', 'WOODLANDS DR 52', 'WOODLANDS ST 41',
       'MARSILING CRES', 'WOODLANDS ST 83', 'WOODLANDS CIRCLE',
       'WOODLANDS DR 40', 'WOODLANDS ST 31', 'WOODLANDS DR 16',
       'WOODLANDS ST 81', 'WOODLANDS RING RD', 'WOODLANDS DR 53',
       'WOODLANDS DR 62', 'WOODLANDS DR 70', 'WOODLANDS DR 42',
       'WOODLANDS DR 50', 'WOODLANDS AVE 6', 'WOODLANDS DR 14',
       'WOODLANDS AVE 1', 'WOODLANDS AVE 5', 'MARSILING RISE',
       'WOODLANDS CRES', 'WOODLANDS DR 73', 'WOODLANDS DR 44',
       'YISHUN RING RD', 'YISHUN AVE 3', 'YISHUN ST 11', 'YISHUN AVE 4',
       'YISHUN ST 22', 'YISHUN ST 71', 'YISHUN AVE 5', 'YISHUN ST 21',
       'YISHUN ST 41', 'YISHUN ST 61', 'YISHUN AVE 6', 'YISHUN AVE 11',
       'YISHUN CTRL', 'YISHUN ST 81', 'YISHUN ST 72', 'YISHUN AVE 2',
       'ANG MO KIO ST 32', 'ANG MO KIO ST 31', 'BEDOK NTH ST 2',
       'BEDOK NTH ST 1', 'JLN TENAGA', 'BEDOK NTH ST 4',
       'BT BATOK WEST AVE 4', 'CANTONMENT CL', 'BOON TIONG RD',
       'SPOTTISWOODE PK RD', 'REDHILL CL', 'KIM TIAN PL', 'CASHEW RD',
       "QUEEN'S RD", 'CHANDER RD', 'KELANTAN RD', 'SAGO LANE',
       'UPP CROSS ST', 'CHIN SWEE RD', 'SMITH ST', 'TECK WHYE AVE',
       'CHOA CHU KANG ST 51', 'CHOA CHU KANG AVE 5',
       'CHOA CHU KANG AVE 1', 'WEST COAST DR', 'PAYA LEBAR WAY',
       'ALJUNIED CRES', 'JOO CHIAT RD', 'PINE CL', 'HOUGANG ST 22',
       'HOUGANG AVE 9', 'HOUGANG AVE 6', 'HOUGANG ST 21',
       'JURONG WEST ST 75', 'KANG CHING RD', 'KG KAYU RD',
       'CRAWFORD LANE', 'WHAMPOA WEST', 'BEACH RD', 'CAMBRIDGE RD',
       "ST. GEORGE'S LANE", 'JELLICOE RD', 'ELIAS RD', 'HOLLAND CL',
       'TANGLIN HALT RD', "C'WEALTH AVE", 'WELLINGTON CIRCLE',
       'CANBERRA LINK', 'SENGKANG WEST AVE', 'SENGKANG EAST RD',
       'SERANGOON CTRL DR', 'SERANGOON AVE 3', 'SERANGOON NTH AVE 3',
       'TAMPINES AVE 8', 'TAMPINES ST 24', 'TAMPINES ST 12', 'SIMEI LANE',
       'SIMEI ST 4', 'LOR 6 TOA PAYOH', 'KIM KEAT LINK', 'MARSILING LANE',
       'WOODLANDS ST 82', 'WOODLANDS DR 60', 'WOODLANDS AVE 3',
       'WOODLANDS DR 75', 'WOODLANDS AVE 4', 'WOODLANDS ST 32',
       'YISHUN AVE 7', 'ANG MO KIO ST 11', 'BISHAN ST 11',
       'BT BATOK WEST AVE 2', 'BT BATOK ST 32', 'BT BATOK ST 33',
       'BT BATOK ST 22', 'BT BATOK WEST AVE 7', 'HOY FATT RD',
       'SILAT AVE', 'EVERTON PK', 'BT MERAH CTRL', 'JELEBU RD',
       'EMPRESS RD', 'VEERASAMY RD', 'CHOA CHU KANG ST 64',
       'CHOA CHU KANG ST 53', 'CHOA CHU KANG NTH 7', 'CLEMENTI AVE 6',
       'CLEMENTI ST 13', 'GEYLANG SERAI', 'JLN TIGA', 'ALJUNIED RD',
       'YUNG LOH RD', 'YUNG AN RD', "JLN MA'MOR", 'WHAMPOA RD',
       'LOR 3 GEYLANG', 'PASIR RIS ST 13', "QUEEN'S CL", 'DOVER CL EAST',
       'SEMBAWANG VISTA', 'TAMPINES ST 43', 'SIMEI RD', 'KIM KEAT AVE',
       'UPP ALJUNIED LANE', 'POTONG PASIR AVE 2', 'WOODLANDS DR 72',
       'MARSILING RD', 'WOODLANDS DR 71', 'YISHUN AVE 9', 'YISHUN ST 20',
       'ANG MO KIO ST 21', 'TIONG BAHRU RD', 'KLANG LANE',
       'CHOA CHU KANG LOOP', 'CLEMENTI ST 14', 'SIMS PL',
       'JURONG EAST ST 31', 'YUAN CHING RD', 'CORPORATION DR',
       'YUNG PING RD', 'WHAMPOA STH', 'TESSENSOHN RD', 'JLN DUSUN',
       'QUEENSWAY', 'FERNVALE LINK', 'KIM PONG RD', 'KIM CHENG ST',
       'SAUJANA RD', 'BUFFALO RD', 'CLEMENTI ST 12', 'DAKOTA CRES',
       'JURONG WEST ST 51', 'FRENCH RD', 'GLOUCESTER RD', 'KG ARANG RD',
       'MOULMEIN RD', 'KENT RD', 'AH HOOD RD', 'SERANGOON NTH AVE 2',
       'TAMPINES CTRL 1', 'TAMPINES AVE 7', 'LOR 1A TOA PAYOH',
       'WOODLANDS AVE 9', 'YISHUN CTRL 1', 'LOWER DELTA RD', 'JLN DUA',
       'WOODLANDS ST 11', 'ANG MO KIO AVE 2', 'SELEGIE RD', 'SIMS AVE',
       'REDHILL LANE', "KING GEORGE'S AVE", 'PASIR RIS ST 41',
       'PUNGGOL WALK', 'LIM LIAK ST', 'JLN BERSEH', 'SENGKANG WEST WAY',
       'BUANGKOK GREEN', 'SEMBAWANG WAY', 'PUNGGOL WAY', 'YISHUN ST 31',
       'TECK WHYE CRES', 'KRETA AYER RD', 'MONTREAL LINK',
       'UPP SERANGOON CRES', 'SUMANG LINK', 'SENGKANG EAST AVE',
       'YISHUN AVE 1', 'ANCHORVALE CRES', 'YUNG KUANG RD',
       'ANCHORVALE ST', 'TAMPINES CTRL 8', 'YISHUN ST 51',
       'UPP SERANGOON VIEW', 'TAMPINES AVE 1', 'BEDOK RESERVOIR CRES',
       'ANG MO KIO ST 61', 'DAWSON RD', 'FERNVALE ST', 'SENG POH RD',
       'HOUGANG ST 32', 'TAMPINES ST 86', 'HENDERSON RD', 'SUMANG WALK',
       'CHOA CHU KANG AVE 7', 'KEAT HONG CL', 'JURONG WEST CTRL 3',
       'KEAT HONG LINK', 'ALJUNIED AVE 2', 'SUMANG LANE', 'CANBERRA CRES',
       'CANBERRA ST', 'ANG MO KIO ST 44', 'WOODLANDS RISE',
       'CANBERRA WALK', 'ANG MO KIO ST 51', 'GEYLANG EAST AVE 2',
       'BT BATOK EAST AVE 6', 'BT BATOK WEST AVE 9', 'MARINE PARADE CTRL']




const towns = ['Ang Mo Kio', 'Bedok', 'Bishan', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang', 'Bukit Timah', 'Central Area', 'Choa Chu Kang', 'Clementi', 'Geylang', 'Hougang', 'Jurong East', 'Jurong West', 'Kallang/Whampoa', 'Marine Parade', 'Pasir Ris', 'Punggol', 'Queenstown', 'Sembawang', 'Sengkang', 'Serangoon', 'Tampines', 'Toa Payoh', 'Woodlands', 'Yishun']


const streets = ['Ang Mo Kio Ave 10', 'Ang Mo Kio Ave 4', 'Ang Mo Kio Ave 5', 'Ang Mo Kio Ave 1', 'Ang Mo Kio Ave 3', 'Ang Mo Kio Ave 9', 'Ang Mo Kio Ave 8', 'Ang Mo Kio Ave 6', 'Ang Mo Kio St 52', 'Bedok Nth Ave 4', 'Bedok Nth Ave 1', 'Bedok Nth Rd', 'Bedok Sth Ave 1', 'Bedok Reservoir Rd', 'Chai Chee St', 'Bedok Nth St 3', 'Bedok Sth Rd', 'Chai Chee Ave', 'New Upp Changi Rd', 'Chai Chee Dr', 'Bedok Sth Ave 2', 'Bedok Nth Ave 3', 'Bedok Reservoir View', 'Chai Chee Rd', 'Lengkong Tiga', 'Bedok Ctrl', 'Jln Damai', 'Bedok Nth Ave 2', 'Bedok Sth Ave 3', 'Sin Ming Rd', 'Sin Ming Ave', 'Bishan St 12', 'Bishan St 13', 'Bishan St 22', 'Bishan St 24', 'Bishan St 23', 'Bright Hill Dr', 'Shunfu Rd', 'Bt Batok St 34', 'Bt Batok St 51', 'Bt Batok St 11', 'Bt Batok St 52', 'Bt Batok St 21', 'Bt Batok East Ave 5', 'Bt Batok West Ave 6', 'Bt Batok Ctrl', 'Bt Batok West Ave 8', 'Bt Batok East Ave 4', 'Bt Batok St 31', 'Bt Batok St 25', 'Bt Batok East Ave 3', 'Bt Batok West Ave 5', 'Bt Batok St 24', 'Jln Bt Ho Swee', 'Telok Blangah Dr', 'Beo Cres', 'Telok Blangah Cres', 'Taman Ho Swee', 'Telok Blangah Rise', 'Telok Blangah Way', 'Jln Bt Merah', 'Jln Klinik', 'Telok Blangah Hts', 'Bt Merah View', 'Indus Rd', 'Bt Merah Lane 1', 'Telok Blangah St 31', 'Moh Guan Ter', 'Havelock Rd', 'Henderson Cres', 'Bt Purmei Rd', 'Kim Tian Rd', 'Depot Rd', 'Jln Rumah Tinggi', 'Delta Ave', 'Jln Membina', 'Redhill Rd', 'Lengkok Bahru', 'Zion Rd', 'Petir Rd', 'Pending Rd', 'Bangkit Rd', 'Segar Rd', 'Jelapang Rd', 'Senja Rd', 'Fajar Rd', 'Bt Panjang Ring Rd', 'Senja Link', 'Lompang Rd', 'Gangsa Rd', 'Toh Yi Dr', 'Farrer Rd', 'Jln Kukoh', 'Rowell Rd', 'Waterloo St', 'New Mkt Rd', 'Tg Pagar Plaza', 'Queen St', 'Bain St', 'Cantonment Rd', 'Teck Whye Lane', 'Choa Chu Kang Ave 4', 'Choa Chu Kang Ave 3', 'Choa Chu Kang Cres', 'Choa Chu Kang St 54', 'Choa Chu Kang Ctrl', 'Jln Teck Whye', 'Choa Chu Kang St 62', 'Choa Chu Kang Nth 6', 'Choa Chu Kang Dr', 'Choa Chu Kang Nth 5', 'Choa Chu Kang St 52', 'Choa Chu Kang Ave 2', 'Clementi West St 2', 'West Coast Rd', 'Clementi West St 1', 'Clementi Ave 4', 'Clementi Ave 5', 'Clementi St 11', 'Clementi Ave 2', 'Clementi Ave 3', 'Clementi Ave 1', '"C', 'Wealth Ave West"', 'Circuit Rd', 'Balam Rd', 'Macpherson Lane', 'Eunos Cres', 'Ubi Ave 1', 'Haig Rd', 'Old Airport Rd', 'Geylang East Ave 1', 'Sims Dr', 'Pipit Rd', 'Geylang East Ctrl', 'Eunos Rd 5', 'Cassia Cres', 'Buangkok Cres', 'Hougang Ave 3', 'Hougang Ave 8', 'Hougang Ave 1', 'Hougang Ave 5', 'Hougang St 61', 'Hougang St 11', 'Hougang Ave 7', 'Hougang Ave 4', 'Hougang Ave 2', 'Lor Ah Soo', 'Hougang St 92', 'Hougang St 52', 'Hougang Ave 10', 'Hougang St 51', 'Upp Serangoon Rd', 'Hougang Ctrl', 'Hougang St 91', 'Buangkok Link', 'Hougang St 31', 'Pandan Gdns', 'Teban Gdns Rd', 'Jurong East St 24', 'Jurong East St 21', 'Jurong East Ave 1', 'Jurong East St 13', 'Jurong East St 32', 'Toh Guan Rd', 'Jurong West St 93', 'Boon Lay Ave', 'Ho Ching Rd', 'Boon Lay Dr', 'Tao Ching Rd', 'Jurong West St 91', 'Jurong West St 42', 'Jurong West St 92', 'Boon Lay Pl', 'Jurong West St 52', 'Jurong West St 81', 'Yung Sheng Rd', 'Jurong West St 25', 'Jurong West St 73', 'Jurong West St 72', 'Jurong West Ave 3', 'Jurong West Ave 5', 'Yung Ho Rd', 'Jurong West St 74', 'Jurong West Ave 1', 'Jurong West St 71', 'Jurong West St 61', 'Jurong West St 65', 'Tah Ching Rd', 'Jurong West Ctrl 1', 'Jurong West St 64', 'Jurong West St 62', 'Jurong West St 41', 'Jurong West St 24', 'Jln Batu', 'Jln Bahagia', 'Lor Limau', '"St. George', 'S Rd"', 'Kallang Bahru', 'Dorset Rd', 'Geylang Bahru', 'Bendemeer Rd', 'Whampoa Dr', 'Upp Boon Keng Rd', 'Race Course Rd', 'Owen Rd', 'Nth Bridge Rd', 'Towner Rd', 'Farrer Pk Rd', 'Mcnair Rd', 'Jln Tenteram', 'Boon Keng Rd', 'Jln Rajah', 'Marine Dr', 'Marine Cres', 'Marine Ter', 'Changi Village Rd', 'Pasir Ris St 71', 'Pasir Ris St 11', 'Pasir Ris Dr 3', 'Pasir Ris Dr 6', 'Pasir Ris St 21', 'Pasir Ris Dr 4', 'Pasir Ris St 53', 'Pasir Ris Dr 10', 'Pasir Ris St 52', 'Pasir Ris St 12', 'Pasir Ris St 51', 'Pasir Ris St 72', 'Pasir Ris Dr 1', 'Punggol Field', 'Edgedale Plains', 'Punggol Field Walk', 'Edgefield Plains', 'Punggol Rd', 'Punggol East', 'Punggol Dr', 'Punggol Ctrl', 'Punggol Pl', '"C', 'Wealth Cl"', 'Stirling Rd', 'Mei Ling St', '"C', 'Wealth Cres" "C', 'Wealth Dr"', 'Ghim Moh Rd', 'Dover Rd', 'Holland Ave', 'Strathmore Ave', 'Holland Dr', 'Ghim Moh Link', 'Clarence Lane', 'Dover Cres', 'Sembawang Dr', 'Sembawang Cl', 'Montreal Dr', 'Admiralty Link', 'Admiralty Dr', 'Sembawang Cres', 'Canberra Rd', 'Fernvale Rd', 'Compassvale Lane', 'Anchorvale Rd', 'Rivervale Dr', 'Rivervale Cres', 'Sengkang East Way', 'Rivervale St', 'Rivervale Walk', 'Fernvale Lane', 'Anchorvale Link', 'Compassvale Rd', 'Compassvale Cres', 'Jln Kayu', 'Compassvale Walk', 'Compassvale Dr', 'Compassvale Link', 'Compassvale Bow', 'Sengkang Ctrl', 'Anchorvale Lane', 'Anchorvale Dr', 'Compassvale St', 'Serangoon Ave 4', 'Lor Lew Lian', 'Serangoon Ave 2', 'Serangoon Nth Ave 1', 'Serangoon Ave 1', 'Serangoon Ctrl', 'Serangoon Nth Ave 4', 'Tampines St 22', 'Tampines St 41', 'Tampines Ave 4', 'Tampines St 44', 'Tampines St 81', 'Tampines St 11', 'Tampines St 23', 'Tampines St 91', 'Tampines St 21', 'Tampines St 83', 'Tampines St 42', 'Tampines St 71', 'Tampines St 45', 'Tampines St 34', 'Tampines St 82', 'Tampines Ave 9', 'Simei St 1', 'Simei St 5', 'Tampines St 72', 'Tampines St 84', 'Simei St 2', 'Tampines Ctrl 7', 'Tampines St 33', 'Tampines St 32', 'Tampines Ave 5', 'Lor 5 Toa Payoh', 'Lor 7 Toa Payoh', 'Lor 4 Toa Payoh', 'Lor 1 Toa Payoh', 'Toa Payoh East', 'Potong Pasir Ave 1', 'Toa Payoh Nth', 'Lor 8 Toa Payoh', 'Lor 3 Toa Payoh', 'Potong Pasir Ave 3', 'Joo Seng Rd', 'Lor 2 Toa Payoh', 'Toa Payoh Ctrl', 'Marsiling Dr', 'Woodlands St 13', 'Woodlands Dr 52', 'Woodlands St 41', 'Marsiling Cres', 'Woodlands St 83', 'Woodlands Circle', 'Woodlands Dr 40', 'Woodlands St 31', 'Woodlands Dr 16', 'Woodlands St 81', 'Woodlands Ring Rd', 'Woodlands Dr 53', 'Woodlands Dr 62', 'Woodlands Dr 70', 'Woodlands Dr 42', 'Woodlands Dr 50', 'Woodlands Ave 6', 'Woodlands Dr 14', 'Woodlands Ave 1', 'Woodlands Ave 5', 'Marsiling Rise', 'Woodlands Cres', 'Woodlands Dr 73', 'Woodlands Dr 44', 'Yishun Ring Rd', 'Yishun Ave 3', 'Yishun St 11', 'Yishun Ave 4', 'Yishun St 22', 'Yishun St 71', 'Yishun Ave 5', 'Yishun St 21', 'Yishun St 41', 'Yishun St 61', 'Yishun Ave 6', 'Yishun Ave 11', 'Yishun Ctrl', 'Yishun St 81', 'Yishun St 72', 'Yishun Ave 2', 'Ang Mo Kio St 32', 'Ang Mo Kio St 31', 'Bedok Nth St 2', 'Bedok Nth St 1', 'Jln Tenaga', 'Bedok Nth St 4', 'Bt Batok West Ave 4', 'Cantonment Cl', 'Boon Tiong Rd', 'Spottiswoode Pk Rd', 'Redhill Cl', 'Kim Tian Pl', 'Cashew Rd', '"Queen', 'S Rd"', 'Chander Rd', 'Kelantan Rd', 'Sago Lane', 'Upp Cross St', 'Chin Swee Rd', 'Smith St', 'Teck Whye Ave', 'Choa Chu Kang St 51', 'Choa Chu Kang Ave 5', 'Choa Chu Kang Ave 1', 'West Coast Dr', 'Paya Lebar Way', 'Aljunied Cres', 'Joo Chiat Rd', 'Pine Cl', 'Hougang St 22', 'Hougang Ave 9', 'Hougang Ave 6', 'Hougang St 21', 'Jurong West St 75', 'Kang Ching Rd', 'Kg Kayu Rd', 'Crawford Lane', 'Whampoa West', 'Beach Rd', 'Cambridge Rd', '"St. George', 'S Lane"', 'Jellicoe Rd', 'Elias Rd', 'Holland Cl', 'Tanglin Halt Rd', '"C', 'Wealth Ave"', 'Wellington Circle', 'Canberra Link', 'Sengkang West Ave', 'Sengkang East Rd', 'Serangoon Ctrl Dr', 'Serangoon Ave 3', 'Serangoon Nth Ave 3', 'Tampines Ave 8', 'Tampines St 24', 'Tampines St 12', 'Simei Lane', 'Simei St 4', 'Lor 6 Toa Payoh', 'Kim Keat Link', 'Marsiling Lane', 'Woodlands St 82', 'Woodlands Dr 60', 'Woodlands Ave 3', 'Woodlands Dr 75', 'Woodlands Ave 4', 'Woodlands St 32', 'Yishun Ave 7', 'Ang Mo Kio St 11', 'Bishan St 11', 'Bt Batok West Ave 2', 'Bt Batok St 32', 'Bt Batok St 33', 'Bt Batok St 22', 'Bt Batok West Ave 7', 'Hoy Fatt Rd', 'Silat Ave', 'Everton Pk', 'Bt Merah Ctrl', 'Jelebu Rd', 'Empress Rd', 'Veerasamy Rd', 'Choa Chu Kang St 64', 'Choa Chu Kang St 53', 'Choa Chu Kang Nth 7', 'Clementi Ave 6', 'Clementi St 13', 'Geylang Serai', 'Jln Tiga', 'Aljunied Rd', 'Yung Loh Rd', 'Yung An Rd', '"Jln Ma', 'Mor"', 'Whampoa Rd', 'Lor 3 Geylang', 'Pasir Ris St 13', '"Queen', 'S Cl"', 'Dover Cl East', 'Sembawang Vista', 'Tampines St 43', 'Simei Rd', 'Kim Keat Ave', 'Upp Aljunied Lane', 'Potong Pasir Ave 2', 'Woodlands Dr 72', 'Marsiling Rd', 'Woodlands Dr 71', 'Yishun Ave 9', 'Yishun St 20', 'Ang Mo Kio St 21', 'Tiong Bahru Rd', 'Klang Lane', 'Choa Chu Kang Loop', 'Clementi St 14', 'Sims Pl', 'Jurong East St 31', 'Yuan Ching Rd', 'Corporation Dr', 'Yung Ping Rd', 'Whampoa Sth', 'Tessensohn Rd', 'Jln Dusun', 'Queensway', 'Fernvale Link', 'Kim Pong Rd', 'Kim Cheng St', 'Saujana Rd', 'Buffalo Rd', 'Clementi St 12', 'Dakota Cres', 'Jurong West St 51', 'French Rd', 'Gloucester Rd', 'Kg Arang Rd', 'Moulmein Rd', 'Kent Rd', 'Ah Hood Rd', 'Serangoon Nth Ave 2', 'Tampines Ctrl 1', 'Tampines Ave 7', 'Lor 1A Toa Payoh', 'Woodlands Ave 9', 'Yishun Ctrl 1', 'Lower Delta Rd', 'Jln Dua', 'Woodlands St 11', 'Ang Mo Kio Ave 2', 'Selegie Rd', 'Sims Ave', 'Redhill Lane', '"King George', 'S Ave"', 'Pasir Ris St 41', 'Punggol Walk', 'Lim Liak St', 'Jln Berseh', 'Sengkang West Way', 'Buangkok Green', 'Sembawang Way', 'Punggol Way', 'Yishun St 31', 'Teck Whye Cres', 'Kreta Ayer Rd', 'Montreal Link', 'Upp Serangoon Cres', 'Sumang Link', 'Sengkang East Ave', 'Yishun Ave 1', 'Anchorvale Cres', 'Yung Kuang Rd', 'Anchorvale St', 'Tampines Ctrl 8', 'Yishun St 51', 'Upp Serangoon View', 'Tampines Ave 1', 'Bedok Reservoir Cres', 'Ang Mo Kio St 61', 'Dawson Rd', 'Fernvale St', 'Seng Poh Rd', 'Hougang St 32', 'Tampines St 86', 'Henderson Rd', 'Sumang Walk', 'Choa Chu Kang Ave 7', 'Keat Hong Cl', 'Jurong West Ctrl 3', 'Keat Hong Link', 'Aljunied Ave 2', 'Sumang Lane', 'Canberra Cres', 'Canberra St', 'Ang Mo Kio St 44', 'Woodlands Rise', 'Canberra Walk', 'Ang Mo Kio St 51', 'Geylang East Ave 2', 'Bt Batok East Ave 6', 'Bt Batok West Ave 9', 'Marine Parade Ctrl']

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