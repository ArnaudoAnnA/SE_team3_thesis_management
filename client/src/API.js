"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc, getDoc, limit, QueryFieldFilterConstraint, startAfter, orderBy } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { SAMLAuthProvider } from "firebase/auth";
import { signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";

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
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app); 
const provider = new SAMLAuthProvider('saml.auth0-thesis-management');
// IMPORTANT: add ALL API functions in the API object at the end of the file

// COLLECTIONS' REFERENCES
// example const citiesRef = collection(db, "cities");
const studentsRef = DEBUG ? collection(db, "test-students") : collection(db, "students");
const teachersRef = DEBUG ? collection(db, "test-teachers") : collection(db, "teachers");
const degreesRef = DEBUG ? collection(db, "test-degrees") : collection(db, "degrees");
const careersRef = DEBUG ? collection(db, "test-career") : collection(db, "career");
const thesisProposalsRef = DEBUG ? collection(db, "test-thesisProposals") : collection(db, "thesisProposals");
const applicationsRef = DEBUG ? collection(db, "test-applications") : collection(db, "applications");
const dateRef = collection(db, "date");

const storageCurriculums = "curriculums/"


/*--------------- Utils APIs -------------------------- */

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
 * @param id the id of the teacher
 * @return true if the user is a teacher, false otherwise
 */
const isTeacherById = async (id) => {
  const whereCond = where("id", "==", id)
  const q = query(teachersRef, whereCond)
  const snapshot = await getDocs(q)
  return snapshot.docs[0] ? true : false
}


/*--------------- Authentication APIs -------------------------- */


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
      console.log(userCredentials)
      return userCredentials
    })
    .catch((error) => {
      // console.log(error)
      throw error
    })
    ;
}
const loginWithSaml = () => {
  signInWithRedirect(auth, provider)
  .then(result => {
    console.log(result.user.email)
  })
  .catch(e => {
    console.log(e)
  })
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
};

/**
+ * Return the group of the teacher
+ * @param email the email of the teacher
+ * @return the teachers group, null if theres not a teacher
+ */
const getGroups = async (email) => {
  const whereCond = where("email", "==", email)
  const q = query(teachersRef, whereCond)
  const snapshot = await getDocs(q)
  return snapshot.docs[0] ? snapshot.docs[0].data().cod_group : null
  }
  
  /**
  + * Return the group of the teacher
  + * @param id the id of the teacher
  + * @return the teachers group, null if theres not a teacher
  + */
const getGroupsById = async (id) => {
  const whereCond = where("id", "==", id)
  const q = query(teachersRef, whereCond)
  const snapshot = await getDocs(q)
  return snapshot.docs[0] ? snapshot.docs[0].data().cod_group : null
};
  




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

  if (auth.currentUser) {
    try {
      if (isTeacher(auth.currentUser.email)) {
        //TO BE MODIFIED: Showing only his thesis
        const thesisSnapshot = await getDocs(thesisProposalsRef);
        const allThesis = [];
        thesisSnapshot.forEach((doc) => {
          allThesis.push(doc.data());
        });

        return { status: 200, thesis: allThesis }

      } else {
        //They are a student
        const thesisSnapshot = await getDocs(thesisProposalsRef);
        const allThesis = [];
        thesisSnapshot.forEach((doc) => {
          allThesis.push(doc.data());
        });

        return { status: 200, thesis: allThesis }
      }
    } catch (e) {
      console.log("Error:", e);
      return null; // or handle the error accordingly
    }
  } else {
    return CONSTANTS.notLogged;
  }
}

// ---------------------GET THESIS -----------------------------

/**
 * Build the where conditions for the query
 * @param filters the filters object
 * @returns an array of where conditions
 */
export const buildWhereConditions = async (filters) => {
  let whereConditions = [];

  if (filters === undefined) {
    filters = {};
  }

  let teacher;
  if (filters.supervisor) {
    let teacherName = filters.supervisor;
    let [name, surname] = teacherName.split(" ");
    let teacherQuery = query(
      teachersRef,
      where("name", "==", name),
      where("surname", "==", surname)
    );

    let teacherSnap = await getDocs(teacherQuery);
    teacher = teacherSnap.docs[0].data();

    if (teacher) whereConditions.push(where("teacherId", "==", teacher.id));
  }

  if (filters.coSupervisors && filters.coSupervisors.length > 0) {
    let coSupervisors = filters.coSupervisors;
    whereConditions.push(
      where("coSupervisors", "array-contains-any", coSupervisors)
    );
  }

  if (filters.expirationDate) {
    let expirationDate = filters.expirationDate;

    if (expirationDate.from) {
      let date = dayjs(expirationDate.from);
      whereConditions.push(where("expirationDate", ">=", date.toISOString()));
    }

    if (expirationDate.to) {
      let date = dayjs(expirationDate.to);
      whereConditions.push(where("expirationDate", "<=", date.toISOString()));
    }
  }

  if (filters.level) {
    let level = filters.level;
    whereConditions.push(where("level", "==", level));
  }

  if (filters.keywords && filters.keywords.length > 0) {
    let keywords = filters.keywords;
    whereConditions.push(where("keywords", "array-contains-any", keywords));
  }

  if (filters.type) {
    let type = filters.type;
    whereConditions.push(where("type", "==", type));
  }

  if (filters.title) {
    console.log("Filter on title not implemented yet");
  }

  if (filters.groups && filters.groups.length > 0) {
    console.log("Filter on groups not implemented yet");
  }

  if (filters.programmes) {
    console.log("Filter on programmes not implemented yet");
  }

  return whereConditions;
};

/**
 * Order all the thesis given an array of orderBy conditions.
 * @param thesis the thesis to order
 * @param {[{DBfield: "title", mode: "ASC"}, ...]} orderByArray the array of orderBy conditions
 */ 

export const orderThesis = (thesis, orderByField) => {
  thesis.sort((a, b) => {
    const field = orderByField.DBfield;
    const mode = orderByField.mode === "ASC" ? 1 : -1;

    if (a[field] < b[field]) {
      return -1 * mode;
    }
    if (a[field] > b[field]) {
      return 1 * mode;
    }
    return 0;
  });

  return thesis;
};


/** Fetch the collection of ACTIVE thesis applying specified filters <br>
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
  * - coSupervisors: string
  * 
  * if some of the properties is not specified, it is not considered in the query.<br>
  * Expiration date from and to are both inclusive.<br>
  * 
  * @param {[{DBfield: "title", mode: "ASC"}, ...]} orderByArray
  * 
  * @param {int} lastThesisID undefined in case this is a new query
  * 
  * @returns an object with two properties:
  * - status, contains the status code of the request;
  * - err, contains some details in case of error, otherwise null;
  * - thesis, contains the array of thesis in case of success, otherwise null.
 */

let thesisCache = [];

const getThesis = async (filters, orderByArray, lastThesisID, entry_per_page) => {
  if (!auth.currentUser) {
    return CONSTANTS.notLogged;
  }

  try {
    // add filters to the query
    let whereConditions = await buildWhereConditions(filters);

    // if the user is a teacher, show only his thesis
    if (await isTeacher(auth.currentUser.email)) {
      let thisTeacherId = await getDocs(
        query(teachersRef, where("email", "==", auth.currentUser.email))
      ).then((snap) => snap.docs[0].data().id);
      whereConditions.push(where("teacherId", "==", thisTeacherId));
    }

    // show only active thesis
    if (filters.expirationDate.to == "" && filters.expirationDate.from == "")
      whereConditions.push(where("archiveDate", ">=", await getVirtualDate()));
    else if (filters.expirationDate.from !== ''){
      expirationDateFrom = dayjs(filters.expirationDateFrom);
      archiveDate = dayjs(await getVirtualDate());
      if(expirationDateFrom.isBefore(archiveDate))
        whereConditions.push(where("archiveDate", ">=", await getVirtualDate()));
    }

    // compose the query
    let q = query(
      thesisProposalsRef,
      ...whereConditions
    );

    // prepare teacher array for name and surname
    let teachersSnap = await getDocs(teachersRef);
    let teachers = teachersSnap.docs.map((doc) => doc.data());

    //run the query
    let thesis = await getDocs(q).then(async (snapshot) => {
      let proposals = [];
      snapshot.forEach((doc) => {
        let proposal = doc.data();
        let teacher = teachers.find(
          (teacher) => teacher.id == proposal.teacherId
        );
        proposal.supervisor = teacher.name + " " + teacher.surname;
        proposals.push(proposal);
      });
      return proposals;
    });

    // nothing found
    if (thesis.length == 0) {
      thesisCache = [];
      return { status: 200, thesis: [] };
    }

    // order the thesis
    orderByArray.slice().reverse().forEach((orderBy) => {
      thesis = orderThesis(thesis, orderBy);
    });

    // update the current snapshot
    thesisCache = thesis;

    // page the thesis
    let index; 
    if (lastThesisID !== undefined)
      index = thesis.findIndex(proposal => proposal.id === lastThesisID);
    else 
      index = -1;

    // If the ID is not found, index will be -1
    let page = [];

    page = thesis.slice(index + 1, index + 4);
    console.log(page.map(p => p.id));
    return { status: 200, thesis: page };
  } catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
};

/**
 * Get the values of a specific field from all the thesis proposals.
 * @param {string} DBfield The field of the DB to get the values from
 * @returns {Array} Prints the values of the field
 */
const getValuesForField = (DBfield) => {
  const values = [];
  thesisCache.forEach(proposal => {
    let value = proposal[DBfield];
    if (Array.isArray(value))
      value.forEach(v => {
        if (!values.includes(v))
          values.push(v);
      });
    else if (!values.includes(value))
      values.push(value);
  })
  return values;
}

const getThesisNumber = async () => {
  try {
    console.log("Getting thesis number: " + thesisCache.length);
    return {status: 200, number: thesisCache.length};
  }
  catch (error) {
    console.log(error);
    return { status: 500, err: error };
  } 
}; 


const getThesisWithId = async (ID) => {
  console.log("Testing getThesisWithID")

  //QUERY CONDITIONS
  const whereCond1 = where("id", "==", Number(ID))
  const qThesis = query(thesisProposalsRef, whereCond1)

  try {
    const thesisSnapshot = await getDocs(qThesis)
    if (!thesisSnapshot.empty) {
      const thesis = thesisSnapshot.docs[0].data();
      let teachersSnap = await getDocs(teachersRef);
      let teachers = teachersSnap.docs.map(doc => doc.data());
      let teacher = teachers.find(t => t.id == thesis.teacherId);
      thesis.supervisor = teacher.name + ' ' + teacher.surname;
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
 * Add a new application into the server
 * @param application the application object (look model/Application)
 * @return null
 */
const addApplication = async (application) => {
  //console.log(application.curriculum)
  if (auth.currentUser) {
    if (StringUtils.checkId(application.studentId, auth.currentUser.email)) {
      try {
        let fileRef
        if(application.curriculum){
          fileRef = ref(storage, StringUtils.createApplicationPath(storageCurriculums, application.studentId, application.thesisId, application.curriculum.name) )
          await uploadBytes(fileRef, application.file)
        }
        
        console.log(application.parse(fileRef? fileRef.fullPath : null))
        addDoc(applicationsRef, application.parse(fileRef? fileRef.fullPath : null )).then(doc => {
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

/** Retrive the list of applications of all the thesis of a theacher.
 * 
 * @param {int} professorId 
 * @param {bool} state possible values: [null (pending), true (accepted), false (rejected)]
 * 
 * @returns {{status: code, applications: [{id: , studentID: , thesisTitle: }, ...]}}
 * Possible values for status: [200 (ok), 500 (internal server error), 404 (not found)].
 * Possible values for applications [array (in case of success), null (in case of error)]
 */
const getApplications = (professorId, state) =>
{

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
        //applicationSnapshot.forEach(e => { console.log(e) })
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

/**
 * Retrieve the applications of the student by the applications' state
 * @param state the state of applications you are searching for
 * @return the applications' array
 * 
 */
const getApplicationsByState = async (state) => {
  if (auth.currentUser) {
    if (await isStudent(auth.currentUser.email)) {
      
      const stateValue = null;

      if (state==="Accepted") {
        stateValue = true;
      } else if (state==="Rejected") {
        stateValue = false;
      }

      /*const mockApp = [
          {
            "studentId": "s789012",
            "accepted": true,
            "date": "2022-12-05T16:40:00.000Z",
            "thesisId": 0,
            "curriculum": null,
            "thesisTitle": "Instrumenting Kubernetes 5G services with eBPF probes",
            "thesisDescription": "Description for Thesis Proposal 1",
            "teacherName": "John",
            "teacherSurname": "Smith"
          },
          {
              "studentId": "s789012",
              "accepted": true,
              "date": "2022-12-05T16:40:00.000Z",
              "thesisId": 1,
              "curriculum": null,
              "thesisTitle": "Instrumenting Kubernetes 5G services with eBPF probes",
              "thesisDescription": "Description for Thesis Proposal 1",
              "teacherName": "John",
              "teacherSurname": "Smith"
          }];*/

      //SELECT
      //FROM
      //WHERE studentId=auth.currentUser.id accepted=stateValue


    } else {
      return CONSTANTS.unauthorized;
    }
  } else {
    return CONSTANTS.notLogged;
  }

}

/** API similar to getApplication, but returns data organized in  a different way.
 * 
 * @param {int} id 
 * 
 * @returns {{status: code, 
 *            bool_cvExists: , 
 *            application: {studentName: , 
 *                          carreer: [{codCourse: , 
 *                                    titleCourse: , 
 *                                    grade: , 
 *                                    date: , 
 *                                    cfu: }, ...]
 *          }}}
 * 
 * Possible values for status: [200 (ok), 500 (internal server error), 404 (not found)].
 * Application is null in case of error.
 */
const getApplicationDetails = (id) =>
{

}

/**
 * 
 * @param {int} id of the application.
 * 
 * @returns {{status: code, url: }} (which will trigger the download of the cv file)
 */
const getCVOfApplication = (id) =>
{

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

//Structure of a correct thesis proposal
const predefinedProposalStructure = {
  archiveDate: "" /* ATTENTION this must be a string */,
  coSupervisors: [],
  description: "",
  expirationDate: "" /* ATTENTION this must be a string */,
  groups: [],
  id: 0,
  keywords: [],
  level: "",
  notes: "",
  programmes: "",
  requiredKnowledge: "",
  teacherId: "",
  title: "",
  type: "",
};

// Sample data representing a thesis proposal
/*const thesisProposalData = {
  archiveDate: new Date('2023-12-31'), // Replace with your timestamp
  coSupervisors: ["Supervisor 1", "Supervisor 2"],
  description: "Does it work??",
  expirationDate: new Date('2024-01-31'), // Replace with your timestamp
  groups: ["Group 1", "Group 2"],
  id: 1, // Replace with your ID
  keywords: ["Keyword 1", "Keyword 2"],
  level: "Master's", // Replace with your level
  notes: "Additional notes for the proposal.",
  programmes: "Programme name", // Replace with your programme
  requiredKnowledge: "Required knowledge for the proposal.",
  teacherId: "d456789", // Replace with your teacher ID
  title: "Thesis Proposal Title",
  type: "Type of thesis", // Replace with your type
};*/

const insertProposal = async (thesisProposalData) => {
  console.log("Logged teacher =",+ auth.currentUser.email);
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };


  const validateThesisProposalData = (data) => {

    //Validation that the proposal meets the structure requirements
    const keys1 = Object.keys(thesisProposalData);
    const keys2 = Object.keys(predefinedProposalStructure);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) {
      console.log("part1")
      return false;
    }
    // Check if all keys in obj1 exist in obj2 and have the same type
    for (const key of keys1) {
      if (!(key in predefinedProposalStructure) || typeof thesisProposalData[key] !== typeof predefinedProposalStructure[key]) {
        console.log("part2")
        console.log(key)
        return false;
      }
    }

    //null values validation
    const keys = Object.keys(data);
    for (const key of keys) {
      if (key !== 'notes' && data[key] === null) {
        console.log("part3")
        return false;
      }
    }
    return true;
  };

  if (!validateThesisProposalData(thesisProposalData)) {
    console.log("Validation failed: proposal data doesnt comply with required structure");
    return { status: 400, err: "Proposal data doesnt comply with required structure" };
  }

  //Check that the teachers id is an id inside the teachers table
  if (!isTeacherById(thesisProposalData.id)) {
    console.log("Validation failed: the proposed teacher is not present in our database");
    return { status: 400, err: "The proposed teacher is not present in our database" };
  }

  try {
    //first we get the groups from the teacher and the supervisors
    var groupsAux = [];
    const userGroups = await getGroupsById(thesisProposalData.teacherId);
    groupsAux.push(userGroups);

    for (const cs in thesisProposalData.coSupervisors){
      const g = await getGroups(thesisProposalData.coSupervisors[cs]);
      if(g){groupsAux.push(g)};
    }
   
    console.log("Found groups: "+ groupsAux);

    //We update the thesisProposalData with the obtained groups and calculated id
    thesisProposalData.groups = groupsAux;
    thesisProposalData.id = await getThesisNumber()+1;
    const docRef = await addDoc(thesisProposalsRef, thesisProposalData);
    console.log("Thesis proposal added with ID: ", docRef.id);
    return { status: 200, id: docRef.id };
  } catch (error) {
    console.error("Error adding thesis proposal: ", error);
    return { status: 500 }; // or handle the error accordingly
  }
};

const API = {
  getThesis, getAllThesis, getThesisWithId, getThesisNumber, getValuesForField,
  changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser,
  addApplication, retrieveCareer, getTitleAndTeacher, getApplication, getApplications, getApplicationDetails, getCVOfApplication,
  removeAllProposals, insertProposal, loginWithSaml,
  getApplicationsByState
};

//insertProposal(thesisProposalData);


export default API;
