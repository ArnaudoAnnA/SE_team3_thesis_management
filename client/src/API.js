"use strict;"
const SERVER_URL = "http://localhost:3001/api/";
import { thesis } from './MOCKS';

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc, getDoc, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import dayjs from 'dayjs';

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
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// IMPORTANT: add ALL API functions in the API object at the end of the file

// COLLECTIONS' REFERENCES
// example const citiesRef = collection(db, "cities");
const studentsRef = collection(db, "students");
const teachersRef = collection(db, "teachers");
const degreesRef = collection(db, "degrees");
const careersRef = collection(db, "careers");
const thesisProposalsRef = collection(db, "thesisProposals");
const applicationsRef = collection(db, "applications");
const dateRef = collection(db, "date");

/** Fetch the collection of all thesis without applying filters.<br>
 * 
 * Returns an object with two properties:
 * - ok, contains the json obj in case of success, otherwise null;
 * - err, contains some details in case of error, otherwise null.
*/
async function getAllThesis() {
  /*
      return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                  .then(json => {ok: json, err: null})
                  .catch(err => {ok: null, err: err})
  */

  return thesis;
}

/** Fetch the collection of thesis without applying filters.<br>
   * It doesn't return all the thesis, but only the ones in the given range of indexes.<br>
  * 
  * @param [start, end] : start and end indexes are both included.
  * 
  * @returns an object with two properties:
  * - ok, contains the json obj in case of success, otherwise null;
  * - err, contains some details in case of error, otherwise null.
 */
async function getThesis(filters, [start, end]) {
  /*
      return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                  .then(json => {ok: json, err: null})
                  .catch(err => {ok: null, err: err})
  */

  let thesis_filtered = thesis.filter(
    t => {
      let ret = false;
      for (let prop in t) {
        if (typeof t[prop] === "string" && t[prop].includes(filters.searchKeyWord)) return true;
      }
    });

  return end < thesis_filtered.length ? thesis_filtered.slice(start, end + 1) : thesis_filtered.slice(start, thesis_filtered.length);
}

async function getThesisNumber() {
  /*
    return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                .then(json => {ok: json, err: null})
                .catch(err => {ok: null, err: err})
*/

  //MOC
  return thesis.length;
}

async function getThesisWithId(id) {
  /*
    return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                .then(json => {ok: json, err: null})
                .catch(err => {ok: null, err: err})
*/

  //MOC
  return thesis.find(t => t.id == id);
}

/** 
 * @param {string} DBfield 
 * @returns an array with all the possible values for the given field (appliable only on fields with restricted domain)
 */
async function getOptionsValuesForField(DBfield)
{
  return "Impossible to load data";
}

/**
* Get the virtual date from the server
* @returns virtual date yyyy-mm-dd
*/
const getVirtualDate = async () => {
  const q = query(dateRef, limit(1));
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  const dateData = firstDoc.data();
  return dateData.date;
}
/**
 * Change the date of the virtual clock in the server
 * @param date the new date
 */
const changeVirtualDate = async (date) => {
  const q = query(dateRef, limit(1));
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  const dateData = firstDoc.data();
  dateData.date = date;
  await setDoc(doc(db, "date", firstDoc.id), dateData);
}

const signUp = async(email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
    console.log(userCredentials)
    })
    .catch((error) => {
    console.log(error)
    })
  ;
  
}

const logIn = async(email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
      console.log(userCredentials)
      return userCredentials
    })
    .catch((error) => {
      console.log(error)
      return -1
    })
  ;
}

const logOut = async() => {
  signOut(auth).then(() => {
    console.log("signed out")
  }).catch((error) => {
    console.log(error)
  })
}

const API = { getAllThesis, getThesis, getThesisNumber, getThesisWithId, getOptionsValuesForField, changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut      
};

export default API;