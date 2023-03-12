import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { doc, collection, addDoc, getDocs, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import { mdiTagPlus } from '@mdi/js';

const storageRef = ref(storage)

export const usePricingStore = defineStore('pricing', {
  state: () => {
    return {
      estimatedPrice: []
    }
  },
  getters: {
    getEstimatedPrice: (state) => {
        return async (listingData) => {
            console.log("OK")
            const querySnapshot = query(collection(db, 'grouped_data'), 
            where('FlatModel', '==', querySnapshot.flatModel));
            
            if (querySnapshot){
                console.log({OKOK})
                return querySnapshot.estimatedPrice
            }

        }
      }
    
  },
  methods: {
    // async getData() {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    //   const finalRes = await res.json();
    //   this.listItems = finalRes;
    // }
  },
  actions: {
    // async setPrice(){
    //     this.estimatedPrice = querySnap.resalePrice
    // }
  }
})