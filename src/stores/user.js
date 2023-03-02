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
import {doc, setDoc, getDoc, arrayRemove, arrayUnion} from "firebase/firestore"; 


const auth = getAuth()
const storageRef = ref(storage)

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
    async favouriteListing(listingId){
      if(!this.isAuthenticated) return null // show error message
      const docRef = doc(db, "users", this.user.id)
      if(this.user.favListingIds.includes(listingId)){
        // Unfavourite this listing
        await setDoc(docRef, {
          favListingIds: arrayRemove(listingId)
        })
      }else{
        // add this listing id
        await setDoc(docRef, {
          favListingIds: arrayUnion(listingId)
        })
      }
    }
  }
})
