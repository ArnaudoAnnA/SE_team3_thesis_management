"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc, getDoc, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Student from './models/Student.js'
import dayjs from 'dayjs';
import Teacher from './models/Teacher.js';

import { thesis } from './MOCKS';

//DO NOT CANCEL
const firebaseConfig = {
  apiKey: "AIzaSyCu5cRTSa5Ezg4DNIiKDfLQfQ-kDTHo4iI",
  authDomain: "thesismanagementg3.firebaseapp.com",
  projectId: "thesismanagementg3",
  storageBucket: "thesismanagementg3.appspot.com",
  messagingSenderId: "30091770849",
  appId: "1:30091770849:web:ba560e3f3a2a0769c2b0a0"
};

const DEBUG = false;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// IMPORTANT: add ALL API functions in the API object at the end of the file

// COLLECTIONS' REFERENCES
// example const citiesRef = collection(db, "cities");
const studentsRef = DEBUG ? collection(db, "test-students") : collection(db, "students");
const teachersRef = DEBUG ? collection(db, "test-teachers") :collection(db, "teachers");
const degreesRef = DEBUG ? collection(db, "test-degrees") :collection(db, "degrees");
const careersRef = DEBUG ? collection(db, "test-careers") :collection(db, "careers");
const thesisProposalsRef = DEBUG ? collection(db, "test-thesisProposals") :collection(db, "thesisProposals");
const applicationsRef = DEBUG ? collection(db, "test-applications") :collection(db, "applications");
const dateRef = DEBUG ? collection(db, "test-date") :collection(db, "date");

/** Fetch the collection of all thesis without applying filters.<br>
 * 
 * Returns an object with two properties:
 * - ok, contains the json obj in case of success, otherwise null;
 * - err, contains some details in case of error, otherwise null.
*/
async function getAllThesis() {
  /*
    Get all documents from the thesisProposals collection (empty where condition)
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
    });
  
}

const logIn = async(email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
      return userCredentials
    })
    .catch((error) => {
      // console.log(error)
      throw error
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

const getUser = async (email) => {
  let user = null
  const whereCond = where("email", "==", email)
  const qStudent = query(studentsRef, whereCond)
  const qTeacher = query(teachersRef, whereCond)

  const studentSnapshot = await getDocs(qStudent)
  const teacherSnapshot = await getDocs(qTeacher)
  if(studentSnapshot.docs[0]) {
    const student = studentSnapshot.docs[0].data()
    user = new Student(student.id, student.surname, student.name, student.gender, student.nationality, student.email, student.cod_degree, student.enrollment_year)
  } else {
    const teacher = teacherSnapshot.docs[0].data()
    user = new Teacher(teacher.id, teacher.surname, teacher.name, teacher.email, teacher.cod_group, teacher.cod_department)
  }
  
  // console.log(user)
  return user
}

/**
 * Add a new application into the server
 * @param application the application object (look model/Application)
 * @return null
 */
const addApplication = async (application) => {
  return ;
}

/**
 * Retrieve all the career data of a student by his studentId
 * @param studentId the id of the student
 * @return the career ARRAY (look model/Career)
 */
const retrieveCareer = async (studentId) => {
  return ;
}

/**
 * Retrieve the thesis title and relative teacher
 * @param thesisId the id of the thesis
 * @return an object having 2 properties:
 *    {
 *      title : <string>
 *      teacher : {
 *                   name: <string>
 *                   surname: <string>
 *                }
 *    }
 * 
 */
const getTitleAndTeacher = async (thesisId) => {
  return ;
}


const API = { getAllThesis, getThesis, getThesisNumber, getThesisWithId, changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser, addApplication, retrieveCareer, getTitleAndTeacher };

export default API;