import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { doc, collection, query, where, getDocs, getDoc } from "firebase/firestore"; 
import { mdiTagPlus } from '@mdi/js';

const storageRef = ref(storage)

export const usePricingStore = defineStore('pricing', {
  state: () => {
    return {
      estimatedPrice: []
    }
  },
  getters: {
    
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
    async getEstimatedPrice(listingData) {

            console.log("OK")
            console.log(listingData.flatModel)
            const q = await query(collection(db, 'grouped_data'), 
            where('flatModel', '==', listingData.flatModel));
            
            const querySnapshot = await getDocs(q);
            var a=0;
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                a = doc.data().resalePrice
            });
            return a;
      }
  }
})