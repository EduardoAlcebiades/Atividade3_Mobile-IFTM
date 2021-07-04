import firebase from "firebase";

import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8QShHoMOY8GqyhJbulw6RWs8VBAcvYEs",
  authDomain: "atividade-2---pdm.firebaseapp.com",
  projectId: "atividade-2---pdm",
  storageBucket: "atividade-2---pdm.appspot.com",
  messagingSenderId: "441773752111",
  appId: "1:441773752111:web:5d2ae24fdb386b89b86bda",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const accountsDB = firebaseApp.database().ref().child("accounts");
