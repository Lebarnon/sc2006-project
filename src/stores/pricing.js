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
    isValueBuy(listingData) {
      return listingData.estimatedPrice > listingData.price
    },
    // async setPrice(){
    //     this.estimatedPrice = querySnap.resalePrice
    // }
    async getEstimatedPrice(listingData) {
            listingData.floorSize = Math.floor(listingData.floorSize/10)
            listingData.floorSize = listingData.floorSize * 10
            const newremainingLease = Math.floor(((2023 + listingData.remainingLease) - 100 + 1)/10) *10
            
            const q = await query(collection(db, 'grouped_data'), 
            where('flatModel', '==', String(listingData.flatModel)),
            where('flatType', '==', String(listingData.flatType)),
            where('town', '==', String(listingData.town)),
            where('streetName', '==', String(listingData.streetName)),
            where('floorAreaSqmBin', '==', Number(listingData.floorSize)),
            where('storeyRange', '==', String(listingData.storeyRange)),
            where('leaseCommenceDateBin', '==', Number(newremainingLease)),
            );

            // const q = await query(collection(db, 'grouped_data'), 
            // where('flatModel', '==', "Premium Apartment"),
            // where('flatType', '==', "4 ROOM"),
            // where('town', '==', "WOODLANDS"),
            // where('streetName', '==', "WOODLANDS DR 50"),
            // where('floorAreaSqmBin', '==', 90),
            // where('storeyRange', '==', "04 TO 06"),
            // where('leaseCommenceDateBin', '==', 2010),
            // );
            
            const querySnapshot = await getDocs(q);
            var a=0;
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                a = doc.data().resalePrice
            });
            console.log("Estimated Price", a)
            return Math.round(a);
            
      },
    //   async getChartData(){
    //         var data = {
    //             resource_id: 'f1765b54-a209-4718-8d38-a39237f502b3', // the resource id
    //             limit: 5, // get 5 results
    //             q: 'jones' // query for 'jones'
    //         };
    //         $.ajax({
    //             url: 'https://data.gov.sg/api/action/datastore_search',
    //             data: data,
    //             dataType: 'jsonp',
    //             success: function(data) {
    //             alert('Total results found: ' + data.result.total)
    //             }
    //         });
    //   }
  }
})