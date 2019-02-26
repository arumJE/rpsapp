import * as firebase from 'firebase';

var serviceAccount = require('./serviceAccountKey.json');

var config = {
  apiKey: "AIzaSyAplJ2LE0tRieOm3ftQyFGyPbb3UT6X_Ls",
  authDomain: "rpsapp-770b5.firebaseapp.com",
  databaseURL: "https://rpsapp-770b5.firebaseio.com",
  projectId: "rpsapp-770b5",
  storageBucket: "rpsapp-770b5.appspot.com",
  messagingSenderId: "1020972968064"
};

const admin = firebase.initializeApp(config);

export {admin};
