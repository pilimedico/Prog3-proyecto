

import app from "firebase/app"
import firebase from "firebase"

//pegamos la constante que nos llevamos del proyecto que creamos en firebase
const firebaseConfig = {
    apiKey: "AIzaSyDKo5MtNSyfVZGlv4u3UzC7nmv3qObSmco",
    authDomain: "mi-primer-app-s3-6b333.firebaseapp.com",
    projectId: "mi-primer-app-s3-6b333",
    storageBucket: "mi-primer-app-s3-6b333.appspot.com",
    messagingSenderId: "943374520015",
    appId: "1:943374520015:web:868ff0f19c20c6850631ba"
  };

  app.initializeApp(firebaseConfig) //metodo de firebase, le pasamos como parametro la configuracion que pegamos
  //con esto cada vez que corre el archivo y se manden solicitudes a traves de los metodos de firebase sabe a que cluster lo debe pegar.
  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()//constante con la que conectamos a la base de datos

