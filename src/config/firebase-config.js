import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4t43Jl8zYwR6vQlhNrWBZv70VwneKQzE",
    authDomain: "inicio-77485.firebaseapp.com",
    projectId: "inicio-77485",
    storageBucket: "inicio-77485.appspot.com",
    messagingSenderId: "692294273740",
    appId: "1:692294273740:web:c9d391425e274f4b025069",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {firebase,auth};
