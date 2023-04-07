import axios from 'axios';
import { defineStore } from 'pinia'
import { storage, db} from "@/firebase/firebaseConfig";
import { } from "firebase/auth";
import router from '../router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserStore } from './user';
import { doc, collection, query, where, getDocs, getDoc } from "firebase/firestore"; 
import { mdiTagPlus } from '@mdi/js';

const storageRef = ref(storage)

const state = {
  data: []
};

const mutations = {
  SET_DATA(state, payload) {
    state.data = payload;
  }
};

const actions = {
  fetchData({ commit }) {
    return axios.get('http://example.com/api/data')
      .then(response => {
        commit('SET_DATA', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  getData: state => state.data
};

export default {
  state,
  mutations,
  actions,
  getters
};
