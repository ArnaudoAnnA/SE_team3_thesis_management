'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';
import { collection, doc, query, getDocs, where } from 'firebase/firestore';
// import TEST from '../models/_initdb.js';

// beforeAll(async () => {
//     // launch script to populate the database with test data
//     await TEST.initTestData();
// });

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


    test('Should retrieve an error if the application does not exist', async () => {
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.teacherAcceptRejectChangeRequestSTR("asdfasdfasdfasd", false, {});
        expect(response.status).toEqual(401);
    });

});