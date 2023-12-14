'use strict';

import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import API from '../API.js';
import { addDoc, deleteDoc } from 'firebase/firestore';

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
        const archivedThesis = {
            id: 20,
            title: "Archived thesis",
            archiveDate: '2010-01-01',
        }
        const ref = await addDoc("test-thesis", archivedThesis);
        const response = await API.deleteProposal(20);
        expect(response.status).toBe(400);
        await deleteDoc(ref);
    });

    test('T1.5: Should return status 200s if a user is a teacher and the thesis exists', async () => {
        await API.logIn(teacherUser, password);
        const response = await API.deleteProposal(0);
        expect(response.status).toBe(200);
    });
});