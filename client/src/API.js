"use strict;"
const SERVER_URL = "http://localhost:3001/api/";
import {thesis} from './MOCKS';

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

  /** Fetch the collection of all thesis without applying filters.<br>
   * 
   * Returns an object with two properties:
   * - ok, contains the json obj in case of success, otherwise null;
   * - err, contains some details in case of error, otherwise null.
  */
  async function getAllThesis()
  {
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
 async function getThesis([start, end])
 {
   /*
       return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                   .then(json => {ok: json, err: null})
                   .catch(err => {ok: null, err: err})
   */

   return end < thesis.length ? thesis.slice(start, end+1) : thesis.slice(start, thesis.length);
 }

 async function getThesisNumber()
 {
     /*
       return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                   .then(json => {ok: json, err: null})
                   .catch(err => {ok: null, err: err})
   */

     //MOC
     return thesis.length;
 }

const API = {getAllThesis, getThesis, getThesisNumber};

export default API;