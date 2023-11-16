'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

describe('testing the application to a thesis proposal in the database', () => {

    const applicationNoCurriculum = {
        "thesisId": 1,
        "studentId": 's789012',
        "curriculumId": null
    };


    test('should retrive an error if a teacher is not logged in', async () => {
        await API.logOut();
        const response = await API.addApplication();
        expect(response.status).toEqual(401);
    });

    test('should retrive an error if the application does not have all the required fields', async () => {
        await API.logOut();
        await API.logIn("d345678@studenti.polito.it", "d345678");
        const response = await API.addApplication(applicationNoCurriculum);
        expect(response).toBe("Application sent")
    });
});