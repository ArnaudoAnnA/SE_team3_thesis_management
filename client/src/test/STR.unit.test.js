'use strict';

import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import API from '../API.js';
// import TEST from '../models/_initdb.js';

// beforeAll(async () => {
//     // launch script to populate the database with test data
//     await TEST.initTestData();
// });

beforeEach(async () => {
    await API.logOut();
});

afterEach(async () => {
    await API.logOut();
});

const teacherUser = "d123456@polito.it";
const studentUser = "s234567@studenti.polito.it";
const secretaryUser = "u123456@polito.it";
const password = "test123"

describe('1: Testing the acceptRejectSTR API', () => {
    test('T1.1: Should retrieve an error if a user is not logged in', async () => {
        const response = await API.acceptRejectSTR(-1, true);
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrieve an error if a user is not a secretary', async () => {
        await API.logIn(studentUser, password);
        const response = await API.acceptRejectSTR(-1, true);
        expect(response.status).toBe(401);
    });

    test('T1.3: Should retrieve an error if already accepted/rejected', async () => {
        await API.logIn(secretaryUser, password);
        const response = await API.acceptRejectSTR(1, true);
        expect(response.status).toBe(400);
    });

    test('T1.4: Should retrieve an error if str is not found', async () => {
        await API.logIn(secretaryUser, password);
        const response = await API.acceptRejectSTR(-1, true);
        expect(response.status).toBe(404);
    });

    test('T1.5: Should return status 200s if a user is a secretary and the str exists', async () => {
        await API.logIn(secretaryUser, password);
        const response = await API.acceptRejectSTR(0, true);
        expect(response.status).toBe(200);
    });

});

describe('2: Testing the getSnapshotSTR API', () => {

    test('T2.1: Should retrieve an error if a user is not logged in', async () => {
        const response = await API.getSnapshotSTR(-1);
        expect(response.status).toBe(401);
    });

    test('T2.2: Should retrieve an error if STR is not found', async () => {
        await API.logIn(secretaryUser, password);
        const response = await API.getSnapshotSTR(-1);
        expect(response.status).toBe(404);
    });

    test('T2.3: Should return status 200s if a user is a secretary and the str exists', async () => {
        await API.logIn(secretaryUser, password);
        const response = await API.getSnapshotSTR(0);
        expect(response.status).toBe(200);
    });

});

describe('3: Testing the insertSTR API', () => {

    const str = {
        "requestDate": "2021-05-06",
        "approvalDate": "",
        "approved": null,
        "title": "test str title",
        "description": "Description for Thesis Request 1",
        "programmes": "Design in Graphic Design",
        "id": 123,
        "studentId": "s234567",
        "teacherId": "d123456",
        "notes": "Additional notes for Thesis Request 1",
        "type": "academic research"
    }

    const strMissingData = {
        "requestDate": "2021-05-06",
        "approvalDate": "",
        "approved": null,
        "programmes": "Design in Graphic Design",
        "id": 124,
        "studentId": "s234567",
        "teacherId": "d123456",
        "notes": "Additional notes for Thesis Request 1",
    }


    test('T3.1: Should retrieve an error if a user is not logged in', async () => {
        const response = await API.insertSTR(str);
        expect(response.status).toBe(401);
    });

    test('T3.2: Should retrieve an error if a user is not a student', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.insertSTR(str);
        expect(response.status).toBe(401);
    });

    test('T3.3: Should retrieve an error if str is missing data', async () => {
        await API.logIn(studentUser, password);
        const response = await API.insertSTR(strMissingData);
        expect(response.status).toBe(400);
    });

    test('T3.4: Should return status 200s if a user is a student and the str is valid', async () => {
        await API.logIn(studentUser, password);
        const response = await API.insertSTR(str);
        expect(response.status).toBe(200);
    });
});