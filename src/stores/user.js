import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword ,
  signOut
} from "firebase/auth";
import { ref } from 'firebase/storage';
import router from '../router';
import {doc, setDoc, getDoc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore"; 
import { useListingStore } from './listing.js';
import { useSnackbarStore } from './snackbar.js';


const auth = getAuth()
const storageRef = ref(storage)

const initializeAuth = new Promise(resolve => {
  // this adds a hook for the initial auth-change event
  onAuthStateChanged(auth, (user) => {
    useUserStore().setUser(user).then(() => {
      resolve(user)
    })
  })
})

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      isloading: false
    }
  },
  getters: {
    getUserId: (state) => {
      return state.user.id ?? null
    },
    isAuthenticated: (state) => {
      return state.user != null
    },
    getFavListingIds: (state) => {
      if(state.user == null) return null
      return state.user.favListingIds
    },
    getOwnListingIds: (state) => {
      if(state.user == null) return null
      return state.user.ownListingIds
    },
    isFavListing: (state) => {
      return (listingId) => state.user && state.user.favListingIds.includes(listingId)
    },
    isOwnListing: (state) => {
      return (listingId) => state.user && state.user.ownListingIds.includes(listingId)
    }
  },
  actions: {
    async initAuth() {
      initializeAuth.then((value) => {
        return value
      })
    },
    async setUser(user) {         
      if (user) {
        console.log('User Store: user signed in...')
        // get user info from firestore
        const docRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          this.user = {id: snapshot.id, ...snapshot.data()}
        } else {
          console.log("This user should not exist", id);
          this.user = {...user}
        }
      } else {
        console.log('User Store: user not logged in or created yet')
        this.user = null
      }
    },
    async signInWithEmail (email, password) {
      signInWithEmailAndPassword(auth, email, password).then(() => 
      router.push("/"))
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        return error.code
      })
      return true
    },
    async signUp(userInfo){
      const {email, password, ...otherInfo} = userInfo
      otherInfo.ownListingIds = []
      otherInfo.favListingIds = []
      createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
          await setDoc(doc(db, "users", userCredential.user.uid), {email, ...otherInfo})
      }).catch((err) => {
        console.log(err.code);
        console.log(err.message);
        return err.code
      })
      router.push("/")
      return true

    },
    async signOut () {
      try {
        await auth.signOut()
        router.push("/")
      } catch (err) {
        console.error(err)
      }
    },
    async toggleFavListing(listingId){
      if(!this.isAuthenticated) {
        useSnackbarStore().display("You need to be logged in to Favourite a listing!")
        return null
      } // show error message
      const docRef = doc(db, "users", this.user.id)
      let index = this.user.favListingIds.indexOf(listingId)
      if(index > -1){
        // Unfavourite this listing
        await updateDoc(docRef, {
          favListingIds: arrayRemove(listingId)
        })
        this.user.favListingIds.splice(index,1)
      }else{
        // add this listing id
        await updateDoc(docRef, {
          favListingIds: arrayUnion(listingId)
        })
        this.user.favListingIds.push(listingId)
      }
    },
    async getFavListings(){
      var favListings = []
      for(var id of this.getFavListingIds){
        var listing = await useListingStore().getListingById(id)
        if(listing){
          favListings.push(listing)
        }
      }
      return favListings
    },
    async getOwnListings(){
      var ownListings = []
      for(var id of this.getOwnListingIds){
        var listing = await useListingStore().getListingById(id)
        if(listing){
          ownListings.push(listing)
        }
      }
      return ownListings
    },
  }
})
