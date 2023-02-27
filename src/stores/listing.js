import { defineStore } from 'pinia'
import { storage } from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';

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
      for(var imageFile of newListing.imageFiles){
        const imageStorageRef = ref(storageRef, `${userId}/${imageFile.name}`)

        
        uploadBytes(imageStorageRef, imageFile).then((snapshot) => {
          console.log(snapshot)
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            imageUrls.push(downloadURL)
          })
        }).catch((err) => console.error(err))
        
      }
      newListing.imageUrls = imageUrls
      console.log("imageURLS", imageUrls)
      // upload listing to collection and store listingid in user document in firebase

    }
  }
})
