import jest from 'jest';
import dayjs from 'dayjs';
import API_TEST from '../../API_TEST';
import { collection, addDoc, getFirestore, doc, query, getDocs, where, setDoc, deleteDoc} from 'firebase/firestore';

// TEST COLLECTIONS' REFERENCES
const asdRef = collection(db, "test-asd");
// const studentsRef = collection(db, "test-students");
// const teachersRef = collection(db, "test-teachers");
// const degreesRef = collection(db, "test-degrees");
// const careersRef = collection(db, "test-careers");
// const thesisProposalsRef = collection(db, "test-thesisProposals");
// const applicationsRef = collection(db, "test-applications");

describe("example unit suite", () => {

    const obj = {
        user: "Hello"
    };

    test("example unit test", () => {
        // Always add TEST COLLECTION REFERENCES to the function call
        API_TEST.insert_test(obj, asdRef)
    });
});