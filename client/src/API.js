"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, updateDoc, where, setDoc, deleteDoc, getDoc, limit, startAfter, orderBy } from 'firebase/firestore';
import { signInWithRedirect, SAMLAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getBlob, getDownloadURL, getStorage, getStream, ref, uploadBytes} from "firebase/storage";

import dayjs from 'dayjs';
import Teacher from './models/Teacher.js';
import Student from './models/Student.js';
import Career from './models/Career.js';
import Application from './models/Application.js';
import ThesisProposal from './models/ThesisProposal.js';

import StringUtils from './utils/StringUtils.js';
import CONSTANTS from './utils/Constants.js';
import MessageUtils from './utils/MessageUtils.js';
import ApplicationUtils from './utils/ApplicationUtils.js';
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
const mailRef = collection(db, "mail");

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

const getUsers = async (ids) => {
  const users = await Promise.all(ids.map(async (id) => {
    const user = await getUserById(id)
    return user
  }))
  console.log(users)
  return users
}

const getUserById = async (id) => {
  let user = null
  const whereCond = where("id", "==", id)
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

  console.log(user)
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


//---------------------GET THESIS -----------------------------

/**
 * Build the where conditions for the query
 * @param filters the filters object
 * @returns an array of where conditions
 */
const buildWhereConditions = async (filters) => {
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
    console.log(whereConditions);
  }

  if (filters.coSupervisors && filters.coSupervisors.length > 0) {
    let coSupervisors = filters.coSupervisors;
    whereConditions.push(where("coSupervisors", "array-contains-any", coSupervisors));
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

  if (filters.groups && filters.groups.length > 0) {
    let group = filters.groups;
    whereConditions.push(where("groups", "array-contains-any", [group]));
  }

  if (filters.programmes && filters.programmes.length != '') {
    let programme = filters.programmes;
    whereConditions.push(where("programmes", "==", programme));
  }

  return whereConditions;
};

/**
 * Order all the thesis given an array of orderBy conditions.
 * @param thesis the thesis to order
 * @param {[{DBfield: "title", mode: "ASC"}, ...]} orderByArray the array of orderBy conditions
 */
const orderThesis = (thesis, orderByField) => {
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

/**
 * Check if the filters object is empty
 * @param filters the filters object
 * @returns true if the filters object is empty, false otherwise
 */
const isFiltersEmpty = (filters) => {
  if (filters === undefined) return true;
  let empty = true;
  Object.keys(filters).forEach((key) => {
    if (Array.isArray(filters[key])) {
      if (filters[key].length > 0) {
        empty = false;
      }
    } else if (key === 'expirationDate') {
      if (filters[key].from !== "" || filters[key].to !== "") {
        empty = false;
      }
    } else if (filters[key] !== "") {
      empty = false;
    }
  });

  return empty;
};

/**
 * Get the values of a specific field from all the thesis proposals.
 * @param {string} DBfield The field of the DB to get the values from
 * @returns {Array} Prints the values of the field
 */
const getValuesForField = (DBfield) => {
  try {
    if (FILTER_FORM_VALUES === undefined)
      return [""];
    return FILTER_FORM_VALUES[DBfield];
  } catch (error) {
    console.log(error);
    return [""];
  }
}

const setValuesForField = (thesis, DBfield) => {
  const values = [];
  thesis.forEach(proposal => {
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

let THESIS_CACHE = [];
let FILTER_FORM_VALUES;

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
const getThesis = async (filters, orderByArray, lastThesisID, entry_per_page) => {
  try {
    if (!auth.currentUser) {
      return CONSTANTS.notLogged;
    }

    let index = -1;

    console.log(`filters: ${JSON.stringify(filters)}`);

    // load of the first page
    if (lastThesisID === undefined) {
      // add filters to the query
      let whereConditions = await buildWhereConditions(filters);
      // if the user is a teacher, show only his thesis
      if (await isTeacher(auth.currentUser.email)) {
        let thisTeacherId = await getDocs(
          query(teachersRef, where("email", "==", auth.currentUser.email))
        ).then((snap) => snap.docs[0].data().id);
        whereConditions.push(where("teacherId", "==", thisTeacherId));
      } else if (await isStudent(auth.currentUser.email)) {
        // if the user is a student, show only thesis of his degree
        let studentCodDegree = await getDocs(
          query(studentsRef, where("email", "==", auth.currentUser.email))
        ).then((snap) => snap.docs[0].data().cod_degree);
        let titleDegree = await getDocs(
          query(degreesRef, where("codDegree", "==", studentCodDegree))
        ).then((snap) => snap.docs[0].data().titleDegree);
        whereConditions.push(where("programmes", "==", titleDegree));
      }

      // show only active thesis
      whereConditions.push(where("archiveDate", ">", await getVirtualDate()));

      // compose the query
      let q = query(thesisProposalsRef, ...whereConditions);

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

      // order the thesis
      if (thesis.length != 0) {
        if (orderByArray[0] === 'title')
          thesis.orderThesis(thesis, orderByArray[0])
        else
          orderByArray.slice().reverse()
            .forEach((orderBy) => { thesis = orderThesis(thesis, orderBy); });
      }

      if (isFiltersEmpty(filters)) {
        // save the values of the attributes for the filter form
        console.log("Setting values for filter form")
        let formValues = {};
        Object.keys(filters).forEach((key) => {
          if (key === 'teacherName')
            formValues['supervisor'] = setValuesForField(thesis, 'supervisor');
          else if (key !== 'expirationDate' && key !== 'title')
            formValues['' + key] = setValuesForField(thesis, key)
        });
        FILTER_FORM_VALUES = formValues;
      } else {
        // filter the thesis on title and expiration date
        if (filters.title !== undefined && filters.title !== '') {
          
          thesis = thesis.filter((proposal) => proposal.title.toLowerCase().includes(filters.title.toLowerCase()));
        }

        if (filters.expirationDate !== undefined && (filters.expirationDate.from !== '' || filters.expirationDate.to !== '')) {
          
          thesis = thesis.filter((proposal) => {
            let from = filters.expirationDate.from;
            let to = filters.expirationDate.to;
            let expirationDate = proposal.expirationDate;
            if (from !== '' && to !== '') {
              return dayjs(expirationDate).isBetween(from, to, null, '[]');
            } else if (from !== '') {
              return dayjs(expirationDate).isAfter(from);
            } else if (to !== '') {
              return dayjs(expirationDate).isBefore(to);
            }
          });
        }
      }

      // update the current snapshot
      THESIS_CACHE = thesis;
    }
    // when a new page is requested
    else
      index = THESIS_CACHE.findIndex((proposal) => proposal.id === lastThesisID);

    // If the ID is not found, index will be -1
    let page = [];

    page = THESIS_CACHE.slice(index + 1, index + entry_per_page);
    return { status: 200, thesis: page };
  } catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
};

const getThesisNumber = async () => {
  try {
    return { status: 200, number: THESIS_CACHE.length };
  }
  catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
};


const getThesisWithId = async (ID) => {

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
      if (!teacher) return MessageUtils.createMessage(404, "error", "No teacher found");
      thesis.supervisor = teacher.name + ' ' + teacher.surname;

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


//---------------------------OTHER FUNCTIONALITIES----------------------------------

/**
 * Add a new application into the server
 * @param application the application object (look model/Application)
 * @return null
 */
const addApplication = async (application) => {
  
  if (!auth.currentUser) return CONSTANTS.notLogged;

  if (!StringUtils.checkId(application.studentId, auth.currentUser.email)) return CONSTANTS.unauthorized;
  
  
  try {
    let fileRef
    if (application.curriculum) {
      fileRef = ref(storage, StringUtils.createApplicationPath(storageCurriculums, application.studentId, application.thesisId, application.curriculum.name))
      await uploadBytes(fileRef, application.file)
    }

    console.log(application.parse(fileRef ? fileRef.fullPath : null))
    addDoc(applicationsRef, application.parse(fileRef ? fileRef.fullPath : null)).then(doc => {
      console.log("Added application with id:" + doc.id)
      return "Application sent"
    })
  } catch (e) {
    console.log(e)
    throw (e)
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
 * @param {bool} status possible values: [null (pending), true (accepted), false (rejected)]
 * 
 * @returns {{status: code, applications: [[{id: , applicationDate: , student: {...}},{},...],[], ...]}}
 * Possible values for status: [200 (ok), 500 (internal server error), 404 (not found)].
 * Possible values for applications [array (in case of success), null (in case of error)]
 */
const getApplicationsForProfessor = async (status) => {
  console.log(status)
  if (!auth.currentUser) {
    return MessageUtils.createMessage(500, "error", "Server error")
  }
  const user = await API.getUser(auth.currentUser.email)
  console.log(user.id)
  const whereProfessorId = where("teacherId", "==", user.id)
  const whereStatus = where("accepted", "==", status)
  const q = query(applicationsRef, whereProfessorId, whereStatus)
  const appSnaphot = await getDocs(q)
  console.log(appSnaphot.docs.length)
  const applications = appSnaphot.docs.map(doc => {
    const data = doc.data()
    const id = doc.id
    console.log(data)
    return new Application(id, data.studentId, data.thesisId, status, data.curriculum, data.date, data.teacherId, data.thesisTitle)
  })
  console.log(applications)
  const studentsIds = []
  applications.forEach(app => {
    if (!studentsIds.includes(app.studentId)) {
      //app.studentId
      studentsIds.push(app.studentId)
    }
  })
  const studentsInfo = await getUsers(studentsIds)
  console.log(studentsInfo)
  studentsInfo.forEach(e => { console.log(e) })
  const groupedApplications = ApplicationUtils.createApplicationsListGroupByThesis(applications, studentsInfo)
  console.log(groupedApplications)
  if (applications.length == 0) {
    return MessageUtils.createMessage(404, "error", "No data found")
  }
  return MessageUtils.createMessage(200, "applications", groupedApplications)
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
        surname: teacher.surname,
        id: teacher.id
      }
    }

  } catch (e) {
    console.log(e)
  }
}

/**
 * Retrieve the application by the id of the student and the id of the thesis
 * @param {string} studentId the id of the student
 * @param {string} thesisId the id of the thesis
 * @return the application object, null if the object doesn't exist
 * 
 */
const getApplication = async (studentId, thesisId) => {
  if (auth.currentUser) {
    if (StringUtils.checkId(studentId, auth.currentUser.email)) {
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
          const id = applicationSnapshot.docs[0].id
          return new Application(id, app.studentId, app.thesisId, app.accepted, app.curriculum, app.date, app.teacherId, app.thesisTitle)
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
}

/**
 * Retrieve the applications of the student by the applications' state
 * @param {string} state the state of applications you are searching for
 * @return the applications' array
 * 
 */
const getApplicationsForStudent = async (state) => {
  if (!auth.currentUser) return CONSTANTS.notLogged;


  if (!await isStudent(auth.currentUser.email)) return CONSTANTS.unauthorized;

  const user = await API.getUser(auth.currentUser.email);

  let stateValue = null;

  if (state === "Accepted") {
    stateValue = true;
  } else if (state === "Rejected") {
    stateValue = false;
  }

  //SELECT A.studentId, A.accepted, A.date, A.thesisId, P.title, P.description, T.name, T.surname
  //FROM applications A, teachers T, thesisProposals P
  //WHERE join && A.studentId=user.id && A.accepted=stateValue

  const whereStudentId = where("studentId", "==", user.id);
  const whereAccepted = where("accepted", "==", stateValue);

  const qApplication = query(applicationsRef, whereStudentId, whereAccepted);

  let applicationsArray = [];

  try {
    const applicationsSnapshot = await getDocs(qApplication)
    const applications = applicationsSnapshot.docs;
    for (let appl of applications) {

      const thesis = await API.getThesisWithId(appl.data().thesisId);
      if (thesis.error) return MessageUtils.createMessage(thesis.status, "error", thesis.error);

      const whereTeacherId = where("id", "==", thesis.teacherId);
      const qTeacher = query(teachersRef, whereTeacherId);
      const teacherSnapshot = await getDocs(qTeacher);
      if (teacherSnapshot.empty) return MessageUtils.createMessage(404, "error", "No teacher found");
      const returnedObject = {
        "studentId": appl.data().studentId,
        "accepted": appl.data().accepted,
        "date": appl.data().date,
        "thesisId": appl.data().thesisId,
        "thesisTitle": thesis.title,
        "thesisDescription": thesis.description,
        "thesisType": thesis.type,
        "teacherName": teacherSnapshot.docs[0].data().name,
        "teacherSurname": teacherSnapshot.docs[0].data().surname
      }

      //console.log(returnedObject);
      applicationsArray.push(returnedObject);

    }

    //console.log("Chiamata Api per " + state + " con risultato: " + applicationsArray);
    return applicationsArray;

  } catch (error) {
    console.log(error);
  }

}


/** API similar to getApplication, but returns data organized in  a different way.
 * 
 * @param {int} id 
 * 
 * @returns {{status: code, 
 *            curriculum: , path do cv if present, null otherwise 
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
const getApplicationDetails = async (id) => {
  if (!auth.currentUser) return MessageUtils.createMessage(401, "error", "Not logged in");
  const applicationRef = doc(db, "applications", id);
  const applicationSnapshot = await getDoc(applicationRef)
  if (!applicationSnapshot.exists()) return MessageUtils.createMessage(404, "error", "Application not found");
  const application = applicationSnapshot.data();
  const student = await getUserById(application.studentId);
  const career = await retrieveCareer(student.id);
  // console.log("Application details:");
  // console.log(application);
  // console.log("student");
  // console.log(student);
  // console.log("career");
  // console.log(career);

  const applicationDetails = {
    title: application.thesisTitle,
    student: student,
    curriculum: application.curriculum ? application.curriculum : null,
    career: career,
  };
  console.log("applicationDetails");
  console.log(applicationDetails);

  return MessageUtils.createMessage(200, "application", applicationDetails);
}

/**
 * 
 * @param {int} id of the application.
 * 
 * @returns {{status: code, url: }} (which will trigger the download of the cv file)
 */
const getCVOfApplication = async (path) => {
  console.log(path)
  const cvRef = ref(storage, path)

  try{
    const url = await getDownloadURL(cvRef)
    // console.log(url)
    return MessageUtils.createMessage(200, "url", url);
  } catch (e){
    return MessageUtils.createMessage(404, "error", e);
  }

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

    ids.forEach((id) => {
      const docRef = doc(db, collectionName, id);
      deleteDoc(docRef);
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
  teacherId: 0d456789", // Replace with your teacher ID
  title: "Thesis Proposal Title",
  type: "Type of thesis", // Replace with your type
};*/



const insertProposal = async (thesisProposalData) => {
  console.log("Logged teacher = " + auth.currentUser.email);
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  if (!validateThesisProposalData(thesisProposalData)) {
    console.log("Validation failed: proposal data doesnt comply with required structure");
    return { status: 400, err: "Proposal data doesnt comply with required structure" };
  }

  //Check that the teachers id is an id inside the teachers table
  if (!await isTeacherById(thesisProposalData.teacherId)) {
    console.log("Validation failed: the proposed teacher is not present in our database");
    return { status: 400, err: "The proposed teacher is not present in our database" };
  }

  try {
    //first we get the groups from the teacher and the supervisors
    var groupsAux = [];
    const userGroups = await getGroupsById(thesisProposalData.teacherId);
    groupsAux.push(userGroups);

    for (const cs in thesisProposalData.coSupervisors) {
      const g = await getGroups(thesisProposalData.coSupervisors[cs]);
      if (g) { groupsAux.push(g) };
    }

    console.log("Found groups: " + groupsAux);

    //We update the thesisProposalData with the obtained groups and calculated id
    thesisProposalData.groups = groupsAux;
    thesisProposalData.id = await getNextThesisId();
    const docRef = await addDoc(thesisProposalsRef, thesisProposalData);
    console.log("Thesis proposal added with ID: ", docRef.id);
    return { status: 200, id: docRef.id };
  } catch (error) {
    console.error("Error adding thesis proposal: ", error);
    return { status: 500 }; // or handle the error accordingly
  }
};

const getNextThesisId = async () => {
  const qThesis = query(thesisProposalsRef);

  try {
    const thesisSnapshot = await getDocs(qThesis);
    const thesisArray = thesisSnapshot.docs.map((t) => t.data().id);

    //thesisArray.forEach((id) => console.log("thesisArray[i]: " + id));

    return (Math.max(...thesisArray)) + 1;
  } catch (error) {
    console.log(error);
  }
}

const getDegree = async () => {
  try {
    const q = query(degreesRef);
    const snapshot = await getDocs(q);

    const titles = snapshot.docs.map((doc) => doc.data().titleDegree);

    return titles.length > 0 ? titles : null;
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return null;
  }
};

/**
 * Accept an application and decline all the others for the same thesis
 * @param {string} applicationId id of the accepted application
 * @returns {{ status: code }}
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)]
 */

const acceptApplication = async (applicationId) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  try {
    const applicationRef = doc(db, "applications", applicationId);
    const applicationSnapshot = await getDoc(applicationRef);
    if (!applicationSnapshot.exists()) return { status: 404, err: "Application not found" };
    const application = applicationSnapshot.data();
    if (application.accepted) return { status: 400, err: "Application already accepted" };
    await updateDoc(applicationRef, { accepted: true });
    // decline all the other applications for the same thesis
    const otherApplications = await getDocs(query(applicationsRef, where("thesisId", "==", application.thesisId)));
    otherApplications.forEach(async (doc) => {
      if (doc.id !== applicationId) {
        await updateDoc(doc.ref, { accepted: false });
      }
    });
    // archive the thesis
    const thesisSnapshot = await getSnapshotThesis(application.thesisId);
    await updateDoc(thesisSnapshot.snapshot.ref, { archiveDate: await getVirtualDate() });
    return { status: 200 };
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return { status: 500 };
  }
};

/**
 * Decline an application
 * @param {string} applicationId id of the declined application
 * @returns {{ status: code }}
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)]
 */
const declineApplication = async (applicationId) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  try {
    const applicationRef = doc(db, "applications", applicationId);
    const applicationSnapshot = await getDoc(applicationRef);
    if (!applicationSnapshot.exists()) return { status: 404, err: "Application not found" };
    const application = applicationSnapshot.data();
    if (application.accepted === false) return { status: 400, err: "Application already declined" };

    await updateDoc(applicationRef, { accepted: false });
    return { status: 200 };
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return { status: 500 };
  }
}

/**
 * Archive a thesis
 * @param {string} thesisId id of the thesis to archive
 * @returns {{ status: code }}
 * Possible values for status: [200 (ok), 401 (unauthorized), 404 (not found) 500 (server error)]
 */
const archiveThesis = async (id) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  try {
    // check if the thesis exists and retrieve it
    const thesisSnapshot = await getSnapshotThesis(id);
    if (thesisSnapshot.snapshot.ref == null) return { status: 404, err: "Thesis not found" };
    await updateDoc(thesisSnapshot.snapshot.ref, { archiveDate: await getVirtualDate() });
    // decline all the applications for the thesis
    const pendingApplications = await getApplicationsByStateByThesis("Pending", id);
    pendingApplications.forEach(async (snap) => {
      await updateDoc(snap.ref, { accepted: false });
    });
    return { status: 200 };
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return { status: 500 };
  }
}

/**
 * Delete a thesis
 * @param {string} id id of the thesis to delete
 * @returns {{ status: code }} //if no errors occur
 * @returns {{ status: code, error: err}} //if errors occur
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 500 (server error)]
 */
const deleteProposal = async (id) => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, error: "User is not a teacher" };

  try {
    //check if the thesis is already archived
    const thesis = await getThesisWithId(id);
    const today = await getVirtualDate();
    //console.log("archiveDate: " + thesis.archiveDate);
    //console.log("today: " + today);
    if (thesis.archiveDate <= today) return { status: 400, error: `You can not delete a thesis that is already archived`};


    //All the pending and rejected applications must become cancelled + email
    const pendingApplications = await getApplicationsByStateByThesis("Pending", id);
    const rejectedApplications = await getApplicationsByStateByThesis("Rejected", id);

    pendingApplications.forEach( async (snap) => {
      await updateDoc(snap.ref, { accepted: "Cancelled" });
      //manda email allo user
    })
    //console.log(pendingApplications.length + " pending fatte");

    // sending a mail to the student to notify the application has been cancelled  
    // TODO move in to the loop for pendingApplications and change the reciver email
    if (pendingApplications.length>0) {
      const student = await getUserById(pendingApplications[0].data().studentId);
      const thesisR = await getThesisWithId(id);
      const subject = "Thesis proposal cancelled";
      const text = `Dear ${student.name} ${student.surname},\n\nWe regret to inform you that the thesis proposal "${thesisR.title}" has been removed by the teacher ${thesisR.supervisor} and therefore your application deleted.\n\nBest regards,\nStudent Secretariat`;
      await addDoc(mailRef, { to: "ADD YOUR EMAIL", subject: subject, text: text });
    }


    rejectedApplications.forEach( async (snap) => {
      await updateDoc(snap.ref, { accepted: "Cancelled" });
    })
    //console.log(rejectedApplications.length + " rejected fatte");


    //delete thesis
    const snapshotThesis = await getSnapshotThesis(id);
    await deleteDoc(snapshotThesis.snapshot.ref);
    return { status: 200 };
  } catch (error) {
    return { status: 500, error: `Error in calling Firebase: ${error}`};
  }

}


/**
 * Get the snapshot of the thesis by the thesis id
 * @param {string} id id of the thesis
 * @returns {{ status: code, snapshot: snapshot}} //if no errors occur
 * @returns {{ status: code, error: err}} //if errors occur
 * Possible values for status: [200 (ok), 401 (unauthorized), 404 (non found), 500 (server error)]
 */
const getSnapshotThesis = async (id) => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };

  const whereThesisId = where("id", "==", Number(id));

  const qThesis = query(thesisProposalsRef, whereThesisId);
  try {
    const thesisSnapshot = await getDocs(qThesis);
    if (thesisSnapshot.empty) return { status: 404, error: `No thesis found`};
    return { status: 200, snapshot: thesisSnapshot.docs[0]};
  } catch (error) {
    return { status: 500, error: `Error in calling Firebase: ${error}`};
  }

}

/**
 * Retrieve the snapshot applications for a thesis by the applications' state
 * @param {string} state the state of applications you are searching for
 * @param {string} id the id of the thesis
 * @return the applicationsSnapshots' array
 * 
 */
const getApplicationsByStateByThesis = async (state, id) => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };

  let stateValue = null;

  if (state === "Accepted") {
    stateValue = true;
  } else if (state === "Rejected") {
    stateValue = false;
  }

  //SELECT snapshot(A)
  //FROM applications A
  //WHERE A.accepted = stateValue && A.thesisId = id

  const whereThesisId = where("thesisId", "==", Number(id));
  const whereAccepted = where("accepted", "==", stateValue);

  const qApplication = query(applicationsRef, whereThesisId, whereAccepted);

  try {
    const applicationsSnapshot = await getDocs(qApplication);
    const applications = applicationsSnapshot.docs;
    return applications;
  } catch (error) {
    console.log(error);
  }
}

let lastSTRdoc = null;
let lastSTRqueryWhereConditions = null;

const getSTRlist = async (orderBy, reload, entry_per_page) =>
{
  return {status: 200, STRlist: thesis};

  if (!auth.currentUser) {
    return CONSTANTS.notLogged;
  }

  if (await isStudent(auth.currentUser.email)) return CONSTANTS.unauthorized;

  let whereConditions = [];

  try {
  
    let index = -1;

    //QUERY PREPARATION
    // DIFFERENT QUERY BASING ON THE NEED TO LOAD DATA FROM THE BEGINNING OR NOT

    // load of the first page
    if (reload || !lastSTRdoc || !lastSTRqueryWhereConditions) {
      // if the user is a teacher, show only the STR directed to him
      if (await isTeacher(auth.currentUser.email)) {
        let thisTeacherId = await getDocs(
          query(teachersRef, where("email", "==", auth.currentUser.email))
        ).then((snap) => snap.docs[0].data().id);
        whereConditions.push(where("teacherId", "==", thisTeacherId));
      }

      // show only STR from the past
      whereConditions.push(where("date", "<=", await getVirtualDate()));      //TO DO: check if the field name is correct
      
      //sorting
      for (let f of orderByArray)
      {
        whereConditions.push(orderBy(f.DBfield, f.mode));
      }

      //pagination
      whereConditions.push(limit(entry_per_page));

      lastSTRqueryWhereConditions = whereConditions;
      
      // compose the query
      let q = query(/*TO DO: ref to the STR table*/  ...whereConditions);
    }else // when a new page is requested
    {
      let q = query(lastSTRqueryWhereConditions, startAfter(lastSTRdoc));
    }

    //QUERY EXECUTION

    // prepare teacher array for name and surname
    let teachersSnap = await getDocs(teachersRef);
    let teachers = teachersSnap.docs.map((doc) => doc.data());

    //run the query
    let STRlist = await getDocs(q).then(async (snapshot) => {
      lastSTRdoc = snapshot[snapshot.length-1];
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

    return { status: 200, STRlist: STRlist };
  } catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
}

const getSTRlistLength = async () =>
{
  return {status: 200, length: thesis.length};

  if (!auth.currentUser) {
    return CONSTANTS.notLogged;
  }

  if (await isStudent(auth.currentUser.email)) return CONSTANTS.unauthorized;

  /*------------QUERY PREPARATION ----------*/
  let whereConditions = [];

  if (await isTeacher(auth.currentUser.email)) {
    let thisTeacherId = await getDocs(
      query(teachersRef, where("email", "==", auth.currentUser.email))
    ).then((snap) => snap.docs[0].data().id);
    whereConditions.push(where("teacherId", "==", thisTeacherId));
  }

  // show only STR from the past
  whereConditions.push(where("date", "<=", await getVirtualDate()));      //TO DO: check if the field name is correct

  /*------------QUERY EXECUTION----------*/
  let q = query(/*collection of STR*/ ...whereConditions);
  let length = await getDocs(q)
                      .then(d => d.data().count)
                      .catch(e => {console.log(e); return -1;});
  
  if (length >= 0) return {status: 200, length: length};
  else return {status: 500};
      
}

/**
 * API to accept/reject a new thesis request, Used only for secretaries users.
 * @param {string} id id of the thesis to accept/reject
 * @param {boolean} accept true to accept, false to reject
 * @returns {{ status: code, error: err}} // return of the API
 * Possible values for status: [200 (ok), 401 (unauthorized), 404 (non found), 500 (server error)]
 */

const acceptRejectRequest = async (id, accept) => {

}

const API = {
  getThesis, /*getAllThesis,*/ getThesisWithId, getThesisNumber, getValuesForField,
  changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser, loginWithSaml,
  addApplication, retrieveCareer, getTitleAndTeacher, getApplication, getApplicationsForProfessor, getApplicationDetails, getCVOfApplication, acceptApplication, declineApplication,
  removeAllProposals, insertProposal, archiveThesis, deleteProposal,
  getApplicationsForStudent, getDegree,
  getSTRlist, getSTRlistLength
};


export default API;

/*
console.log("Rejected:");
await getApplicationsByState("Rejected", "s901234"); //3

console.log("Accepted:");
await getApplicationsByState("Accepted", "s901234"); //1

console.log("Pending:");
await getApplicationsByState("Pending", "s901234"); //0
*/