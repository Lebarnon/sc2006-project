import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { usePricingStore } from './pricing';
import { doc, collection, addDoc, query, where, getDocs, updateDoc, arrayUnion, getDoc, setDoc, or, deleteDoc } from "firebase/firestore"; 
import { useSnackbarStore } from './snackbar';

const storageRef = ref(storage)

export const useListingStore = defineStore('listing', {
  state: () => {
    return {
      listings: [],
      isLoading: false
    }
  },
  getters: {
    getListingById: (state) => {
      return async (listingId) => {
        var listing = state.listings.find(element => element.id == listingId)
        return listing
      }
    },
    getListingsByTown: (state) => {
      return async (town) => {
        const townUpper = town.toUpperCase()
        const townLower = town.toLowerCase()
        const q = query(collection(db, "listings"), 
          or(
            where("town", "==", town),
            where("town", "==", townUpper),
            where("town", "==", townLower),
            ));
        const querySnapshot = await getDocs(q);
        var result = []
        querySnapshot.forEach(async doc => {
          var estimatedPrice = await usePricingStore().getEstimatedPrice(doc.data())
          // doc.data() is never undefined for query doc snapshots
          result.push({id: doc.id, estimatedPrice: estimatedPrice, ...doc.data()})
        })
        return result
      }
    },
    getListingsLength: (state) => {
      return state.listings.length
    }
  },
  actions: {
    async setListings(){
      // getListings from db and store it in state
      this.isLoading = true
      this.listings = []
      const querySnapshot = await getDocs(collection(db, "listings"));
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        this.listings.push(
          {
            id: doc.id,
            ...doc.data()
          }
        )
      })
      const withEstimatedPrice = await Promise.all(this.listings.map(async (listing) => {
        const estimatedPrice = await usePricingStore().getEstimatedPrice(listing)
        return({
          estimatedPrice: estimatedPrice,
          ...listing
        })
      }))
      this.listings = withEstimatedPrice
      this.isLoading = false
    },
    async createListing(newListing, update=false) {
      // receives a listing object
      const userStore = useUserStore()
      const userId = userStore.getUserId
      if(!userId){
        console.log("user not logged in")
        return null
      } 
      const ownerName = userStore.getUserName()
      const phoneNo = userStore.getPhoneNo()
      // upload images and get firebase storage url 
      const imageUrls = []
      for await (var imageFile of newListing.imageFiles){
        if(typeof imageFile.name != 'string'){
          imageUrls.push(imageFile) //its already present in firebase
          continue
        }
        const imageStorageRef = ref(storageRef, `${userId}/${imageFile.name}`)

        const snapshot = await uploadBytes(imageStorageRef, imageFile)
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref)
        imageUrls.push(downloadURL)      
      }

      newListing.imageUrls = imageUrls
      newListing.ownerName = ownerName
      newListing.phoneNo = phoneNo

      const {id, imageFiles, estimatedPrice, ...listingData} = newListing
      // upload listing to db
      if(!update){
        const docRef = await addDoc(collection(db, "listings"), listingData)
        console.log("Document written with ID: ", docRef.id)
  
        // add listingId to user document
        await updateDoc(doc(db,"users", userId), {
          ownListingIds: arrayUnion(docRef.id)
        })
        await this.setListings()
        useSnackbarStore().display("Created Listing Successfully!", "green-darken-2")
      }else{
        // update listing
        const docRef = await setDoc(doc(db, "listings", id), listingData)
        useSnackbarStore().display("Updated Listing Successfully!", "green-darken-2")
        await this.setListings()
        router.push(`/detail/${id}`)
        return true
      }

      // return user to their listing page --> '/' for now as placeholder
      router.push('/')
      return true

    },
    async deleteListing(listing){
      if(!listing || !listing.hasOwnProperty('id')){
        useSnackbarStore().display("Delete Failed", "red-darken-2")
        return
      }
      await deleteDoc(doc(db, "listings", `${listing.id}`))
      this.listings = this.listings.filter(function(el) { return el.id != listing.id })
      useSnackbarStore().display("Delete Successfully", "green-darken-2")
    },
    async searchListing(searchObject){
      var searchResults = []
      for(var [key,value] of Object.entries(searchObject)){
        value = value.trim()
        if(key == "town"){
          var result = await this.getListingsByTown(value)
          searchResults.push(...result)
        }
        if(key == "q"){
          const filteredListings = this.listings.filter(listing => {
            //converts properties of each listing object to lowercase to compare with search
            const searchTerm = value.toLowerCase();
            const name = listing.name.toLowerCase();
            const flatType = listing.flatType.toLowerCase();
            const flatModel = listing.flatModel.toLowerCase();
            const town = listing.town.toLowerCase();
            const streetName = listing.streetName.toLowerCase();
            const description = listing.description.toLowerCase();
            return ( 
              //returns listings if any one of the fields contain the search criteria
              name.indexOf(searchTerm) !== -1 ||
              flatType.indexOf(searchTerm) !== -1 ||
              flatModel.indexOf(searchTerm) !== -1 ||
              town.indexOf(searchTerm) !== -1 ||
              streetName.indexOf(searchTerm) !== -1 ||
              description.indexOf(searchTerm) !== -1
            );
          });
          return filteredListings;
        }
      }
      return searchResults
    },
    filterListings(listingsData, searchKey = null, filter = null){
      if(!listingsData || listingsData.length == 0 || searchKey == "" && !filter){
        return []
      }
      let filteredListings;
      if(searchKey && searchKey != ""){
        filteredListings = listingsData.filter(listing => {
          //converts properties of each listing object to lowercase to compare with search
          const searchTerm = searchKey.toLowerCase();
          const name = listing.name.toLowerCase();
          const flatType = listing.flatType.toLowerCase();
          const flatModel = listing.flatModel.toLowerCase();
          const town = listing.town.toLowerCase();
          const streetName = listing.streetName.toLowerCase();
          const description = listing.description.toLowerCase();
          return ( 
            //returns listings if any one of the fields contain the search criteria
            name.indexOf(searchTerm) !== -1 ||
            flatType.indexOf(searchTerm) !== -1 ||
            flatModel.indexOf(searchTerm) !== -1 ||
            town.indexOf(searchTerm) !== -1 ||
            streetName.indexOf(searchTerm) !== -1 ||
            description.indexOf(searchTerm) !== -1
          );
        });
      }else{
        filteredListings = listingsData
      }
    
      if(filter =="Default"){
        filteredListings.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      }else if(filter == "Street Name"){
        filteredListings.sort((a,b) => (a.streetName > b.streetName) ? 1 : ((b.streetName > a.streetName) ? -1 : 0))
      }else if(filter == "Price"){
        filteredListings.sort((a,b) => a.price - b.price)
      }else if(filter == "Town"){
        filteredListings.sort((a,b) => (a.town > b.town) ? 1 : ((b.town > a.town) ? -1 : 0))
      }else if(filter == "Flat Model"){
        filteredListings.sort((a,b) => (a.flatModel > b.flatModel) ? 1 : ((b.flatModel > a.flatModel) ? -1 : 0))
      }else if(filter == "Flat Type"){
        filteredListings.sort((a,b) => (a.flatType > b.flatType) ? 1 : ((b.flatType > a.flatType) ? -1 : 0))
      }else if(filter == "Floor Area"){
        filteredListings.sort((a,b) => (a.floorSize > b.floorSize) ? 1 : ((b.floorSize > a.floorSize) ? -1 : 0))
      }else if(filter == "Storey Range"){
        filteredListings.sort((a,b) => (a.storeyRange > b.storeyRange) ? 1 : ((b.storeyRange > a.storeyRange) ? -1 : 0))
      }else if(filter == "Num Of Toilet"){
        filteredListings.sort((a,b) => a.noOfToilet - b.noOfToilet)
      }else if(filter == "Remaining Lease"){
        filteredListings.sort((a,b) => a.remainingLease - b.remainingLease)
      }
      return filteredListings
    },
    async findRecommendedListings(){
      const userStore = useUserStore()
      var recommended = []
      for(const listing of this.listings){
        if(listing.estimatedPrice > listing.price){
          recommended.push(listing)
        }
      }
      if(!userStore.isAuthenticated){
        return recommended
      }else{
        const favListings = await userStore.getFavListings()
        const townFreq = new Map()
        for(const listing of favListings){
          if(townFreq.has(listing.town)){
            townFreq.set(listing.town, townFreq.get(listing.town) +1)
          }else{
            townFreq.set(listing.town, 1)
          }
        }
        let mostFreqTown = null
        for(const [key, value] of townFreq){
          if(mostFreqTown == null){
            mostFreqTown = key
            continue
          }
          if(value > townFreq.get(mostFreqTown)){
            mostFreqTown = key
          }
        }
        if(mostFreqTown){
          recommended.sort((x,y) => x.town == mostFreqTown ? -1 : y.town == mostFreqTown ? 1 : 0)
        }
      }
      return recommended
      
    },
    findCommonTown(){
      const townFreq = new Map()
      for(const listing of this.listings){
        if(townFreq.has(listing.town)){
          townFreq.set(listing.town, townFreq.get(listing.town) +1)
        }else{
          townFreq.set(listing.town, 1)
        }
      }
      const sortedTowns = new Map([...townFreq].sort((a, b) => b[1] - a[1]));
      var towns = []
      for (const [key,value] of sortedTowns){
        towns.push(key)
      }
      return towns.slice(0,5)
    }
  }
})
