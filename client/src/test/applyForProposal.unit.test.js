'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';
// import TEST from '../models/_initdb.js';

// beforeAll(async () => {
//     // launch script to populate the database with test data
//     await TEST.initTestData();
// });

describe('testing the application to a thesis proposal in the database', () => {
    const applicationNoCurriculum = {
        "thesisId": 1,
        "studentId": 's234567',
        "curriculumId": null
    };

    test('should retrive an error if a student is not logged in', async () => {
        await API.logOut();
        const response = await API.addApplication(applicationNoCurriculum);
        expect(response.status).toEqual(401);
    });

    test('should add an application to a thesis proposal if a student is logged in', async () => {
        await API.logOut();
        await API.logIn("s234567@studenti.polito.it", "test123");
        const response = await API.addApplication(applicationNoCurriculum);
        expect(response.status).toBe(200);
    });
});