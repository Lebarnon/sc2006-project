import { defineStore } from 'pinia'
import { firebaseApp } from "@/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      loading: true
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
          this.loading = false
        } else {
          console.log('User Store: user not logged in or created yet')
          this.loading = false
        }
      })
    }
  }
})
