import { defineStore } from '`pinia`'
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
import {doc, getDoc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore"; 
import { useListingStore } from './listing';


const auth = getAuth()
const storageRef = ref(storage)
const listingStore = useListingStore()
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      isloading: false
    }
  },
  getters: {
    getUserId: (state) => {
      return state.user.uid ?? null
    },
    isAuthenticated: (state) => {
      return state.user != null
    },
    getFavListingIds: (state) => {
      if(state.user == null) return null
      return state.user.favListingIds
    },
    getFavListings: async (state) => {
      var favListings = []
      for( id of this.getFavListingIds){
        var listing = await listingStore.getListingById(id)
        if(listing){
          favListings.push(listing)
        }
      }
      return favListings
    },
    isFavListing: (state) => {
      return (listingId) => state.user && state.user.favListingIds.includes(listingId)
    }
  },
  actions: {
    setUser() {
      this.isloading = true
      onAuthStateChanged(auth, async (user) => {
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
          this.isloading = false
        } else {
          console.log('User Store: user not logged in or created yet')
          this.user = null
          this.isloading = false
        }
      })
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
      console.log("fired")
      if(!this.isAuthenticated) return null // show error message
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
    }
  }
})
