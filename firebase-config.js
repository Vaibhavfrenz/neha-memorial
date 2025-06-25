// Firebase Configuration for Neha Memorial Website

const firebaseConfig = {
    apiKey: "AIzaSyC4db5c4_fYkLlTrTcNuK0ONSwspsWVvVY",
    authDomain: "neha-memorial-website-1f540.firebaseapp.com",
    projectId: "neha-memorial-website-1f540",
    storageBucket: "neha-memorial-website-1f540.firebasestorage.app",
    messagingSenderId: "254686548750",
    appId: "1:254686548750:web:e846cb2f7ec15c2ce23d5f",
    measurementId: "G-LVV1T09C23"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services (only Firestore needed)
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser does not support persistence.');
        }
    });

// Export for use in other files
window.db = db; 