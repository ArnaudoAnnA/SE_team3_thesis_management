"use strict;"

import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, doc, query, getDocs, updateDoc, where, or, and, setDoc, deleteDoc, getDoc, limit, startAfter, orderBy } from 'firebase/firestore';
import { signInWithRedirect, SAMLAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import dayjs from 'dayjs';
import Teacher from './models/Teacher.js';
import Student from './models/Student.js';
import Career from './models/Career.js';
import Application from './models/Application.js';

import StringUtils from './utils/StringUtils.js';
import CONSTANTS from './utils/Constants.js';
import MessageUtils from './utils/MessageUtils.js';
import ApplicationUtils from './utils/ApplicationUtils.js';
import Secretary from './models/Secretary.js';
import ThesisRequest from './models/ThesisRequest.js';

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
const thesisRequestsRef = DEBUG ? collection(db, 'test-thesisRequests') : collection(db, "thesisRequests");
const secretariesRef = DEBUG ? collection(db, 'test-secretaries') : collection(db, "secretaries");

const storageCurriculums = "curriculums/"


/*--------------- Utils APIs -------------------------- */

/**
 * Return if the user is a secretary
 * @param email the email of the user
 * @return true if the user is a secretary, false otherwise
 */
const isSecretary = async (email) => {
  const whereCond = where("email", "==", email)
  const q = query(secretariesRef, whereCond)
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

const getStudent = async (email) => {
  const whereCond = where("email", "==", email)
  const q = query(studentsRef, whereCond)
  const snapshot = await getDocs(q);
  return snapshot.docs[0];
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
      // console.log(userCredentials)
    })
    .catch((error) => {
      console.log(error)
    });

}

const logIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      if (!DEBUG) console.log(userCredentials)
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
  signOut(auth).catch((error) => {
    console.log(error)
  })
}

const getUser = async (email) => {
  let user = null
  const whereCond = where("email", "==", email)
  const qStudent = query(studentsRef, whereCond)
  const qTeacher = query(teachersRef, whereCond)
  const secretaryRef = doc(secretariesRef, email)
  const secSnap = await getDoc(secretaryRef)
  if (secSnap.exists()) {
    user = new Secretary(secSnap.data().id, secSnap.data().surname, secSnap.data().name, secSnap.data().email)
    return user
  }


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
  // console.log(users)
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

  if (filters.groups) {
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

const getCurrentStudentDegree = async () => {
  let studentCodDegree = await getDocs(
    query(studentsRef, where("email", "==", auth.currentUser.email))
  ).then((snap) => snap.docs[0].data().cod_degree);
  let titleDegree = await getDocs(
    query(degreesRef, where("codDegree", "==", studentCodDegree))
  ).then((snap) => snap.docs[0].data().titleDegree);

  return titleDegree;
}

const fillFilterFormValues = (filters, thesis) => {
  if (!isFiltersEmpty(filters)) return FILTER_FORM_VALUES;
  let formValues = {};
  Object.keys(filters).forEach((key) => {
    if (key === 'teacherName')
      formValues['supervisor'] = setValuesForField(thesis, 'supervisor');
    else if (key !== 'expirationDate' && key !== 'title')
      formValues['' + key] = setValuesForField(thesis, key)
  });
  return formValues;
}

const filterProposalsWithExpirationDate = (thesis, filters) => {
  if (isFiltersEmpty(filters) || filters.expirationDate === undefined || (filters.expirationDate.from === '' && filters.expirationDate.to === '')) return thesis;
  let from = filters.expirationDate.from;
  let to = filters.expirationDate.to;
  return thesis.filter(proposal => {
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

const filterProposalsWithTitle = (thesis, filters) => {
  if (isFiltersEmpty(filters) || filters.title === undefined || filters.title === '') return thesis;
  return thesis.filter((proposal) => proposal.title.toLowerCase().includes(filters.title.toLowerCase()));
}

const getCurrentTeacherId = async () => {
  let thisTeacherId = await getDocs(
    query(teachersRef, where("email", "==", auth.currentUser.email))
  ).then((snap) => snap.docs[0].data().id);
  return thisTeacherId;
}

const calculateIndex = (lastThesisID) => {
  if (lastThesisID === undefined) return -1;
  return THESIS_CACHE.findIndex((proposal) => proposal.id === lastThesisID);
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
  * @param {bool} archive true in case the request is for archived thesis
  * 
  * @returns an object with two properties:
  * - status, contains the status code of the request;
  * - err, contains some details in case of error, otherwise null;
  * - thesis, contains the array of thesis in case of success, otherwise null.
 */
const getThesis = async (filters, orderByArray, lastThesisID, entry_per_page, archive) => {
  try {
    if (!auth.currentUser) {
      return CONSTANTS.notLogged;
    }

    let index = calculateIndex(lastThesisID);

    // load of the first page
    if (index === -1) {

      // add filters to the query
      let whereConditions = await buildWhereConditions(filters);

      // show thesis of current user
      if (await isTeacher(auth.currentUser.email)) {
        whereConditions.push(where("teacherId", "==", await getCurrentTeacherId()));
      }
      else if (await isStudent(auth.currentUser.email)) {
        whereConditions.push(where("programmes", "==", await getCurrentStudentDegree()));
      }

      // show active or archived thesis
      whereConditions.push(where("archiveDate", archive ? "<=" : ">", await getVirtualDate()));

      // compose the query
      let q = query(thesisProposalsRef, ...whereConditions);

      // prepare teacher array for name and surname substitution
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
      if (!orderByArray[0] == 'title' && thesis.length > 0)
        orderByArray.slice().reverse().forEach((orderBy) => { thesis = orderThesis(thesis, orderBy); });
      else
        thesis = orderThesis(thesis, orderByArray[0])

      thesis = filterProposalsWithTitle(thesis, filters);
      thesis = filterProposalsWithExpirationDate(thesis, filters);

      // save the values of the attributes for the filter form
      FILTER_FORM_VALUES = fillFilterFormValues(filters, thesis);

      // update the current snapshot
      THESIS_CACHE = thesis;
    }

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

      return { status: 200, thesis: thesis }
    } else {
      console.log("Thesis not found");
      return { status: 404, error: "Thesis not found" }
    }
  } catch (e) {
    console.log("Error:", e);
    return { status: 500, error: "Error in calling Firebase:" + e }
  }
}


//---------------------------OTHER FUNCTIONALITIES----------------------------------

/**
 * Add a new application into the server
 * @param application the application object (look model/Application)
 * @return null
 */
const addApplication = async (application, teacher) => {

  if (!auth.currentUser) {
    return { status: 401, message: "Unauthorized" }
  }

  if (!await isStudent(auth.currentUser.email)) {
    return { status: 401, message: "Not a student" }
  }

  // get student name surname from the database using application.studentId
  const studentSnap = await getDocs(query(studentsRef, where("id", "==", application.studentId)));
  const studentData = studentSnap.docs[0].data();
  if (!studentData)
    return { status: 404, message: "Student not found" }

  // get thesisTitle from the database using application.thesisId
  const thesisSnap = await getDocs(query(thesisProposalsRef, where("id", "==", application.thesisId)));
  const thesisData = thesisSnap.docs[0].data();
  if (!thesisData)
    return { status: 404, message: "Thesis not found" }

  try {
    let fileRef
    if (application.curriculum) {
      fileRef = ref(storage, StringUtils.createApplicationPath(storageCurriculums, application.studentId, application.thesisId, application.curriculum.name))
      // console.log(application.file)
      await uploadBytes(fileRef, application.curriculum)
    }

    // console.log(application.parse(fileRef ? fileRef.fullPath : null))
    addDoc(applicationsRef, application.parse(fileRef ? fileRef.fullPath : null)).then(doc => {
      const subject = "New Application";
      const text = `Dear ${teacher.name} ${teacher.surname},<br /><br />We are pleased to inform you that you received a new application for the thesis proposal "${application.thesisTitle}".<br /><br />Best regards,<br />Segreteria Politecnico`;
      const from = {
        "name": studentData.name,
        "surname": studentData.surname,
        "id": application.studentId,
        "email": studentData.email
      }

      sendEmail(teacher.email, subject, text, from, thesisData.title, null, doc.id, null).then();
      // console.log("Added application with id:" + doc.id)
      return { status: 200, message: "Application sent" }
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
  // console.log("API.retrieveCareer")
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
 * @returns {Promise<{status: code, applications: [[{id: , applicationDate: , student: {...}},{},...],[], ...]}>}
 * Possible values for status: [200 (ok), 500 (internal server error), 404 (not found)].
 * Possible values for applications [array (in case of success), null (in case of error)]
 */
const getApplicationsForProfessor = async (status) => {
  // console.log(status)
  if (!auth.currentUser) {
    return MessageUtils.createMessage(500, "error", "Server error")
  }
  const user = await API.getUser(auth.currentUser.email)
  // console.log(user.id)
  const whereProfessorId = where("teacherId", "==", user.id)
  const whereStatus = where("accepted", "==", status)
  const q = query(applicationsRef, whereProfessorId, whereStatus)
  const appSnaphot = await getDocs(q)
  // console.log(appSnaphot.docs.length)
  const applications = appSnaphot.docs.map(doc => {
    const data = doc.data()
    const id = doc.id
    // console.log(data)
    return new Application(id, data.studentId, data.thesisId, status, data.curriculum, data.date, data.teacherId, data.thesisTitle)
  })
  // console.log(applications)
  const studentsIds = []
  applications.forEach(app => {
    if (!studentsIds.includes(app.studentId)) {
      //app.studentId
      studentsIds.push(app.studentId)
    }
  })
  const studentsInfo = await getUsers(studentsIds)
  // console.log(studentsInfo)
  // studentsInfo.forEach(e => { console.log(e) })
  const groupedApplications = ApplicationUtils.createApplicationsListGroupByThesis(applications, studentsInfo)
  // console.log(groupedApplications)
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
  // console.log("API.getTitleAndTeacher")
  const whereThesisId = where("id", "==", Number(thesisId))
  const qThesis = query(thesisProposalsRef, whereThesisId)
  try {
    const thesisSnapshot = await getDocs(qThesis)
    const thesis = thesisSnapshot.docs[0].data()
    const whereTheacherId = where("id", "==", thesis.teacherId)
    const qTeacher = query(teachersRef, whereTheacherId)
    const teacherSnapshot = await getDocs(qTeacher)
    const teacher = teacherSnapshot.docs[0].data()
    const obj = {
      title: thesis.title,
      teacher: new Teacher(teacher.id, teacher.surname, teacher.name, teacher.email, teacher.cod_group, teacher.cod_department)
    }
    return obj

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
    if (await isStudent(auth.currentUser.email)) {
      const whereThesisId = where("thesisId", "==", Number(thesisId))
      const whereStudentId = where("studentId", "==", studentId)

      const qApplication = query(applicationsRef, whereThesisId, whereStudentId)
      // console.log(qApplication)
      try {
        const applicationSnapshot = await getDocs(qApplication)
        // applicationSnapshot.forEach(e => { console.log(e) })
        if (applicationSnapshot.docs.length > 0) {
          // console.log("there is already a record")
          const app = applicationSnapshot.docs[0].data()
          const id = applicationSnapshot.docs[0].id
          const application = new Application(id, app.studentId, app.thesisId, app.accepted, app.curriculum, app.date, app.teacherId, app.thesisTitle)
          return MessageUtils.createMessage(200, "application", application)
        }
        // console.log("No records")
        return MessageUtils.createMessage(404, "error", "No records found")
      } catch (error) {
        console.log(error)
      }
    } else {
      return MessageUtils.createMessage(401, "error", "Unauthorized")
    }
  } else {
    return MessageUtils.createMessage(401, "error", "Not logged in")
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

      const whereTeacherId = where("id", "==", thesis.thesis.teacherId);
      const qTeacher = query(teachersRef, whereTeacherId);
      const teacherSnapshot = await getDocs(qTeacher);
      if (teacherSnapshot.empty) return MessageUtils.createMessage(404, "error", "No teacher found");
      const returnedObject = {
        "studentId": appl.data().studentId,
        "accepted": appl.data().accepted,
        "date": appl.data().date,
        "thesisId": appl.data().thesisId,
        "thesisTitle": thesis.thesis.title,
        "thesisDescription": thesis.thesis.description,
        "thesisType": thesis.thesis.type,
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
 * @returns {Promise<{status: code, 
 *            curriculum: , path do cv if present, null otherwise 
 *            application: {studentName: , 
 *                          carreer: [{codCourse: , 
 *                                    titleCourse: , 
 *                                    grade: , 
 *                                    date: , 
 *                                    cfu: }, ...]
 *          }}>}
 * 
 * Possible values for status: [200 (ok), 500 (internal server error), 404 (not found)].
 * Application is null in case of error.
 */
const getApplicationDetails = async (id) => {
  if (!auth.currentUser) return MessageUtils.createMessage(401, "error", "Not logged in");

  const collectionName = DEBUG ? "test-applications" : "applications";
  const applicationRef = doc(db, collectionName, id);
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

  return MessageUtils.createMessage(200, "application", applicationDetails);
}

/**
 * 
 * @param {int} id of the application.
 * 
 * @returns {Promise<{status: code, url: }>} (which will trigger the download of the cv file)
 */
const getCVOfApplication = async (path) => {
  // console.log(path)
  const cvRef = ref(storage, path)

  try {
    const url = await getDownloadURL(cvRef)
    // console.log(url)
    return MessageUtils.createMessage(200, "url", url);
  } catch (e) {
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

const titleAlreadyExist = async (thesis, mode, thesisId) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };

  let thesisSnap = await getDocs(thesisProposalsRef);
  let thesisList = thesisSnap.docs.map(doc => doc.data());
  let thesisExists = null;
  if (mode === "insert") {
    thesisExists = thesisList.find(t => t.title === thesis.title);
  } else {
    thesisExists = thesisList.filter(t => t.id !== Number(thesisId)).find(t => t.title === thesis.title);
  }

  return (thesisExists != undefined && thesisExists != []);
}

const validateThesisProposalData = (thesisProposalData) => {

  //Validation that the proposal meets the structure requirements
  const keys1 = Object.keys(thesisProposalData);
  const keys2 = Object.keys(predefinedProposalStructure);

  // Check if both objects have the same number of keys
  if (keys1.length !== keys2.length) {
    //console.log("part1")
    return false;
  }
  // Check if all keys in obj1 exist in obj2 and have the same type
  for (const key of keys1) {
    if (!(key in predefinedProposalStructure) || typeof thesisProposalData[key] !== typeof predefinedProposalStructure[key]) {
      //console.log("part2")
      // console.log(key)
      return false;
    }
  }

  //null values validation
  const keys = Object.keys(thesisProposalData);
  for (const key of keys) {
    if (key !== 'notes' && thesisProposalData[key] === null) {
      //console.log("part3")
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


/**
 * Insert a new thesis proposal into the server
 * @param thesisProposalData the data of the thesis proposal
 * @returns {Promise<{status: code, id: id, thesis: thesisProposalData, error: err}>}
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 500 (server error)]
 * Possible values for id: [id of the new thesis proposal, null (in case of error)]
 * Possible values for err: [error message, null (in case of success)]
 */
const insertProposal = async (thesisProposalData) => {
  //console.log("Logged teacher = " + auth.currentUser.email);
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  if (!validateThesisProposalData(thesisProposalData)) {
    console.log("Validation failed: proposal data doesnt comply with required structure");
    return { status: 400, error: "Proposal data doesnt comply with required structure" };
  }

  try {

    if (await titleAlreadyExist(thesisProposalData, "insert", null)) {
      return { status: 400, error: "A thesis with this title already exists" };
    } else {
      //first we get the groups from the teacher and the supervisors
      let groupsAux = [];
      const userGroups = await getGroupsById(thesisProposalData.teacherId);
      groupsAux.push(userGroups);

      for (const cs in thesisProposalData.coSupervisors) {
        const g = await getGroups(thesisProposalData.coSupervisors[cs]);
        if (g) { groupsAux.push(g) };
      }

      //We update the thesisProposalData with the obtained groups and calculated id
      thesisProposalData.groups = groupsAux;
      thesisProposalData.id = await getNextThesisId();
      const docRef = await addDoc(thesisProposalsRef, thesisProposalData);
      return { status: 200, id: docRef.id, thesis: thesisProposalData, error: null };
    }
  } catch (error) {
    console.error("Error adding thesis proposal: ", error);
    return { status: 500, error: error }; // or handle the error accordingly
  }
};

const getNextThesisId = async () => {
  const qThesis = query(thesisProposalsRef);

  try {
    const thesisSnapshot = await getDocs(qThesis);
    const thesisArray = thesisSnapshot.docs.map((t) => t.data().id);

    // thesisArray.forEach((id) => console.log("thesisArray[i]: " + id));

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

const getTeacher = async () => {
  try {
    const q = query(teachersRef);
    const snapshot = await getDocs(q);

    const titles = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        surname: data.surname,
      };
    });

    // Ora puoi accedere a id, name e surname per ciascun insegnante nell'array teachers.


    return titles.length > 0 ? titles : null;
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return null;
  }
};

/**
 * Get the snapshot of the thesis by the thesis id
 * @param {string} id id of the thesis
 * Possible values for status: [200 (ok), 401 (unauthorized), 404 (non found), 500 (server error)]
 */
async function getSnapshotThesis(id) {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };

  const whereThesisId = where("id", "==", Number(id));

  const qThesis = query(thesisProposalsRef, whereThesisId);
  try {
    let thesisSnapshot = await getDocs(qThesis);
    if (thesisSnapshot.empty) return { status: 404, error: `No thesis found` };
    return { status: 200, snapshot: thesisSnapshot.docs[0] };
  } catch (error) {
    return { status: 500, error: `Error in calling Firebase: ${error}` };
  }

}

/**
 * Accept an application and decline all the others for the same thesis
 * @param {string} applicationId id of the accepted application
 * @returns {Promise<{ status: code, err: err}> }
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)]
 */

const acceptApplication = async (applicationId) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  try {
    const collection = DEBUG ? "test-applications" : "applications";
    const applicationRef = doc(db, collection, applicationId);
    const applicationSnapshot = await getDoc(applicationRef);
    if (!applicationSnapshot.exists()) return { status: 404, err: "Application not found" };
    const application = applicationSnapshot.data();
    if (application.accepted) return { status: 400, err: "Application already accepted" };
    await updateDoc(applicationRef, { accepted: true });
    // send mail to inform the student
    const thesisSnapshot = await getSnapshotThesis(application.thesisId);
    const thesisTitle = thesisSnapshot.snapshot.data().title;
    const thesisId = thesisSnapshot.snapshot.data().id;

    const student = await getUserById(application.studentId);
    const subject = "Thesis proposal accepted";

    const text = `Dear ${student.name} ${student.surname},<br /><br />We are pleased to inform you that your application for the thesis proposal "${thesisTitle}" has been accepted.<br /><br />Best regards,<br />Student Secretariat`;

    const teacher = await getUserById(application.teacherId);
    const from = {
      "name": teacher.name,
      "surname": teacher.surname,
      "id": teacher.id,
      "email": teacher.email
    }
    await sendEmail(student.email, subject, text, from, thesisTitle, thesisId, null, null);

    // decline all the other applications for the same thesis
    const otherApplications = await getDocs(query(applicationsRef, where("thesisId", "==", application.thesisId)));
    otherApplications.forEach(async (doc) => {
      if (doc.id !== applicationId) {
        await updateDoc(doc.ref, { accepted: false });
        // send mail to inform the student
        const student = await getUserById(doc.data().studentId);
        const subject = "Thesis proposal rejected";
        const text = `Dear ${student.name} ${student.surname},<br /><br />We regret to inform you that your application for the thesis proposal "${thesisTitle}" has been rejected.<br /><br />Best regards,<br />Student Secretariat`;
        await sendEmail(student.email, subject, text, from, thesisTitle, thesisId, null, null);
      }
    });
    // archive the thesis
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
 * @returns {Promise<{ status: code, err: err}>}
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)]
 */
const declineApplication = async (applicationId) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  try {
    const collection = DEBUG ? "test-applications" : "applications";
    const applicationRef = doc(db, collection, applicationId);
    const applicationSnapshot = await getDoc(applicationRef);
    if (!applicationSnapshot.exists()) return { status: 404, err: "Application not found" };
    const application = applicationSnapshot.data();
    if (application.accepted === false) return { status: 400, err: "Application already declined" };
    const thesisSnapshot = await getSnapshotThesis(application.thesisId);
    const thesisTitle = thesisSnapshot.snapshot.data().title;
    const thesisId = thesisSnapshot.snapshot.data().id;

    await updateDoc(applicationRef, { accepted: false });
    // send mail to inform the student
    const student = await getUserById(application.studentId);
    const subject = "Thesis proposal rejected";
    const text = `Dear ${student.name} ${student.surname},<br /><br />We regret to inform you that your application for the thesis proposal "${thesisTitle}" has been rejected.<br /><br />Best regards,<br />Student Secretariat`;

    const teacher = await getUserById(application.teacherId);
    const from = {
      "name": teacher.name,
      "surname": teacher.surname,
      "id": teacher.id,
      "email": teacher.email
    }
    await sendEmail(student.email, subject, text, from, thesisTitle, thesisId, null, null);

    return { status: 200 };
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return { status: 500 };
  }
}

/**
 * Archive a thesis
 * @param {string} thesisId id of the thesis to archive
 * 
 * @returns {Promise<{ status: code, err: err}>}
 * 
 * Possible values for status: [200 (ok), 401 (unauthorized), 404 (not found) 500 (server error)]
 */
const archiveThesis = async (id) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, err: "User is not a teacher" };

  try {
    // check if the thesis exists and retrieve it
    const thesisSnapshot = await getSnapshotThesis(id);
    // console.log(thesisSnapshot.snapshot)

    if (thesisSnapshot.status == 404) return { status: 404, err: "Thesis not found" };
    await updateDoc(thesisSnapshot.snapshot.ref, { archiveDate: dayjs(await getVirtualDate()).toISOString() });

    const teacher = await getUserById(thesisSnapshot.snapshot.data().teacherId);
    const thesisTitle = thesisSnapshot.snapshot.data().title;
    const thesisId = thesisSnapshot.snapshot.data().id;
    const from = {
      "name": teacher.name,
      "surname": teacher.surname,
      "id": teacher.id,
      "email": teacher.email
    }

    // decline all the applications for the thesis
    const pendingApplications = await getApplicationsByStateByThesis("Pending", id);
    pendingApplications.forEach(async (snap) => {
      await updateDoc(snap.ref, { accepted: false });
      // send an email to the user to notify the application has been rejected
      const student = await getUserById(snap.data().studentId);
      const subject = "Thesis proposal archived";
      const text = `Dear ${student.name} ${student.surname},<br /><br />We regret to inform you that the thesis proposal "${thesisTitle}" has been archived and therefore your application rejected.<br /><br />Best regards,<br />Student Secretariat`;
      await sendEmail(student.email, subject, text, from, thesisTitle, thesisId, null, null);
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
 * @returns {Promise<{ status: code }>} //if no errors occur
 * @returns {Promise<{ status: code, error: err}>} //if errors occur
 * Possible values for status: [200 (ok), 400 (bad request), 401 (unauthorized), 500 (server error)]
 */
const deleteProposal = async (id) => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, error: "User is not a teacher" };

  try {
    //check if the thesis is already archived
    const thesis = await getThesisWithId(id);
    const today = await getVirtualDate();
    if (thesis.error) return MessageUtils.createMessage(thesis.status, "error", thesis.error);
    if (thesis.thesis.archiveDate <= today) return { status: 400, error: `You can not delete a thesis that is already archived` };

    const teacher = await getUserById(thesis.thesis.teacherId);
    const from = {
      "name": teacher.name,
      "surname": teacher.surname,
      "id": teacher.id,
      "email": teacher.email
    }

    // All the pending and rejected applications must be deleted + email to pending applications
    const pendingApplications = await getApplicationsByStateByThesis("Pending", id);
    const rejectedApplications = await getApplicationsByStateByThesis("Rejected", id);

    pendingApplications.forEach(async (snap) => {
      await deleteDoc(snap.ref);
      // send an email to the user to notify the application has been deleted
      const student = await getUserById(snap.data().studentId);
      const subject = "Thesis proposal cancelled";
      const text = `Dear ${student.name} ${student.surname},<br /><br />We regret to inform you that the thesis proposal "${thesis.thesis.title}" has been removed and therefore your application deleted.<br /><br />Best regards,<br />Student Secretariat`;
      await sendEmail(student.email, subject, text, from, thesis.thesis.title, null, null, null);
    })

    rejectedApplications.forEach(async (snap) => {
      await deleteDoc(snap.ref);
    })

    //delete thesis
    const snapshotThesis = await getSnapshotThesis(id);
    await deleteDoc(snapshotThesis.snapshot.ref);
    return { status: 200 };
  } catch (error) {
    return { status: 500, error: `Error in calling Firebase: ${error}` };
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

let lastSTRdoc;
let lastSTRqueryWhereConditions;

/**
 * Returns different items based on the logged user:
 * - professor: only accepted STR directed to him
 * - secretary: only pending STR
 * Returns error in case the logged user is a student.
 * 
 * @param { Array<{DBfield: string, mode: "ASC"|"DESC"}> } orderByArray the order of the objects in this array reflects 
 * the prority of the fields in the ordering.
 * 
 * @param {bool} reload true if the new request has different conditions than the previous performed one
 * @param {*} entry_per_page to avoid overload, only a subset of entries can be required (the remaining ones can be obtained
 * by calling this API with reload = false)  
 */
const getSTRlist = async (orderByArray, reload, entry_per_page) => {
  // console.log(lastSTRdoc)
  // console.log(orderByArray)
  if (!auth.currentUser) {
    return { status: CONSTANTS.notLogged };
  }

  if (await isStudent(auth.currentUser.email)) return CONSTANTS.unauthorized;

  let whereConditions = [];
  let q;

  try {

    // prepare teacher array for name and surname
    let teachersSnap = await getDocs(teachersRef);
    let teachers = teachersSnap.docs.map((doc) => doc.data());

    //QUERY PREPARATION
    // DIFFERENT QUERY BASING ON THE NEED TO LOAD DATA FROM THE BEGINNING OR NOT

    // load of the first page
    if (reload || !lastSTRdoc || !lastSTRqueryWhereConditions) {


      if (!await isTeacher(auth.currentUser.email)) {
        //show only pending STR
        whereConditions.push(where("approved", "==", null));
      } else {
        // if the user is a teacher, show only the STR directed to him or where he is co-supervisor
        const thisTeacher = await getUser(auth.currentUser.email);
        whereConditions.push(and(where("approved", "==", true), or(where("coSupervisors", "array-contains", thisTeacher.email), where("teacherId", "==", thisTeacher.id))));
      }

      /* ATTENTION: this code has been commented out because of it makes uneffective the ordering
      // show only STR from the past
      whereConditions.push(orderBy("requestDate"));
      whereConditions.push(where("requestDate", "<=", await getVirtualDate())); 
      */

      //sorting
      for (let f of orderByArray) {
        if (f.DBfield == "supervisor") whereConditions.push(orderBy("teacherId", f.mode.toLowerCase()));
        else whereConditions.push(orderBy(f.DBfield, f.mode.toLowerCase()));
      }

      //pagination
      whereConditions.push(limit(entry_per_page));

      //save it for future "load more" function
      lastSTRqueryWhereConditions = whereConditions;
    } else // when a new page is requested
    {
      whereConditions = lastSTRqueryWhereConditions;
      whereConditions.push(startAfter(lastSTRdoc));
    }

    q = query(thesisRequestsRef, ...whereConditions);


    //QUERY EXECUTION

    //run the query
    let ret = await getDocs(q).then(async (snapshot) => {
      lastSTRdoc = snapshot.docs[snapshot.docs.length - 1];
      let proposals = [];
      snapshot.docs.forEach((doc) => {
        // console.log(doc.id)
        let reqData = doc.data();
        let proposal = new ThesisRequest(reqData.title, reqData.description, reqData.teacherId, reqData.studentId, reqData.requestDate, reqData.approvalDate, reqData.approved, reqData.type, reqData.programmes, reqData.notes, reqData.coSupervisors);
        proposal.id = doc.id;
        // console.log(proposal)

        let teacher = teachers.find(
          (teacher) => teacher.id == proposal.teacherId
        );
        // console.log(teachers)
        // console.log(teacher)
        proposal.supervisor = teacher.id + " - - " + teacher.name + " " + teacher.surname;
        proposals.push(proposal);
      });
      return { status: 200, STRlist: proposals };
    })
      .catch(e => { console.log(e); return { status: 500 } });
    return ret;
  } catch (error) {
    console.log(error);
    return { status: 500, err: error };
  }
}

/**
 * Returns a different value based on the logged user:
 * - professor: only accepted STR directed to him are considered in the counting;
 * - secretary: only pending STR are considered in the counting.
 * - student: error
 */
const getSTRlistLength = async () => {

  if (!auth.currentUser) {
    return { status: CONSTANTS.notLogged };
  }

  if (await isStudent(auth.currentUser.email)) return CONSTANTS.unauthorized;

  /*------------QUERY PREPARATION ----------*/
  let whereConditions = [];

  /* ATTENTION: this code has been commented out because of it makes uneffective the ordering
  // show only STR from the past
  whereConditions.push(where("requestDate", "<=", await getVirtualDate()));      //TO DO: check if the field name is correct
  */

  if (!await isTeacher(auth.currentUser.email)) {
    //show only pending STR
    whereConditions.push(where("approved", "==", null));
  } else {
    //show only approved STR of the professor
    whereConditions.push(where("approved", "==", true));
    const thisTeacher = await getUser(auth.currentUser.email);
    whereConditions.push(where("teacherId", "==", thisTeacher.id));
  }


  /*------------QUERY EXECUTION----------*/
  let q = query(thesisRequestsRef, ...whereConditions);
  let snapshot = await getDocs(q);
  let length = snapshot.docs.length;

  if (length >= 0) return { status: 200, length: length };
  else return { status: 500 };

}


const predefinedSTRStructure = {

  approvalDate: "",
  description: "descr",
  notes: "notes",
  type: "stage",
  // profName: "Mario Rossi",
  studentId: "s123456",
  teacherId: "d345678",
  title: "title",
  requestDate: "YYYY/MM/DD",
  approved: null,
  programmes: "programmes",
  coSupervisors: [],
};


function validateSTRData(STRData) {
  //Validation that the proposal meets the structure requirements
  const keys1 = Object.keys(STRData);
  const keys2 = Object.keys(predefinedSTRStructure);

  // Check if both objects have the same number of keys
  if (keys1.length !== keys2.length) {
    console.log("Error in validating STR data: the object has a wrong number of keys");
    return false;
  }

  // Check if all keys in obj1 exist in obj2 and have the same type
  for (const key of keys1) {
    if (!(key in predefinedSTRStructure) || typeof STRData[key] != typeof predefinedSTRStructure[key]) {
      console.log("part2")
      console.log(typeof STRData[key])
      console.log(typeof predefinedSTRStructure[key])
      console.log(key)
      return false;
    }
  }

  //null values validation
  const keys = Object.keys(STRData);
  for (const key of keys) {
    if ((key == 'approved' && STRData[key] != null) ||
      (key == 'approvalDate' && STRData[key]) ||
      (key != 'approved' && key != 'notes' && key != 'approvalDate' && !STRData[key])) {
      console.log("part3")
      console.log(key)
      return false;
    }
  }
  return true;
}

/**
 * This method fills the STRdata object with all the missing fields, then checks if the object is well formed
 * and finally adds it to the db.
 * 
 * @param {{approvalDate: string,     
 * description: string,           
 * notes: string,  
 * type: string,
 * profName: string,   
 * studentId: string,
 * teacherId: string,   
 * title: string,
 * requestDate: dayjs.format("YYYY/MM/DD"),
 * approved: boolean
 * programmes: string
 * coSupervisors: array of strings
 * }} STRData 
 */
const insertSTR = async (STRData) => {
  if (!auth.currentUser) return { status: 401, err: "User not logged in." };

  if (!(await isStudent(auth.currentUser.email))) return { status: 401, err: "User is not a student." };

  let student = (await getStudent(auth.currentUser.email)).data();
  const degree_title = await getDegreeById(student.cod_degree);

  if (await titleAlreadyExist(STRData, "insert", null)) {
    return { status: 400, err: "A thesis with this title already exists." };
  }

  STRData.programmes = degree_title;
  STRData.studentId = student.id;
  STRData.approvalDate = "";
  STRData.requestDate = dayjs(STRData.requestDate).toISOString();
  STRData.approved = null;

  //Check that the teachers id is an id inside the teachers table
  if (!await isTeacherById(STRData.teacherId)) {
    return { status: 400, err: "The proposed teacher is not present in our database" };
  }

  try {
    if (!validateSTRData(STRData)) {
      console.log("Validation failed: proposal data doesnt comply with required structure");
      return { status: 400, err: "Proposal data doesnt comply with required structure" };
    }

    const docRef = await addDoc(thesisRequestsRef, STRData);
    return { status: 200, id: docRef.id };

  } catch (error) {
    console.error("Error adding thesis request: ", error);
    return { status: 500 }; // or handle the error accordingly
  }
};

const getDegreeById = async (id) => {
  try {
    const q = query(degreesRef, where("codDegree", "==", id));
    const snapshot = await getDocs(q);
    const title = snapshot.docs[0].data().titleDegree;
    return title;
  } catch (error) {
    console.error("Error in calling Firebase:", error);
    return null;
  }

}

/**
 * API to retrieve the student request detail given its id, Used only for secretaries users.
 * @param {string} id id of the student request
 * 
 * returns {{ status: code, STR: {}}} // return of the API if no errors occur
 * 
 * returns {{ status: code, error: err}} // return of the API if errors occur
 * 
 * Possible values for status: [200 (ok), 401 (unauthorized), 404 (non found), 500 (server error)]
 */

const getSTRWithId = async (id) => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };
  if (!(await isSecretary(auth.currentUser.email) || await isTeacher(auth.currentUser.email))) return { status: 401, error: "User is not a secretary" };

  //QUERY CONDITIONS
  const collectionName = DEBUG ? "test-thesisRequests" : "thesisRequests";
  const STRdocRef = doc(db, collectionName, id);

  try {
    const STRSnapshot = await getDoc(STRdocRef);
    if (STRSnapshot.exists()) {
      const data = STRSnapshot.data();
      if (!data.coSupervisors) data.coSupervisors = [];
      const STR = new ThesisRequest(data.title, data.description, data.teacherId, data.studentId, data.requestDate, data.approvalDate, data.approved, data.type, data.programmes, data.notes, data.coSupervisors);
      //find the supervisor's name and surname
      let teachersSnap = await getDocs(teachersRef);
      let teachers = teachersSnap.docs.map(doc => doc.data());
      let teacher = teachers.find(t => t.id == STR.teacherId);
      if (!teacher) return MessageUtils.createMessage(404, "error", "No teacher found");
      STR.supervisor = teacher.name + ' ' + teacher.surname + ', ' + teacher.id;

      //find the student's name and surname
      let studentsSnap = await getDocs(studentsRef);
      let students = studentsSnap.docs.map(doc => doc.data());
      let student = students.find(t => t.id == STR.studentId);
      if (!student) return MessageUtils.createMessage(404, "error", "No student found");
      STR.student = student.name + ' ' + student.surname + ', ' + student.id;

      return { status: 200, STR: STR }
    } else {
      return { status: 404, error: "STR not found" }
    }
  } catch (e) {
    console.log("Error:", e);
    return { status: 500, error: "Error in calling Firebase:" + e }
  }
}


/**
 * API to accept/reject/change request a new thesis request, Used only for teacher users.
 * @param {string} id id of the thesis to accept/reject
 * @param {boolean} accept true to accept, false to reject, "changeRequested" to request a change
 * @returns {Promise<{ status: code }>} //return of the API if no errors occur
 * @returns {Promise<{ status: code, error: err}>} //return of the API if errors occur
 * Possible values for status: [200 (ok),400 (already approved/rejected), 401 (unauthorized), 404 (non found), 500 (server error)]
 */


const teacherAcceptRejectChangeRequestSTR = async (id, accept, changeRequest) => {

  //check if the if the user is logged
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };

  //check if the user is a teacher
  if (!await isTeacher(auth.currentUser.email)) return { status: 401, error: "User is not a teacher" };

  try {
    const collectionName = DEBUG ? "test-thesisRequests" : "thesisRequests";
    const docRef = doc(db, collectionName, id);
    const STRSnapshot = await getDoc(docRef);
    if (STRSnapshot.data().approved !== true) return { status: 400, error: "Thesis Request already approved/rejected/changeRequested by prof" }

    const newData = {
      "approved": accept,
      "approvalDate": ""
    };

    const thesisTitle = STRSnapshot.data().title;

    const student = await getUserById(STRSnapshot.data().studentId);
    const professor = await getUser(auth.currentUser.email);

    const from = {
      "name": professor.name,
      "surname": professor.surname,
      "id": professor.id,
      "email": professor.email
    }

    if (accept === true) {
      //if accepted, delete the str from db and notify the student
      // then create a new thesis and a new application and accept it automatically

      await deleteDoc(docRef);
      await sendEmail(student.email, "Thesis request accepted", `Dear ${student.name} ${student.surname},<br /><br />We are pleased to inform you that your thesis request "${thesisTitle}" has been accepted.<br /><br />Best regards,<br />Student Secretariat`, from, thesisTitle, null, null, null);

      const date = await getVirtualDate();

      //we build the thesis proposal with the request info and add it to the db
      const newThesis = {
        archiveDate: dayjs(date).add(1, 'day').toISOString(),
        coSupervisors: STRSnapshot.data().coSupervisors,
        description: STRSnapshot.data().description,
        expirationDate: dayjs(date).add(1, 'day').toISOString(),
        groups: [],
        id: 0,
        keywords: [],
        level: "Accepted request",
        notes: STRSnapshot.data().notes,
        programmes: STRSnapshot.data().programmes,
        requiredKnowledge: "",
        teacherId: STRSnapshot.data().teacherId,
        title: STRSnapshot.data().title,
        type: STRSnapshot.data().type
      };
      const thesisRef = await insertProposal(newThesis);

      //We create an accepted application and accept it automatically
      const newApplication = new Application(null, STRSnapshot.data().studentId, thesisRef.thesis.id, null, null, date, STRSnapshot.data().teacherId, STRSnapshot.data().title);
      const result = await addApplicationByProf(newApplication);
      console.log(result);
      await acceptApplication(result.id);

    } else if (accept === false) {
      //if rejected, just update the approved field and notify the student
      newData.approvalDate = null;
      await updateDoc(docRef, newData);
      await sendEmail(student.email, "Thesis request rejected", `Dear ${student.name} ${student.surname},<br /><br />We regret to inform you that your thesis request "${thesisTitle}" has been rejected.<br /><br />Best regards,<br />Student Secretariat`, from, thesisTitle, null, null, null);

    } else if (accept === "changeRequested") {
      //if changeRequested, just update the approved field and notify the student
      newData.approvalDate = null;

      await updateDoc(docRef, newData);
      await sendEmail(student.email, "A change in your Thesis request has been requested",
        `Dear ${student.name} ${student.surname},<br /><br />We inform you that your thesis request "${STRSnapshot.data().title}" has received a change request from the professor ${professor.name} ${professor.surname}. More details below:<br />
${changeRequest.titleSignal || changeRequest.typeSignal || changeRequest.descriptionSignal || changeRequest.cosupervisorsSignal ? "Fields that need to be fixed are:<br />" : ""} 
${changeRequest.titleSignal ? "* title<br />" : ""}${changeRequest.typeSignal ? "* type<br />" : ""}${changeRequest.descriptionSignal ? "* description<br />" : ""}${changeRequest.cosupervisorsSignal ? "* Co-Supervisors<br />" : ""}
<br />Professor suggestion:<br />"${changeRequest.advice}"<br /><br />Best Regards,<br />Student Secretariat`, from, thesisTitle, null, null, null);
    }

    return { status: 200 } //OK
  } catch (e) {
    console.log("Error:", e);
    return { status: 500, error: "Error in calling Firebase:" + e }
  }
};

/**
 * API to accept/reject a new thesis request, Used only for secretaries users.
 * @param {string} id id of the thesis to accept/reject
 * @param {boolean} accept true to accept, false to reject
 * @returns {Promise<{ status: code }>} //return of the API if no errors occur
 * @returns {Promise<{ status: code, error: err}>} //return of the API if errors occur
 * Possible values for status: [200 (ok),400 (already approved/rejected), 401 (unauthorized), 404 (non found), 500 (server error)]
 */

const acceptRejectSTR = async (id, accept) => {

  //check if the if the user is logged
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };

  //check if the user is a secretary
  if (!await isSecretary(auth.currentUser.email)) return { status: 401, error: "User is not a secretary" };

  try {
    const collectionName = DEBUG ? "test-thesisRequests" : "thesisRequests";
    const docRef = doc(db, collectionName, id);
    const STRSnapshot = await getDoc(docRef);
    if (STRSnapshot.data().approved !== null) return { status: 400, error: "Thesis Request already approved/rejected" }

    const newData = {
      "approved": accept,
      "approvalDate": ""
    };

    if (accept) {
      newData.approvalDate = await getVirtualDate();
    } else {
      newData.approvalDate = null;
    }

    await updateDoc(docRef, newData);

    const professor = await getUserById(STRSnapshot.data().teacherId);
    const student = await getUserById(STRSnapshot.data().studentId);
    const thesisTitle = STRSnapshot.data().title;
    let email, subject, text, from;
    //send email to student or professor
    if (accept) {
      //to professor
      email = professor.email;
      subject = "Thesis request accepted";
      text = `Dear Professor ${professor.name} ${professor.surname},<br /><br />We are pleased to inform you that a new thesis request "${thesisTitle}" with you involved has been accepted by secretary.<br /><br />Best regards,<br />Student Secretariat`;
      from = {
        name: student.name,
        surname: student.surname,
        email: student.email,
        id: student.id,
      };
      await sendEmail(email, subject, text, from, thesisTitle, null, null, id);
    } else {
      //to student
      email = student.email;
      subject = "Thesis request rejected";
      text = `Dear ${student.name} ${student.surname},<br /><br />We regret to inform you that your thesis request "${thesisTitle}" has been rejected.<br /><br />Best regards,<br />Student Secretariat`;
      from = {
        name: professor.name,
        surname: professor.surname,
        email: professor.email,
        id: professor.id,
      };
      await sendEmail(email, subject, text, from, thesisTitle, null, null, null);
    }

    return { status: 200 } //OK
    // } else {
    //   console.log("Thesis request not found");
    //   return { status: 404, error: "Thesis request not found" }
    // }
  } catch (e) {
    console.log("Error:", e);
    return { status: 500, error: "Error in calling Firebase:" + e }
  }
};

/**
 * API to accept/reject a new thesis request, Used only for secretaries users.
 * @param {int} id id of the thesis to update
 * @param {object} thesisProposalData object containing the new data of the proposal
 * 
 * returns {{ status: code }} //return of the API if no errors occur
 * 
 * returns {{ status: code, error: err}} //return of the API if errors occur
 * 
 * Possible values for status: [200 (ok),400 (bad request), 401 (unauthorized), 404 (non found), 500 (server error)]
 */

const updateProposal = async (id, thesisProposalData) => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };
  if (!(await isTeacher(auth.currentUser.email))) return { status: 401, error: "User is not a teacher" };
  try {
    //Retrieve the thesis object with the given id using a query to firebase
    const whereId = where("id", "==", Number(id));
    const qThesis = query(thesisProposalsRef, whereId);
    const thesisSnapshot = await getDocs(qThesis);
    if (thesisSnapshot.empty) return { status: 404, error: "Thesis not found" };

    if (await titleAlreadyExist(thesisProposalData, "update", id)) {
      return { status: 400, error: "A thesis with this title already exists" };
    } else {
      //save the ref to the document
      const docRef = thesisSnapshot.docs[0].ref;

      //Update the document with the new argument data
      await updateDoc(docRef, thesisProposalData);

      return { status: 200, id: docRef.id };
    }
  } catch (error) {
    console.error("Error adding thesis proposal: ", error);
    return { status: 500, error: error }; // or handle the error accordingly
  }
};

/**
 * Get all active thesis
 * @returns {Promise<{ thesis: {}}>}
 */
const getActiveThesis = async () => {
  const today = await getVirtualDate();
  const whereArchiveDate = where("archiveDate", ">", today);
  const qThesis = query(thesisProposalsRef, whereArchiveDate);
  try {
    const thesisSnapshot = await getDocs(qThesis);
    const thesis = thesisSnapshot.docs.map((doc) => doc.data());
    return thesis.length > 0 ? thesis : null;
  } catch (error) {
    console.log(error);
  }
}


/**
 * Notify the teacher with an email when the expiration date of his thesis is approaching (1 week before)
 * @param {string} today today's virtual date
 * @returns {Promise<{ status: code }>} //return of the API if no errors occur
 */
const notifyThesisExpiration = async (today) => {
  return getActiveThesis()
    .then((thesisList) => {
      const oneWeek = dayjs(today).add(1, 'week');
      const notManuallyArchivedThesis = thesisList.filter((thesis) => dayjs(thesis.archiveDate).isSame(thesis.expirationDate, 'day'));
      const oneWeekThesis = notManuallyArchivedThesis.filter((thesis) => dayjs(thesis.expirationDate).isSame(oneWeek, 'day'));

      const from = {
        name: "Student Secretariat",
        surname: "",
        email: "",
        id: "PoliTo",
      }

      oneWeekThesis.forEach(async (thesis) => {
        const teacher = await getUserById(thesis.teacherId)
        const subject = "Thesis proposal expiration";
        const text = `Dear Professor ${teacher.name} ${teacher.surname},<br /><br />We are writing you to inform you that the thesis proposal with title ${thesis.title} is about to expire.<br /><br />Best regards,<br />Student Secretariat.`;
        await sendEmail(teacher.email, subject, text, from, thesis.title, thesis.id, null, null);
      });

      return { status: 200 };
    })
    .catch((error) => {
      console.log(error);
      return { status: 500 };
    });
}


const sendEmail = async (to, subject, text, from, thesisTitle, thesisId, applicationId, strId) => {
  if (!auth.currentUser) {
    console.log("User not logged in");
    return MessageUtils.createMessage(401, "error", "User not logged in")
  }
  const email = MessageUtils.createEmail(to, subject, text, from, thesisTitle, thesisId, applicationId, strId, dayjs(await getVirtualDate()).toISOString());
  try {
    if (DEBUG) {
      console.log("Email sent");
      console.log(email);
    }
    const docRef = await addDoc(mailRef, email);
    return MessageUtils.createMessage(200, "id", docRef.id);

  } catch (error) {
    console.error("Error adding email: ", error);
    return MessageUtils.createMessage(500, "error", error);
  }

}

/**
 * Get all the notifications for the logged user
 * 
 * @param {string} thesisTitle is an optional field if the notification is related to a specific thesis
 * @param {Object} from is the object that contains the information about the trigger of the notification. 
 *        It could be the teacher related to the thesisTitle or a student that has sent an application.
 * {
      id: 1,
      date: "2021-06-01",
      subject: "Thesis proposal accepted",
      text: "Dear student, your thesis proposal has been accepted",
      thesisTitle: "Title",
      from: {
        name: "Mario",
        surname: "Rossi",
        id: "d123456"
      }
    },
 * 
 * @returns {Promise<{ status: code, notifications: [] }>} //return of the API if no errors occur
 */
const getNotifications = async () => {
  if (!auth.currentUser) return { status: 401, error: "User not logged in" };

  try {
    const qMail = query(
      mailRef,
      where("to", "==", auth.currentUser.email)
      //where("date", "<=", dayjs(await getVirtualDate()).toISOString())
    );
    const mailSnapshot = await getDocs(qMail);

    const notifications = [];
    mailSnapshot.forEach((doc) => {
      const mail = doc.data();
      notifications.push({
        id: doc.id,
        date: mail.message.date,
        subject: mail.message.subject,
        text: mail.message.html,
        thesisTitle: mail.message.thesisTitle,
        thesisId: mail.message.thesisId,
        applicationId: mail.message.applicationId,
        strId: mail.message.strId,
        from: mail.message.from,
      });
    });

    if (DEBUG) {
      console.log("Notifications from getNotifications:");
      console.log(notifications);
    }

    return { status: 200, notifications: notifications };
  } catch (e) {
    console.err(e);
    throw e;
  }
};

const addApplicationByProf = async (application) => {

  if (!auth.currentUser) {
    throw MessageUtils.createMessage(401, "error", "Not logged in");
  }

  if (!await isTeacher(auth.currentUser.email)) {
    throw MessageUtils.createMessage(401, "error", "Unauthorized");
  }

  try {
    let fileRef
    if (application.curriculum) {
      fileRef = ref(storage, StringUtils.createApplicationPath(storageCurriculums, application.studentId, application.thesisId, application.curriculum.name))
      // console.log(application.file)
      await uploadBytes(fileRef, application.curriculum)
    }

    const docRef = await addDoc(applicationsRef, application.parse(fileRef ? fileRef.fullPath : null))
    return { status: 200, id: docRef.id }
  } catch (e) {
    console.log(e)
    throw (e)
  }

}


const API = {
  getThesis, /*getAllThesis,*/ getThesisWithId, getThesisNumber, getValuesForField, getTeacher,
  changeVirtualDate, getVirtualDate,
  signUp, logIn, logOut, getUser, loginWithSaml,
  addApplication, retrieveCareer, getTitleAndTeacher, getApplication, getApplicationsForProfessor, getApplicationDetails, getCVOfApplication, acceptApplication, declineApplication, getApplicationsByStateByThesis,
  removeAllProposals, insertProposal, archiveThesis, deleteProposal, updateProposal,
  getApplicationsForStudent, getDegree,
  getSTRlist, getSTRlistLength, insertSTR, predefinedSTRStructure, getSTRWithId, acceptRejectSTR, teacherAcceptRejectChangeRequestSTR,
  notifyThesisExpiration,
  sendEmail,
  getNotifications
};


export default API;

/*
console.log("Testing isSecretary");
console.log(await updateProposal(99999, {title: "New title", description: "New description"}));

console.log("Rejected:");
await getApplicationsByState("Rejected", "s901234"); //3

console.log("Accepted:");
await getApplicationsByState("Accepted", "s901234"); //1

console.log("Pending:");
await getApplicationsByState("Pending", "s901234"); //0
*/

/** TEST API */

// get an accepted application and return the id
const getAcceptedApplicationId = async () => {
  const q = query(applicationsRef, where("accepted", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs[0].id;
}

// get a declined application and return the id
const getDeclinedApplicationId = async () => {
  const q = query(applicationsRef, where("accepted", "==", false));
  const snapshot = await getDocs(q);
  return snapshot.docs[0].id;
}

// get a pending application and return the id
const getPendingApplicationId = async () => {
  const q = query(applicationsRef, where("accepted", "==", null));
  const snapshot = await getDocs(q);
  return snapshot.docs[0].id;
}

// get a non archived thesis
const getOneActiveThesis = async () => {
  // expirationDate == archiveDate and expirationDate > today
  const q = query(thesisProposalsRef, where("expirationDate", ">", await getVirtualDate()), where("expirationDate", "==", "archiveDate"));
  const snapshot = await getDocs(q);
  return snapshot.docs[0].data();
}

// get a archived thesis
const getOneArchivedThesis = async () => {
  const q = query(thesisProposalsRef, where("archiveDate", "<=", await getVirtualDate()));
  const snapshot = await getDocs(q);
  return snapshot.docs[0].data();
}


const TESTAPI = {
  getAcceptedApplicationId, getDeclinedApplicationId, getPendingApplicationId,
  getOneActiveThesis, getOneArchivedThesis,
}

export { TESTAPI };
