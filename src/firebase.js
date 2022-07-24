
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB2o2p4qcMRtSSiewy4pOCWe-sAjpxollY",
  authDomain: "fitnessapp-607ec.firebaseapp.com",
  databaseURL: "https://fitnessapp-607ec-default-rtdb.firebaseio.com",
  projectId: "fitnessapp-607ec",
  storageBucket: "fitnessapp-607ec.appspot.com",
  messagingSenderId: "80319374279",
  appId: "1:80319374279:web:af15961745b7303440afe2"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);