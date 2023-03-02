import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { doc, collection, addDoc, getDocs, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 

const storageRef = ref(storage)

export const useListingStore = defineStore('listing', {
  state: () => {
    return {
      listings: []
    }
  },
  getters: {
    getListingById: (state) => {
      return async (listingId) => {
        console.log("Fired")
        // check if listing exist in state first
        var listing = state.listings.find(e => e.id == listingId)
        if(listing) return listing
        // else get it from db
        const docRef = doc(db, "listings", listingId);
        const snapshot = await getDoc(docRef);
  
        if (snapshot.exists()) {
          listing = {id: snapshot.id, ...snapshot.data()}
          state.listings.push(listing)
          return listing
        } else {
          // snapshot.data() will be undefined in this case
          console.log("No document with id:", id);
          return null
        }
      }
    }
  },
  actions: {
    async setListings(){
      // getListings from db and store it in state
      const querySnapshot = await getDocs(collection(db, "listings"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.listings.push(
          {
            id: doc.id,
            ...doc.data()
          }
        )
      })
    },
    async createListing(newListing) {
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
        const imageStorageRef = ref(storageRef, `${userId}/${imageFile.name}`)

        const snapshot = await uploadBytes(imageStorageRef, imageFile)
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref)
        imageUrls.push(downloadURL)      
      }

      newListing.imageUrls = imageUrls
      const {imageFiles, ...listingData} = newListing
      // upload listing to db
      const docRef = await addDoc(collection(db, "listings"), listingData)
      console.log("Document written with ID: ", docRef.id)

      // add listingId to user document
      console.l
      await updateDoc(doc(db,"users", userId), {
        ownListingIds: arrayUnion(docRef.id)
      })

      // return user to their listing page --> '/' for now as placeholder
      router.push('/')
      return true

    }
  }
})
