'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';


import { initializeApp } from 'firebase/app';
import { collection, getFirestore, doc, query, getDocs, where } from 'firebase/firestore';

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

/**
 * API to accept/reject/change request a new thesis request, Used only for teacher users.
 * @param {string} id id of the thesis to accept/reject
 * @param {boolean} accept true to accept, false to reject, "changeRequested" to request a change
 * @param {string} changeRequest (optional) message to send to the student if the teacher requests a change
 *              titleSignal
 *              descriptionSignal
 *              cosupervisorsSignal
 *              typeSignal
 *              advice
 * @returns {Promise<{ status: code }>} //return of the API if no errors occur
 * @returns {Promise<{ status: code, error: err}>} //return of the API if errors occur
 * Possible values for status: [200 (ok),400 (already approved/rejected), 401 (unauthorized), 404 (non found), 500 (server error)]
 */

describe('Testing teacherAcceptRejectChangeRequestSTR function', () => {
    test('Should retrieve an error if a teacher is not logged in', async () => {
        const response = await API.teacherAcceptRejectChangeRequestSTR("", "test", "test");
        expect(response.status).toEqual(401);
    });

    test('STR approved: should return 200', async () => {
        await API.logIn("d123456@polito.it", "test123");

        let applicationId;
        try {
            const appsColl = collection(db, "test-applications")
            const whereCond = [
                where("accepted", "==", null),
                where("studentId", "==", "s789012"),
                where("thesisTitle", "==", "Instrumenting Kubernetes 5G services with eBPF probes")
            ]
            const querySnapshot = await getDocs(query(appsColl, whereCond));
            if (querySnapshot.empty) throw new Error("No matching documents");
            querySnapshot.forEach(function (doc) {
                applicationId = doc.id;
            });
        } catch (err) {
            throw err;
        }

        // launch the API
        const changeRequest = {}
        let response;
        try {
            response = await API.teacherAcceptRejectChangeRequestSTR("H4oCncW0Y48kLrWoINDQ", true, changeRequest);
        } catch (err) {
            throw err;
        }

        // revert the changes 
        try {
            const appDoc = doc(`test-applications`);
            appDoc.update({
                accepted: null
            });
        } catch (err) {
            throw err;
        }

        expect(response.status).toEqual(200);
    });

    test('STR rejected: should return 200', async () => {
        await API.logIn("d123456@polito.it", "test123");

        let applicationId;
        try {
            const appsColl = collection(db, "test-applications")
            const whereCond = [
                where("accepted", "==", null),
                where("studentId", "==", "s789012"),
                where("thesisTitle", "==", "Instrumenting Kubernetes 5G services with eBPF probes")
            ]
            const querySnapshot = await getDocs(query(appsColl, whereCond));
            if (querySnapshot.empty) throw new Error("No matching documents");
            querySnapshot.forEach(function (doc) {
                applicationId = doc.id;
            });
        } catch (err) {
            throw err;
        }

        // launch the API
        const changeRequest = {}
        let response;
        try {
            response = await API.teacherAcceptRejectChangeRequestSTR("H4oCncW0Y48kLrWoINDQ", false, changeRequest);
        } catch (err) {
            throw err;
        }

        // revert the changes 
        try {
            const appDoc = doc(`test-applications`);
            appDoc.update({
                accepted: null
            });
        } catch (err) {
            throw err;
        }

        expect(response.status).toEqual(200);
    });

    test('STR request change: should return 200', async () => {
        await API.logIn("d123456@polito.it", "test123");

        let applicationId;
        try {
            const appsColl = collection(db, "test-applications")
            const whereCond = [
                where("accepted", "==", null),
                where("studentId", "==", "s789012"),
                where("thesisTitle", "==", "Instrumenting Kubernetes 5G services with eBPF probes")
            ]
            const querySnapshot = await getDocs(query(appsColl, whereCond));
            if (querySnapshot.empty) throw new Error("No matching documents");
            querySnapshot.forEach(function (doc) {
                applicationId = doc.id;
            });
        } catch (err) {
            throw err;
        }

        // launch the API
        const changeRequest = {
            titleSignal: true,
            descriptionSignal: true,
            cosupervisorsSignal: true,
            typeSignal: true,
            advice: "Some advice"
        };
        let response;
        try {
            response = await API.teacherAcceptRejectChangeRequestSTR(applicationId, false, changeRequest);
        } catch (err) {
            throw err;
        }

        // revert the changes 
        try {
            const appDoc = doc(`test-applications`);
            appDoc.update({
                accepted: null
            });
        } catch (err) {
            throw err;
        }

        expect(response.status).toEqual(200);
    });

    test('Should retrieve an error if the application does not exist', async () => {
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.teacherAcceptRejectChangeRequestSTR("asdfasdfasdfasd", false, {});
        expect(response.status).toEqual(401);
    });

});