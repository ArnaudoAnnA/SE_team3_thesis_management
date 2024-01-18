'use strict';

import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import API from '../API.js';
import { TESTAPI } from '../API.js';
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
const password = "test123"

describe('1: Testing the deleteProposal API', () => {
    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        const response = await API.deleteProposal(-1);
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive an error if a user is not a teacher', async () => {
        await API.logIn(studentUser, password);
        const response = await API.deleteProposal(-1);
        expect(response.status).toBe(401);
    });

    test('T1.3: Should retrive an error if thesis is already archived', async () => {
        await API.logIn(teacherUser, password);
        const archivedThesis = TESTAPI.getOneArchivedThesis();
        const response = await API.deleteProposal(archivedThesis.id);
        expect(response.status).toBe(400);
    });

    test('T1.4: Should return status 200s if a user is a teacher and the thesis exists', async () => {
        await API.logIn(teacherUser, password);
        const thesis = TESTAPI.getOneActiveThesis();
        const response = await API.deleteProposal(thesis.id);
        expect(response.status).toBe(200);
    });
});