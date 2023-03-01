import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { doc, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore"; 

const storageRef = ref(storage)

export const useListingStore = defineStore('listing', {
  state: () => {
    return {
      listings: null
    }
  },
  actions: {
    setListings(){
      // subscribe to listing collection
      // store incoming values in the state
    },
    async createListing(newListing) {
      // receives a listing object
      const userStore = useUserStore()
      const userId = userStore.getUserId
      if(!userId){
        console.log("user not logged in")
        return false
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
