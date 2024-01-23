import { initializeApp, deleteApp } from 'firebase/app';
import { collection, addDoc, getFirestore, query, limit, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { applications, degrees, students, careers, teachers, thesisProposals, date, thesisRequests, secretaries } from './initial_data/_initialData.js';

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

async function deleteCollection(db, collectionName) {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, limit(1000));

  return new Promise((resolve, reject) => {
    deleteQueryBatch(q, resolve).catch(reject);
  });
}

async function populateCollection(db, jsonData, collectionName) {
  return new Promise((resolve, reject) => {
    insertData(db, jsonData, collectionName, resolve).catch(reject);
  });
}

async function populateCollectionWithCustomId(db, jsonData, collectionName) {
  return new Promise((resolve, reject) => {
    insertDataWithCustomId(db, jsonData, collectionName, resolve).catch(reject);
  });
}

async function insertData(db, jsonData, collectionName, resolve) {
  const collectionRef = collection(db, collectionName);
  for (const item of jsonData) {
    addDoc(collectionRef, item).then((docRef) => {
      resolve();
    }).catch((error) => {
      console.error(`Error adding document: ${error}`);
    });
  }
}

async function insertDataWithCustomId(db, jsonData, collectionName, resolve) {
  for (const item of jsonData) {
    const newDoc = doc(db, collectionName, item.id)
    setDoc(newDoc, item).then((docRef) => {
      resolve();
    }).catch((error) => {
      console.error(`Error adding document: ${error}`);
    });
  }
}

async function deleteQueryBatch(q, resolve) {
  const snapshot = await getDocs(q);
  if (snapshot.size === 0) {
    resolve();
  }
  snapshot.forEach((doc) => {
    deleteDoc(doc.ref).then(() => {
      resolve();
    }
    ).catch((error) => {
      console.error(`Error removing doc: ${error}`);
    });
  });
}

async function initTestData() {
  console.log('Populating database with test data...')
  // Delete all collections
  await deleteCollection(db, "test-students");
  await deleteCollection(db, "test-applications");
  await deleteCollection(db, "test-career");
  await deleteCollection(db, "test-degrees");
  await deleteCollection(db, "test-teachers");
  await deleteCollection(db, "test-thesisProposals");
  await deleteCollection(db, "test-thesisRequests");
  await deleteCollection(db, "test-secretaries");

  // Import data to firestore
  await populateCollection(db, students, 'test-students');
  await populateCollection(db, teachers, 'test-teachers');
  await populateCollection(db, degrees, 'test-degrees');
  await populateCollection(db, careers, 'test-career');
  await populateCollection(db, applications, 'test-applications');
  await populateCollection(db, thesisProposals, 'test-thesisProposals');
  await populateCollection(db, thesisRequests, 'test-thesisRequests');
  await populateCollectionWithCustomId(db, secretaries, 'test-secretaries');
  await deleteApp(app);
  console.log('Done!')
}

// ask user if they want to populate the database with test data or not (y or n)
const test = process.argv[2] === 'test' ? true : false;
console.log('test', test);

/* ---------------------------------------------------------------------- */
if (test) {
  initTestData();
}
// else { 
//   console.log('Populating database with real data...')
  
   // Delete all collections
   await deleteCollection(db, "date");
   await deleteCollection(db, "students");
   await deleteCollection(db, "applications");
   await deleteCollection(db, "career");
   await deleteCollection(db, "degrees");
   await deleteCollection(db, "teachers");
   await deleteCollection(db, "thesisProposals");
   await deleteCollection(db, "thesisRequests");
   await deleteCollection(db, "secretaries");

   // Import data to firestore
   await populateCollection(db, date, 'date');
   await populateCollection(db, students, 'students');
   await populateCollection(db, teachers, 'teachers');
   await populateCollection(db, degrees, 'degrees');
   await populateCollection(db, careers, 'career');
   await populateCollection(db, applications, 'applications');
   await populateCollection(db, thesisProposals, 'thesisProposals');
   await populateCollection(db, thesisRequests, 'thesisRequests');
   await populateCollectionWithCustomId(db, secretaries, 'secretaries');

// }

const TEST = {initTestData}
export default TEST;