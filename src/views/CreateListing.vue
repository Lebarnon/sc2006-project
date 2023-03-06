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
                />
                <p>About the Listing</p>
                <v-select 
                    v-model="listingData.flatType"
                    :items="flatTypes"
                    label="Flat Type"
                    variant="solo"
                    bg-color="#E8E9EB"
                />
                <v-select 
                    v-model="listingData.flatModel"
                    :items = "flatModel"
                    label="Flat Model"
                    variant="solo"
                    bg-color="#E8E9EB"
                />
                <v-autocomplete
                    v-model="listingData.town"
                    label="Town"
                    variant="solo"
                    :items="towns"
                    bg-color="#E8E9EB"
                    hide-no-data
                />
                <v-autocomplete
                    v-model="listingData.streetName"
                    label="Street Name"
                    variant="solo"
                    :items="streets"
                    bg-color="#E8E9EB"
                    hide-no-data
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
                        />
                    </v-col>
                </v-row>
                <v-text-field
                    v-model="listingData.price"
                    label="Price of Listing"
                    variant="solo"
                    bg-color="#E8E9EB"
                    prefix="S$"
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
    isLoading.value = true  
    await listingStore.createListing(listingData.value)
    isLoading.value = false
}

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

const towns = ['Ang Mo Kio', 'Bedok', 'Bishan', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang', 'Bukit Timah', 'Central Area', 'Choa Chu Kang', 'Clementi', 'Geylang', 'Hougang', 'Jurong East', 'Jurong West', 'Kallang/Whampoa', 'Marine Parade', 'Pasir Ris', 'Punggol', 'Queenstown', 'Sembawang', 'Sengkang', 'Serangoon', 'Tampines', 'Toa Payoh', 'Woodlands', 'Yishun']


 const streets = ['Ang Mo Kio Ave 10', 'Ang Mo Kio Ave 4', 'Ang Mo Kio Ave 5', 'Ang Mo Kio Ave 1', 'Ang Mo Kio Ave 3', 'Ang Mo Kio Ave 9', 'Ang Mo Kio Ave 8', 'Ang Mo Kio Ave 6', 'Ang Mo Kio St 52', 'Bedok Nth Ave 4', 'Bedok Nth Ave 1', 'Bedok Nth Rd', 'Bedok Sth Ave 1', 'Bedok Reservoir Rd', 'Chai Chee St', 'Bedok Nth St 3', 'Bedok Sth Rd', 'Chai Chee Ave', 'New Upp Changi Rd', 'Chai Chee Dr', 'Bedok Sth Ave 2', 'Bedok Nth Ave 3', 'Bedok Reservoir View', 'Chai Chee Rd', 'Lengkong Tiga', 'Bedok Ctrl', 'Jln Damai', 'Bedok Nth Ave 2', 'Bedok Sth Ave 3', 'Sin Ming Rd', 'Sin Ming Ave', 'Bishan St 12', 'Bishan St 13', 'Bishan St 22', 'Bishan St 24', 'Bishan St 23', 'Bright Hill Dr', 'Shunfu Rd', 'Bt Batok St 34', 'Bt Batok St 51', 'Bt Batok St 11', 'Bt Batok St 52', 'Bt Batok St 21', 'Bt Batok East Ave 5', 'Bt Batok West Ave 6', 'Bt Batok Ctrl', 'Bt Batok West Ave 8', 'Bt Batok East Ave 4', 'Bt Batok St 31', 'Bt Batok St 25', 'Bt Batok East Ave 3', 'Bt Batok West Ave 5', 'Bt Batok St 24', 'Jln Bt Ho Swee', 'Telok Blangah Dr', 'Beo Cres', 'Telok Blangah Cres', 'Taman Ho Swee', 'Telok Blangah Rise', 'Telok Blangah Way', 'Jln Bt Merah', 'Jln Klinik', 'Telok Blangah Hts', 'Bt Merah View', 'Indus Rd', 'Bt Merah Lane 1', 'Telok Blangah St 31', 'Moh Guan Ter', 'Havelock Rd', 'Henderson Cres', 'Bt Purmei Rd', 'Kim Tian Rd', 'Depot Rd', 'Jln Rumah Tinggi', 'Delta Ave', 'Jln Membina', 'Redhill Rd', 'Lengkok Bahru', 'Zion Rd', 'Petir Rd', 'Pending Rd', 'Bangkit Rd', 'Segar Rd', 'Jelapang Rd', 'Senja Rd', 'Fajar Rd', 'Bt Panjang Ring Rd', 'Senja Link', 'Lompang Rd', 'Gangsa Rd', 'Toh Yi Dr', 'Farrer Rd', 'Jln Kukoh', 'Rowell Rd', 'Waterloo St', 'New Mkt Rd', 'Tg Pagar Plaza', 'Queen St', 'Bain St', 'Cantonment Rd', 'Teck Whye Lane', 'Choa Chu Kang Ave 4', 'Choa Chu Kang Ave 3', 'Choa Chu Kang Cres', 'Choa Chu Kang St 54', 'Choa Chu Kang Ctrl', 'Jln Teck Whye', 'Choa Chu Kang St 62', 'Choa Chu Kang Nth 6', 'Choa Chu Kang Dr', 'Choa Chu Kang Nth 5', 'Choa Chu Kang St 52', 'Choa Chu Kang Ave 2', 'Clementi West St 2', 'West Coast Rd', 'Clementi West St 1', 'Clementi Ave 4', 'Clementi Ave 5', 'Clementi St 11', 'Clementi Ave 2', 'Clementi Ave 3', 'Clementi Ave 1', '"C', 'Wealth Ave West"', 'Circuit Rd', 'Balam Rd', 'Macpherson Lane', 'Eunos Cres', 'Ubi Ave 1', 'Haig Rd', 'Old Airport Rd', 'Geylang East Ave 1', 'Sims Dr', 'Pipit Rd', 'Geylang East Ctrl', 'Eunos Rd 5', 'Cassia Cres', 'Buangkok Cres', 'Hougang Ave 3', 'Hougang Ave 8', 'Hougang Ave 1', 'Hougang Ave 5', 'Hougang St 61', 'Hougang St 11', 'Hougang Ave 7', 'Hougang Ave 4', 'Hougang Ave 2', 'Lor Ah Soo', 'Hougang St 92', 'Hougang St 52', 'Hougang Ave 10', 'Hougang St 51', 'Upp Serangoon Rd', 'Hougang Ctrl', 'Hougang St 91', 'Buangkok Link', 'Hougang St 31', 'Pandan Gdns', 'Teban Gdns Rd', 'Jurong East St 24', 'Jurong East St 21', 'Jurong East Ave 1', 'Jurong East St 13', 'Jurong East St 32', 'Toh Guan Rd', 'Jurong West St 93', 'Boon Lay Ave', 'Ho Ching Rd', 'Boon Lay Dr', 'Tao Ching Rd', 'Jurong West St 91', 'Jurong West St 42', 'Jurong West St 92', 'Boon Lay Pl', 'Jurong West St 52', 'Jurong West St 81', 'Yung Sheng Rd', 'Jurong West St 25', 'Jurong West St 73', 'Jurong West St 72', 'Jurong West Ave 3', 'Jurong West Ave 5', 'Yung Ho Rd', 'Jurong West St 74', 'Jurong West Ave 1', 'Jurong West St 71', 'Jurong West St 61', 'Jurong West St 65', 'Tah Ching Rd', 'Jurong West Ctrl 1', 'Jurong West St 64', 'Jurong West St 62', 'Jurong West St 41', 'Jurong West St 24', 'Jln Batu', 'Jln Bahagia', 'Lor Limau', '"St. George', 'S Rd"', 'Kallang Bahru', 'Dorset Rd', 'Geylang Bahru', 'Bendemeer Rd', 'Whampoa Dr', 'Upp Boon Keng Rd', 'Race Course Rd', 'Owen Rd', 'Nth Bridge Rd', 'Towner Rd', 'Farrer Pk Rd', 'Mcnair Rd', 'Jln Tenteram', 'Boon Keng Rd', 'Jln Rajah', 'Marine Dr', 'Marine Cres', 'Marine Ter', 'Changi Village Rd', 'Pasir Ris St 71', 'Pasir Ris St 11', 'Pasir Ris Dr 3', 'Pasir Ris Dr 6', 'Pasir Ris St 21', 'Pasir Ris Dr 4', 'Pasir Ris St 53', 'Pasir Ris Dr 10', 'Pasir Ris St 52', 'Pasir Ris St 12', 'Pasir Ris St 51', 'Pasir Ris St 72', 'Pasir Ris Dr 1', 'Punggol Field', 'Edgedale Plains', 'Punggol Field Walk', 'Edgefield Plains', 'Punggol Rd', 'Punggol East', 'Punggol Dr', 'Punggol Ctrl', 'Punggol Pl', '"C', 'Wealth Cl"', 'Stirling Rd', 'Mei Ling St', '"C', 'Wealth Cres" "C', 'Wealth Dr"', 'Ghim Moh Rd', 'Dover Rd', 'Holland Ave', 'Strathmore Ave', 'Holland Dr', 'Ghim Moh Link', 'Clarence Lane', 'Dover Cres', 'Sembawang Dr', 'Sembawang Cl', 'Montreal Dr', 'Admiralty Link', 'Admiralty Dr', 'Sembawang Cres', 'Canberra Rd', 'Fernvale Rd', 'Compassvale Lane', 'Anchorvale Rd', 'Rivervale Dr', 'Rivervale Cres', 'Sengkang East Way', 'Rivervale St', 'Rivervale Walk', 'Fernvale Lane', 'Anchorvale Link', 'Compassvale Rd', 'Compassvale Cres', 'Jln Kayu', 'Compassvale Walk', 'Compassvale Dr', 'Compassvale Link', 'Compassvale Bow', 'Sengkang Ctrl', 'Anchorvale Lane', 'Anchorvale Dr', 'Compassvale St', 'Serangoon Ave 4', 'Lor Lew Lian', 'Serangoon Ave 2', 'Serangoon Nth Ave 1', 'Serangoon Ave 1', 'Serangoon Ctrl', 'Serangoon Nth Ave 4', 'Tampines St 22', 'Tampines St 41', 'Tampines Ave 4', 'Tampines St 44', 'Tampines St 81', 'Tampines St 11', 'Tampines St 23', 'Tampines St 91', 'Tampines St 21', 'Tampines St 83', 'Tampines St 42', 'Tampines St 71', 'Tampines St 45', 'Tampines St 34', 'Tampines St 82', 'Tampines Ave 9', 'Simei St 1', 'Simei St 5', 'Tampines St 72', 'Tampines St 84', 'Simei St 2', 'Tampines Ctrl 7', 'Tampines St 33', 'Tampines St 32', 'Tampines Ave 5', 'Lor 5 Toa Payoh', 'Lor 7 Toa Payoh', 'Lor 4 Toa Payoh', 'Lor 1 Toa Payoh', 'Toa Payoh East', 'Potong Pasir Ave 1', 'Toa Payoh Nth', 'Lor 8 Toa Payoh', 'Lor 3 Toa Payoh', 'Potong Pasir Ave 3', 'Joo Seng Rd', 'Lor 2 Toa Payoh', 'Toa Payoh Ctrl', 'Marsiling Dr', 'Woodlands St 13', 'Woodlands Dr 52', 'Woodlands St 41', 'Marsiling Cres', 'Woodlands St 83', 'Woodlands Circle', 'Woodlands Dr 40', 'Woodlands St 31', 'Woodlands Dr 16', 'Woodlands St 81', 'Woodlands Ring Rd', 'Woodlands Dr 53', 'Woodlands Dr 62', 'Woodlands Dr 70', 'Woodlands Dr 42', 'Woodlands Dr 50', 'Woodlands Ave 6', 'Woodlands Dr 14', 'Woodlands Ave 1', 'Woodlands Ave 5', 'Marsiling Rise', 'Woodlands Cres', 'Woodlands Dr 73', 'Woodlands Dr 44', 'Yishun Ring Rd', 'Yishun Ave 3', 'Yishun St 11', 'Yishun Ave 4', 'Yishun St 22', 'Yishun St 71', 'Yishun Ave 5', 'Yishun St 21', 'Yishun St 41', 'Yishun St 61', 'Yishun Ave 6', 'Yishun Ave 11', 'Yishun Ctrl', 'Yishun St 81', 'Yishun St 72', 'Yishun Ave 2', 'Ang Mo Kio St 32', 'Ang Mo Kio St 31', 'Bedok Nth St 2', 'Bedok Nth St 1', 'Jln Tenaga', 'Bedok Nth St 4', 'Bt Batok West Ave 4', 'Cantonment Cl', 'Boon Tiong Rd', 'Spottiswoode Pk Rd', 'Redhill Cl', 'Kim Tian Pl', 'Cashew Rd', '"Queen', 'S Rd"', 'Chander Rd', 'Kelantan Rd', 'Sago Lane', 'Upp Cross St', 'Chin Swee Rd', 'Smith St', 'Teck Whye Ave', 'Choa Chu Kang St 51', 'Choa Chu Kang Ave 5', 'Choa Chu Kang Ave 1', 'West Coast Dr', 'Paya Lebar Way', 'Aljunied Cres', 'Joo Chiat Rd', 'Pine Cl', 'Hougang St 22', 'Hougang Ave 9', 'Hougang Ave 6', 'Hougang St 21', 'Jurong West St 75', 'Kang Ching Rd', 'Kg Kayu Rd', 'Crawford Lane', 'Whampoa West', 'Beach Rd', 'Cambridge Rd', '"St. George', 'S Lane"', 'Jellicoe Rd', 'Elias Rd', 'Holland Cl', 'Tanglin Halt Rd', '"C', 'Wealth Ave"', 'Wellington Circle', 'Canberra Link', 'Sengkang West Ave', 'Sengkang East Rd', 'Serangoon Ctrl Dr', 'Serangoon Ave 3', 'Serangoon Nth Ave 3', 'Tampines Ave 8', 'Tampines St 24', 'Tampines St 12', 'Simei Lane', 'Simei St 4', 'Lor 6 Toa Payoh', 'Kim Keat Link', 'Marsiling Lane', 'Woodlands St 82', 'Woodlands Dr 60', 'Woodlands Ave 3', 'Woodlands Dr 75', 'Woodlands Ave 4', 'Woodlands St 32', 'Yishun Ave 7', 'Ang Mo Kio St 11', 'Bishan St 11', 'Bt Batok West Ave 2', 'Bt Batok St 32', 'Bt Batok St 33', 'Bt Batok St 22', 'Bt Batok West Ave 7', 'Hoy Fatt Rd', 'Silat Ave', 'Everton Pk', 'Bt Merah Ctrl', 'Jelebu Rd', 'Empress Rd', 'Veerasamy Rd', 'Choa Chu Kang St 64', 'Choa Chu Kang St 53', 'Choa Chu Kang Nth 7', 'Clementi Ave 6', 'Clementi St 13', 'Geylang Serai', 'Jln Tiga', 'Aljunied Rd', 'Yung Loh Rd', 'Yung An Rd', '"Jln Ma', 'Mor"', 'Whampoa Rd', 'Lor 3 Geylang', 'Pasir Ris St 13', '"Queen', 'S Cl"', 'Dover Cl East', 'Sembawang Vista', 'Tampines St 43', 'Simei Rd', 'Kim Keat Ave', 'Upp Aljunied Lane', 'Potong Pasir Ave 2', 'Woodlands Dr 72', 'Marsiling Rd', 'Woodlands Dr 71', 'Yishun Ave 9', 'Yishun St 20', 'Ang Mo Kio St 21', 'Tiong Bahru Rd', 'Klang Lane', 'Choa Chu Kang Loop', 'Clementi St 14', 'Sims Pl', 'Jurong East St 31', 'Yuan Ching Rd', 'Corporation Dr', 'Yung Ping Rd', 'Whampoa Sth', 'Tessensohn Rd', 'Jln Dusun', 'Queensway', 'Fernvale Link', 'Kim Pong Rd', 'Kim Cheng St', 'Saujana Rd', 'Buffalo Rd', 'Clementi St 12', 'Dakota Cres', 'Jurong West St 51', 'French Rd', 'Gloucester Rd', 'Kg Arang Rd', 'Moulmein Rd', 'Kent Rd', 'Ah Hood Rd', 'Serangoon Nth Ave 2', 'Tampines Ctrl 1', 'Tampines Ave 7', 'Lor 1A Toa Payoh', 'Woodlands Ave 9', 'Yishun Ctrl 1', 'Lower Delta Rd', 'Jln Dua', 'Woodlands St 11', 'Ang Mo Kio Ave 2', 'Selegie Rd', 'Sims Ave', 'Redhill Lane', '"King George', 'S Ave"', 'Pasir Ris St 41', 'Punggol Walk', 'Lim Liak St', 'Jln Berseh', 'Sengkang West Way', 'Buangkok Green', 'Sembawang Way', 'Punggol Way', 'Yishun St 31', 'Teck Whye Cres', 'Kreta Ayer Rd', 'Montreal Link', 'Upp Serangoon Cres', 'Sumang Link', 'Sengkang East Ave', 'Yishun Ave 1', 'Anchorvale Cres', 'Yung Kuang Rd', 'Anchorvale St', 'Tampines Ctrl 8', 'Yishun St 51', 'Upp Serangoon View', 'Tampines Ave 1', 'Bedok Reservoir Cres', 'Ang Mo Kio St 61', 'Dawson Rd', 'Fernvale St', 'Seng Poh Rd', 'Hougang St 32', 'Tampines St 86', 'Henderson Rd', 'Sumang Walk', 'Choa Chu Kang Ave 7', 'Keat Hong Cl', 'Jurong West Ctrl 3', 'Keat Hong Link', 'Aljunied Ave 2', 'Sumang Lane', 'Canberra Cres', 'Canberra St', 'Ang Mo Kio St 44', 'Woodlands Rise', 'Canberra Walk', 'Ang Mo Kio St 51', 'Geylang East Ave 2', 'Bt Batok East Ave 6', 'Bt Batok West Ave 9', 'Marine Parade Ctrl']

</script>