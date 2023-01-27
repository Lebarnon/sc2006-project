// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VUE_APP_API_KEY,
  authDomain: import.meta.env.VUE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VUE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VUE_APP_APP_ID,
  measurementId: import.meta.env.VUE_APP_MEASUREMENT_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);