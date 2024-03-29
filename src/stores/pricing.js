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
    }
  },
  actions: {
    isValueBuy(listingData) {
      return listingData.estimatedPrice > listingData.price
    },
    async getEstimatedPrice(listing) {
      var listingData = {...listing}
      listingData.floorSize = Math.floor(listingData.floorSize/10)
      listingData.floorSize = listingData.floorSize * 10
      const newremainingLease = Math.floor(((2023 + listingData.remainingLease) - 100 + 1)/10) *10

      const q2 = await query(collection(db, 'storeyRange1'), 
      where('variable', '==', String(listingData.storeyRange)),
      );
      const querySnapshot2 = await getDocs(q2);
      var storey=0;
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          storey = doc.data().coefficient
      });

      const q3 = await query(collection(db, 'streetNames1'), 
      where('variable', '==', String(listingData.streetName).toUpperCase()),
      );

      const querySnapshot3 = await getDocs(q3);
      var street=0;
      querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          street = doc.data().coefficient
      });


      const q4 = await query(collection(db, 'towns1'), 
      where('variable', '==', String(listingData.town).toUpperCase()),
      );

      const querySnapshot4 = await getDocs(q4);
      var town=0;
      querySnapshot4.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          town = doc.data().coefficient
      });

      const q5 = await query(collection(db, 'towns1'), 
      where('variable', '==', '(Intercept)'),
      );

      const querySnapshot5 = await getDocs(q5);
      var Intercept=0;
      querySnapshot5.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          Intercept = doc.data().coefficient
      });
      //console.log('intercept is' + Intercept)

      const q6 = await query(collection(db, 'towns1'), 
      where('variable', '==', 'remaining_lease'),
      );

      const querySnapshot6 = await getDocs(q6);
      var remainingLease=0;
      querySnapshot6.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          remainingLease = doc.data().coefficient
      });

      const q7 = await query(collection(db, 'flatType1'), 
      where('variable', '==', String(listingData.flatType)),
      );

      const querySnapshot7 = await getDocs(q7);
      var Type=0;
      querySnapshot7.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          Type = doc.data().coefficient
      });

      var estimated = town + street + storey + Intercept  + remainingLease*listingData.remainingLease + Type
      return Math.round(estimated);
            
      },
  }
})