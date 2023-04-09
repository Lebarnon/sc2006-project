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
  actions: {
    isValueBuy(listingData) {
      return listingData.estimatedPrice < listingData.price
    },
    async getEstimatedPrice(listing) {
      var listingData = {...listing}
      listingData.floorSize = Math.floor(listingData.floorSize/10)
      listingData.floorSize = listingData.floorSize * 10
      const newremainingLease = Math.floor(((2023 + listingData.remainingLease) - 100 + 1)/10) *10

      const q1 = await query(collection(db, 'remaining_lease'), 
      where('coefficient', '==', String(listingData.remainingLease+ ' years')),
      );

      const querySnapshot1 = await getDocs(q1);
      var lease=0;
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          lease = doc.data().value
      });


      const q2 = await query(collection(db, 'storeyRange'), 
      where('coefficient', '==', String(listingData.storeyRange)),
      );
      const querySnapshot2 = await getDocs(q2);
      var storey=0;
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          storey = doc.data().value
      });

      const q3 = await query(collection(db, 'streetNames'), 
      where('coefficient', '==', String(listingData.streetName).toUpperCase()),
      );

      const querySnapshot3 = await getDocs(q3);
      var street=0;
      querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          street = doc.data().value
      });


      const q4 = await query(collection(db, 'towns'), 
      where('coefficient', '==', String(listingData.town).toUpperCase()),
      );

      const querySnapshot4 = await getDocs(q4);
      var town=0;
      querySnapshot4.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          town = doc.data().value
      });

      var estimated = lease + town + street + storey
      return Math.round(estimated);
            
      },
  }
})