import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc} from 'firebase/firestore';

//DO NOT CANCEL
const firebaseConfig = {
    apiKey: "AIzaSyCu5cRTSa5Ezg4DNIiKDfLQfQ-kDTHo4iI",
    authDomain: "thesismanagementg3.firebaseapp.com",
    projectId: "thesismanagementg3",
    storageBucket: "thesismanagementg3.appspot.com",
    messagingSenderId: "30091770849",
    appId: "1:30091770849:web:ba560e3f3a2a0769c2b0a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// IMPORTANT: add ALL API functions in the API object at the end of the file

// COLLECTIONS' REFERENCES
// example const citiesRef = collection(db, "cities");
const studentsRef = collection(db, "students");
const teachersRef = collection(db, "teachers");
const degreesRef = collection(db, "degrees");
const careersRef = collection(db, "careers");
const thesisProposalsRef = collection(db, "thesisProposals");
const applicationsRef = collection(db, "applications");

// ADD ALL API FUNCTIONS HERE
const API = {
}

export default API;
