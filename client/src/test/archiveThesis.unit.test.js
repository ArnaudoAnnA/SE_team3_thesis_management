'use strict';

import { describe, expect, test, beforeEach, afterEach, afterAll } from '@jest/globals';
import API from '../API.js';

beforeEach(async () => {
    await API.logOut();
});

afterEach(async () => {
    await API.logOut();
});

const teacherUser = "d123456@polito.it";
const studentUser = "s234567@studenti.polito.it";
const password = "test123"

describe('1: Testing the archiveProposal API', () => {
    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        const response = await API.archiveThesis(-1);
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive an error if a user is not a teacher', async () => {
        await API.logIn(studentUser, password);
        const response = await API.archiveThesis(-1);
        expect(response.error).toBe("User is not a teacher");
        expect(response.status).toBe(401);

    });

    test('T1.3: Should retrive an error if thesis is not found', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.archiveThesis(-1);
        expect(response.error).toBe("Thesis not found");
        expect(response.status).toBe(404);
    });

    test('T1.4: Should not retrieve an error if a user is a teacher and the thesis exists', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.archiveThesis(0);
        expect(response.status).toBe(200);
    }); 
});

describe('2: Testing the getApplicationsByStateByThesis API', () => {
    test('T2.1: Should retrive an error if a user is not logged in', async () => {
        const response = await API.getApplicationsByStateByThesis("", -1);
        expect(response.status).toBe(401);
    });

    test('T2.3: Should retrieve accepted applications', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.getApplicationsByStateByThesis("Accepted", 0);
        console.log(response)
        expect(response.status).toBe(200);
    });

    test('T2.4: Should retrieve rejected applications', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.getApplicationsByStateByThesis("Rejected", 0);
        console.log(response)
        expect(response.status).toBe(200);
    });
    
    test('T2.5: Should retrieve pending applications', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.getApplicationsByStateByThesis("Pending", 0);
        console.log(response)
        expect(response.status).toBe(200);
    });
});