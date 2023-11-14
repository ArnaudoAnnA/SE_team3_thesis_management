"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc, getDoc, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import dayjs from 'dayjs';
import Teacher from './models/Teacher.js';
import Student from './models/Student.js';
import Career from './models/Career.js';
import Application from './models/Application.js';
import ThesisProposal from './models/ThesisProposal.js';

import { thesis } from './MOCKS.js';

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
const dateRef =  collection(db, "date");

/**
 * Return if the user is a student
 * @param email the email of the user
 * @return true if the user is a student, false otherwise
 */
const isStudent = async (email) => {
  const whereCond = where("email", "==", email)
  const q = query(studentsRef, whereCond)
  const snapshot = await getDocs(q)
  return snapshot.docs[0] ? true : false
}

/**
 * Return if the user is a teacher
 * @param email the email of the user
 * @return true if the user is a teacher, false otherwise
 */
const isTeacher = async (email) => {
  const whereCond = where("email", "==", email)
  const q = query(teachersRef, whereCond)
  const snapshot = await getDocs(q)
  return snapshot.docs[0] ? true : false
}

/** Fetch the collection of all thesis without applying filters.<br>
 * 
 * Returns an object with two properties:
 * - ok, contains the json obj in case of success, otherwise null;
 * - err, contains some details in case of error, otherwise null.
*/
const getAllThesis = async () => {
  console.log("Getting all thesis proposals")
  
  try {
    const thesisSnapshot = await getDocs(thesisProposalsRef);
    
    const allThesis = [];
    thesisSnapshot.forEach((doc) => {
      allThesis.push(doc.data());
    });
    
    console.log(allThesis);
    return allThesis;
  } catch (e) {
    console.log("Error:", e);
    return null; // or handle the error accordingly
  }
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

const getThesisWithID = async (ID) => {
  console.log("Testing getThesisWithID")

  //QUERY CONDITIONS
  const whereCond1 = where("id", "==", Number(ID))
  const qThesis = query(thesisProposalsRef, whereCond1)

  try {
    const thesisSnapshot = await getDocs(qThesis)
    if (!thesisSnapshot.empty) {
      const thesis = thesisSnapshot.docs[0].data()
      console.log(thesis);
      return thesis
    } else {
      console.log("Thesis not found");
      return null; // or handle accordingly if thesis not found
    }
  } catch (e) {
    console.log("Error:", e)
    return null; // or handle the error accordingly
  }
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


/**
 * Retrieve the application by the id of the student and the id of the thesis
 * @param studentId the id of the student
 * @param thesisId the id of the thesis
 * @return the application object, null if the object doesn't exist
 * 
 */

const getApplication = async (studentId, thesisId) => {
  return;
}


const API = {
  getAllThesis, getThesis, getThesisNumber, getThesisWithId,
  changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser,
  addApplication, retrieveCareer, getTitleAndTeacher, getApplication
};

export default API;