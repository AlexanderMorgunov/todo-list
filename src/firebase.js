import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCysetdFKbTwtr68E4VgfssPbLnt9Vqq4I",
  authDomain: "to-do-list-36c1d.firebaseapp.com",
  databaseURL:
    "https://to-do-list-36c1d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "to-do-list-36c1d",
  storageBucket: "to-do-list-36c1d.appspot.com",
  messagingSenderId: "729426197340",
  appId: "1:729426197340:web:95869fc645d09ae6495f99",
};

const app = initializeApp(firebaseConfig);
