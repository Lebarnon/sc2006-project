import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { usePricingStore } from './pricing';
import { doc, collection, addDoc, query, where, getDocs, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore"; 
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
        // check if listing exist in state first
        var listing = state.listings.find(e => e.id == listingId)
        if(listing) return listing
        // else get it from db
        const docRef = doc(db, "listings", listingId);
        const snapshot = await getDoc(docRef);
  
        if (snapshot.exists()) {
          listing = {id: snapshot.id, ...snapshot.data()}
          var estimatedPrice = await usePricingStore().getEstimatedPrice(listing)
          listing = {...listing, estimatedPrice: estimatedPrice}
          state.listings.push(listing)
          return listing
        } else {
          // snapshot.data() will be undefined in this case
          console.log("No document with id:", id);
          return null
        }
      }
    },
    getListingsByTown: (state) => {
      return async (town) => {
        const q = query(collection(db, "listings"), where("town", "==", town));
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
      await Promise.all(this.listings.map(async (listing) => {
        const estimatedPrice = await usePricingStore().getEstimatedPrice(listing)
        return({
          estimatedPrice: estimatedPrice,
          ...listing
        })
      }))
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
      const {imageFiles, ...listingData} = newListing
      // upload listing to db
      if(!update){
        const docRef = await addDoc(collection(db, "listings"), listingData)
        console.log("Document written with ID: ", docRef.id)
  
        // add listingId to user document
        await updateDoc(doc(db,"users", userId), {
          ownListingIds: arrayUnion(docRef.id)
        })
        useSnackbarStore().display("Created Listing Successfully!", "green-darken-2")
      }else{
        // update listing
        const docRef = await setDoc(doc(db, "listings", newListing.id), listingData)
        useSnackbarStore().display("Updated Listing Successfully!", "green-darken-2")
        router.push(`/detail/${newListing.id}`)
      }

      // return user to their listing page --> '/' for now as placeholder
      router.push('/')
      return true

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
          await this.setListings();
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
    filterListings(searchKey = null, filter = null){
      if(searchKey == "" && !filter){
        return this.listings
      }
      let filteredListings;
      if(searchKey && searchKey != ""){
        filteredListings = this.listings.filter(listing => {
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
        filteredListings = this.listings
      }
    
      if(filter =="Default"){
        filteredListings.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      }else if(filter == "Street Name"){
        filteredListings.sort((a,b) => (a.streetName > b.streetName) ? 1 : ((b.streetName > a.streetName) ? -1 : 0))
      }else if(filter == "Price"){
        filteredListings.sort((a,b) => a.price - b.price)
      }
      return filteredListings
    },
    async findRecommendedListings(){

    }
  }
})
