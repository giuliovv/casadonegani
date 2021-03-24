import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDZW57QvcounH23bpX2wTF2Hvkh75DF8j4",
    authDomain: "casadoneganimilano.firebaseapp.com",
    projectId: "casadoneganimilano",
    storageBucket: "casadoneganimilano.appspot.com",
    messagingSenderId: "17925739572",
    appId: "1:17925739572:web:c7cfe66d400b05b1da6661"
  };

if (typeof window!== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

async function registrati(token, user){
  const data = {
      token: token,
      user: user,
    };
    
    await firebase.firestore().collection("notifiche").doc(user).set(data)
}

export const getToken = (setTokenFound, user) => {
    return messaging.getToken({vapidKey: 'BIudThaHR0zFCErEQqTDSnFHoteoDGaddT-rCu3vm9u8sHBBYvqFJQ3lIYGlyH7-nZ7St4GOdA4n5WT63gy4QJ0'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        registrati(currentToken, user)
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }