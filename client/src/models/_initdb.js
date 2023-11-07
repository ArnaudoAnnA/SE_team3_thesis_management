import 'firestore/firestore';

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

// delete all
// populate with student.js teacher.js....
// launch with node initdb.js

async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }
  
  deleteCollection(db, "applications", 100);
  deleteCollection(db, "career", 100);
  deleteCollection(db, "degrees", )