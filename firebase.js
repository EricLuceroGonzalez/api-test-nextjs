// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase,   child,get, ref } from 'firebase/database'
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
  databaseURL: process.env.databaseURL,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.FirebaseToken;
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ldyl8IgAAAAAG0iI1LAGqwDyoEgkRBF7zn-YziC'),
    // provider: new ReCaptchaV3Provider('6Ldyl8IgAAAAAO7cVkwmGsRXUIX1qIJRWFAMriwt'),
  
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true    
  });
}

export const database = getDatabase(app);
// 6Ldyl8IgAAAAAO7cVkwmGsRXUIX1qIJRWFAMriwt html - users
// 6Ldyl8IgAAAAAG0iI1LAGqwDyoEgkRBF7zn-YziC web - captcha
//! https://www.youtube.com/watch?v=1TIVdIOIX64
//!  https://www.youtube.com/watch?v=azdwN_4IDKA
// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }

  // const getData = async () => {
  //   try {
  //     const data = await get(ref(getDatabase(), '/events')); // TODO replace with the data you want to fetch
  //     console.log('Got data successfully', data)
  //   } catch (e) {
  //     console.error('An error occurred while getting data');
  //     console.error(e);
  //     console.log('>>>>>>>>>>>>>>>>>>>>');
  //   }
  // }
  // getData()