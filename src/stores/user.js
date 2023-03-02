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
import {doc, setDoc} from "firebase/firestore"; 


const auth = getAuth()
const storageRef = ref(storage)

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {},
      isAuthenticated: false,
      loading: false
    }
  },
  getters: {
    getUserId: (state) => {
      return state.user.uid ?? null
    }
  },
  actions: {
    setUser() {
      this.loading = true
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('User Store: user signed in...')
          // get user info from firestore
          const { displayName, email, photoURL, emailVerified, uid } = user // get what you need from the user object
          this.user = { displayName, email, photoURL, emailVerified, uid }
          this.isAuthenticated = true
          this.loading = false
        } else {
          console.log('User Store: user not logged in or created yet')
          this.user = {}
          this.isAuthenticated = false
          this.loading = false
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
      } catch (err) {
        console.error(err)
      }
    }
  }
})
