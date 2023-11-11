# Firebase API Documentation

API.js contains all functions that communicates with the Firebase database. 

All firebase functions are imported one by one in line 2 of the API.js file. If you want to add a new function, you must import it there. 

## File structure
- API.js: is a wrapper for all API files and contains all functions that communicates with the Firebase database.
- API_TEST.js contains some example code to play with.

## Functions 

### getFirestore(app)
Returns the firestore object. Used once to initialize the connection. The resulting db object will be used as argument in other functions.

### collection(db, 'collectionPath')
Returns a reference to a collection that can be used to query the database. ALL collections in the database have a global reference at the beginning of the file to avoid intantiating the same collection multiple times.

### addDoc(collectionRef, document)
Adds a document to a collection. The document is a JSON object. The function returns the ID of the document that was added.

### where(collectionRef, field, operator, value)
- field: the field to query
- operator: the operator to use (==, >, <, >=, <=)
- value: the value to compare to

### query(collectionRef, whereClausesList)
You can insert a series of where clauses described above.

### getDocs(query)
Returns all documents in a collection. Query is a query object containing the collection reference and the where clauses.

### doc(collectionRef, documentPath)
Gets the document Reference in the documentPath from a specific collection. 

### setDoc(documentRef, newDocument)
Updates the document in the documentRef with the newDocument or create one if the documentRef is not fount. The newDocument is a JSON object.

### deleteDoc(documentRef)
Deletes the document in the documentRef.