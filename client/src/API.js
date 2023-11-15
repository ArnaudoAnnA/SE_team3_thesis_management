"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc, getDoc, limit, QueryFieldFilterConstraint } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import dayjs from 'dayjs';
import Teacher from './models/Teacher.js';
import Student from './models/Student.js';
import Career from './models/Career.js';
import Application from './models/Application.js';
import ThesisProposal from './models/ThesisProposal.js';

import StringUtils from './utils/StringUtils.js';
import CONSTANTS from './utils/Constants.js';

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
//const dateRef = collection(db, "date");   commented after merge

/*--------------- Utils APIs -------------------------- */

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


/*--------------- Authentication APIs -------------------------- */
const dateRef = DEBUG ? collection(db, "test-date") : collection(db, "date");


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




/*------------------- APIs -------------------------- */

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



/** Fetch the collection of all thesis without applying filters.<br>
 * 
 * Returns an object with two properties:
 * - status;
 * - thesis, null in case of error.
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
    return { status: 200, thesis: allThesis }
  } catch (e) {
    console.log("Error:", e);
    return null; // or handle the error accordingly
  }
}

/** Fetch the collection of thesis applying specified filters <br>
   * It doesn't return all the thesis, but only the ones in the given range of indexes.<br>
  * 
  * @param filters : object containing all possible filters. If not specified or null, all thesis are returned.
  * 
  * Filters contains:
  * - theacherName: name and surname,
  * - expirationDate: { from: date, to: date }
  * - level: 'bachelor' | 'master',
  * - keywords: array of strings,
  * - type: 'academic research' | 'stage'
  * 
  * if some of the properties is not specified, it is not considered in the query.<br>
  * Expiration date from and to are both inclusive.<br>
  * 
  * @returns an object with two properties:
  * - status, contains the status code of the request;
  * - err, contains some details in case of error, otherwise null;
  * - thesis, contains the array of thesis in case of success, otherwise null.
 */
async function getThesis(filters) {
  if (filters === undefined ) {
    return getAllThesis();
  }

  // build where conditions
  let whereConditions = [];
  if (filters.theacherName != undefined) {
    let teacherName = filters.theacherName;
    console.log('Filters by theacher name not implemented yet');
  }

  if (filters.expirationDate != undefined) {
    let expirationDate = filters.expirationDate;

    if (dayjs.isDayjs(expirationDate.from))
      if (expirationDate.from != undefined) {
        console.log(expirationDate.from.toISOString());
        whereConditions.push(where('expirationDate', '>=', expirationDate.from.toISOString()));
      }
    else 
      console.error('getThesis: Invalid date format in expirationDate.from');
    
    if (dayjs.isDayjs(expirationDate.to))
      if (expirationDate.to != undefined) {
        console.log(expirationDate.to.toISOString());
        whereConditions.push(where('expirationDate', '<=', expirationDate.to.toISOString())); 
      }
    else
      console.error('getThesis: Invalid date format in expirationDate.to');
  }

  if(filters.level != undefined) {
    let level = filters.level;
    whereConditions.push(where('level', '==', level));
  }

  if(filters.keywords != undefined) {
    let keywords = filters.keywords;
    whereConditions.push(where('keywords', 'array-contains-any', keywords));
  }

  if(filters.type != undefined) {
    let type = filters.type;
    whereConditions.push(where('type', '==', type));
  }

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
    return { status: 200, thesis: thesis };
  } catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
}

/* no more needed
const getThesisNumber = async () => {
  try {
    const querySnapshot = await getDocs(thesisProposalsRef);
    const numberOfDocs = querySnapshot.size;
    console.log("Number of thesis:", numberOfDocs);
    return numberOfDocs;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null; // or handle the error accordingly
  }
}; */

/* no more needeed
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
} */

/**
 * Add a new application into the server
 * @param application the application object (look model/Application)
 * @return null
 */
const addApplication = async (application) => {
  if (auth.currentUser) {
    if (StringUtils.checkId(application.studentId, auth.currentUser.email)) {
      try {
        addDoc(applicationsRef, application.parse()).then(doc => {
          console.log(doc.id)
          console.log("Added application with id:" + doc.id)
          return "Application sent"
        })
      } catch (e) {
        console.log(e)
        throw (e)
      }
    } else {
      return CONSTANTS.unauthorized
    } 
    return;
  }
  else {
    return CONSTANTS.notLogged
  }
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
    if (auth.currentUser) {
      if (StringUtils.checkId(studentId, auth.currentUser.email)) {
        console.log(studentId)
        console.log(thesisId)
        const whereThesisId = where("thesisId", "==", Number(thesisId))
        const whereStudentId = where("studentId", "==", studentId)

        const qApplication = query(applicationsRef, whereThesisId, whereStudentId)
        // console.log(qApplication)
        try {
          const applicationSnapshot = await getDocs(qApplication)
          applicationSnapshot.forEach(e => { console.log(e) })
          if (applicationSnapshot.docs.length > 0) {
            console.log("there is already a record")
            const app = applicationSnapshot.docs[0].data()
            return new Application(app.studentId, app.thesisId, app.accepted, app.curriculum, app.date)
          }
          console.log("No records")
          return null
        } catch (error) {
          console.log(e)
        }
      } else {
        return CONSTANTS.unauthorized
      }
    } else {
      return CONSTANTS.notLogged
    }

    return;
  }

  /*only for testing purposes*/
  /**
   * @return the number of proposals deleted
   */
  const removeAllProposals = async () => {

    const q = query(thesisProposalsRef);

    try {

      const qSnapShot = await getDocs(q);
      const ids = [];

      qSnapShot.forEach(doc => {
        ids.push(doc.id);
      });

      const len = ids.length;
      const collectionName = DEBUG ? "test-thesisProposals" : "thesisProposals";

      ids.forEach(async (id) => {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
      })

      console.log(len);
      return len;
    } catch (e) {
      console.log(e)
    }

  };


const API = {
  getThesis, getAllThesis,
  changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser,
  addApplication, retrieveCareer, getTitleAndTeacher, getApplication,
  removeAllProposals
};

export default API;