import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, query, limit, getDocs, deleteDoc } from 'firebase/firestore';
import { applications, degrees, students, careers, teachers, thesisProposals } from './_initialData.js';

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
  console.log('Populating collection', collectionName)
  return new Promise((resolve, reject) => {
    insertData(db, jsonData, collectionName, resolve).catch(reject);
  });
}

async function insertData(db, jsonData, collectionName, resolve) {
  console.log('importing data to firestore...');
  const collectionRef = collection(db, collectionName);
  for (const item of jsonData) {
    addDoc(collectionRef, item).then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
      resolve();
    }).catch((error) => {
      console.error(`Error adding document: ${error}`);
    });
  }
}

async function deleteQueryBatch(q, resolve) {
  const snapshot = await getDocs(q);
  if (snapshot.size === 0) {
    console.log('Emtpy collection nothing to delete');
    resolve();
  }
  snapshot.forEach((doc) => {
    console.log(`Deleting doc: ${doc.id}`);
    deleteDoc(doc.ref).then(() => {
      resolve();
    }
    ).catch((error) => {
      console.error(`Error removing doc: ${error}`);
    });
  });
}


// Delete all collections
await deleteCollection(db, "students");
await deleteCollection(db, "applications");
await deleteCollection(db, "career");
await deleteCollection(db, "degrees");
await deleteCollection(db, "teachers");
await deleteCollection(db, "thesisProposals");

// Import data to firestore
await populateCollection(db, students, 'students');
await populateCollection(db, teachers, 'teachers');
await populateCollection(db, degrees, 'degrees');
await populateCollection(db, careers, 'career');
await populateCollection(db, applications, 'applications');
await populateCollection(db, thesisProposals, 'thesisProposals');
