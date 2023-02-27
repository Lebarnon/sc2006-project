import { defineStore } from 'pinia'
import { firebaseApp } from "@/firebase/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import router from '../router';


const auth = getAuth()

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
