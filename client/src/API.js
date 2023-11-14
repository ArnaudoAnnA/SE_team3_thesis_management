"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc, getDoc, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import dayjs from 'dayjs';
import Teacher from './models/Teacher.js';
import Student from './models/Student.js';
import Career from './models/Career.js';

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
const teachersRef = DEBUG ? collection(db, "test-teachers") : collection(db, "teachers");
const degreesRef = DEBUG ? collection(db, "test-degrees") : collection(db, "degrees");
const careersRef = DEBUG ? collection(db, "test-career") : collection(db, "career");
const thesisProposalsRef = DEBUG ? collection(db, "test-thesisProposals") : collection(db, "thesisProposals");
const applicationsRef = DEBUG ? collection(db, "test-applications") : collection(db, "applications");
const dateRef = DEBUG ? collection(db, "test-date") : collection(db, "date");

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
  * @param filters : array
  * 
  * @returns an object with two properties:
  * - ok, contains the json obj in case of success, otherwise null;
  * - err, contains some details in case of error, otherwise null.
 */
async function getThesis(filters) {
  if (filters === undefined ) {
    return getAllThesis();
  }

  // value to filter with
  const validFilters = [
    'theacherName',
    'expirationDate',
    'level',
    'keywords',
    'type'
  ];

  // remove all non permitted filter
  filters = filters.filter(f => validFilters.includes(f.field));
  

  // build where conditions
  const whereConditions = filters.map(f => {
    switch (f.field) {
      case 'theacherName':
        return where('teacherName', '==', f.value);
      case 'expirationDate':
        return where('expirationDate', f.op, dayjs(f.value).toISOString());
      case 'level':
        return where('level', '==', f.value);
      case 'keywords':
        return where('keywords', 'array-contains-any', f.value);
      case 'type':
        return where('type', '==', f.value);
    }
  });
  let q = query(thesisProposalsRef, ...whereConditions);

  try {
    let thesis = await getDocs(q).
      then(snapshot => {
        let thesis = [];
        snapshot.forEach(doc => {
          thesis.push(doc.data());
        });
        return thesis;
      });
    if(thesis === undefined) {
      return { status: 404, err: 'No thesis found', thesis: [] };
    }    
    return { status: 200, err: null, thesis: thesis };
  } catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
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

const signUp = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials)
    })
    .catch((error) => {
      console.log(error)
    });

}

const logIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      return userCredentials
    })
    .catch((error) => {
      // console.log(error)
      throw error
    })
    ;
}

const logOut = async () => {
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
  if (studentSnapshot.docs[0]) {
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
  try {
    addDoc(applicationsRef, application.parse()).then(doc => {
      console.log(doc.id)
      console.log("Added application with id:" + doc.id)
    })
  } catch (e) {
    console.log(e)
    throw (e)
  }

  return;
}

/**
 * Retrieve all the career data of a student by his studentId
 * @param studentId the id of the student
 * @return the career ARRAY (look model/Career)
 */
const retrieveCareer = async (studentId) => {
  console.log("API.retrieveCareer")
  const whereStudentId = where("id", "==", studentId)
  const q = query(careersRef, whereStudentId)
  const careerSnapshot = await getDocs(q)
  // console.log(careerSnapshot)

  const career = []
  careerSnapshot.forEach(doc => {
    const exam = doc.data()
    // console.log(exam)
    const obj = new Career(exam.id, exam.codCourse, exam.titleCourse, exam.cfu, exam.grade, exam.date)
    career.push(obj)
  })
  // console.log(career)
  return career;
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
  console.log("API.getTitleAndTeacher")
  const whereThesisId = where("id", "==", Number(thesisId))
  const qThesis = query(thesisProposalsRef, whereThesisId)
  try {
    const thesisSnapshot = await getDocs(qThesis)
    const thesis = thesisSnapshot.docs[0].data()
    const whereTheacherId = where("id", "==", thesis.teacherId)
    const qTeacher = query(teachersRef, whereTheacherId)
    const teacherSnapshot = await getDocs(qTeacher)
    const teacher = teacherSnapshot.docs[0].data()

    return {
      title: thesis.title,
      teacher: {
        name: teacher.name,
        surname: teacher.surname
      }
    }



  } catch (e) {
    console.log(e)
  }




  return;
}


const API = {
  getAllThesis, getThesis, getThesisNumber, getThesisWithId,
  changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser,
  addApplication, retrieveCareer, getTitleAndTeacher
};

export default API;