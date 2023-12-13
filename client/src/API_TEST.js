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
const asdRef = collection(db, "asd");

// Get a list of cities from your database
const insert_test = async function test (obj, colRef=asdRef) {
  // validate object
  
  addDoc(colRef, obj)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    return null;
  });
}

const insert_unique_test = async function test (id) {
  const obj = {
    user: "Hello"
  };

  const docRef = doc(db, "students", id)
  try {
    await setDoc(docRef, obj)
    console.log("Document written with ID: " + id);
    return id;
  } catch (error) {
    console.error("Error adding document: ", error);
    return;
  }
}

const get_test = async function get_test () {
  const colRef = collection(db, "asd") //FROM
  const whereCond = where("name", "==", "Davide") // WHERE
  //method query(pathReference, cond1, cond2, condN) 
  const q = query(colRef, whereCond);
  
  const qSnapShot = await getDocs(q);
  qSnapShot.forEach((doc) => {
    //doc.data() to retrieve the document fields. Then it is possible to access with ".<fieldName>" (case sensitive!)
    console.log(doc.id)
    console.log(doc.data().user)
    console.log(doc.data().name)
  })
}

const get_test_2 = async function get_test () {
  const colRef = collection(db, "asd")
  const whereCond = where("name", "==", "Davide 2")
  //method query(pathReference, cond1, cond2, condN) 
  const q = query(colRef, whereCond);
  
  const qSnapShot = await getDocs(q);
  qSnapShot.forEach(async (doc) => {
    //doc.data() to retrieve the document fields. Then it is possible to access with ".<fieldName>" (case sensitive!)
    console.log(doc.data())
    const colRef2 = collection(db, "asd/" + doc.id + "/test2");
    const qSnapShot2 = await getDocs(query(colRef2))
    qSnapShot2.forEach((e) => console.log(e.data()))
    // console.log(doc.data().user)
    // console.log(doc.data().name)
  })
}

const delete_test = async function delete_test (id) {
  
  const docRef = doc(db, "students", id)
  try {
    await deleteDoc(docRef)
    console.log("Document deleted with ID: " + id);
    return id;
  }
  catch (error) {
    console.error("Error deleting document: ", error);
    return;
  }
}



// ADD ALL API FUNCTIONS HERE
const API_TEST = {
    insert_test,
    insert_unique_test,
    get_test,
    get_test_2,
    delete_test
}

export default API_TEST;
