'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

const studentCredentials = {
    email: "s234567@studenti.polito.it",
    password: "test123"
}

const professorEmail = {
    email: "d123456@polito.it",
    password: "test123"
};

describe('Testing professor seeing active thesis proposals', () => {

    test('Professor logged in: should return list of thesis', async () => {
        await API.logOut();
        await API.logIn(professorEmail.email, professorEmail.password);
        const response = await API.getThesis(null, null, null, 1);
        expect(response.status).toBe(200);
        expect(response.thesis).toBeInstanceOf(Array);
        expect(response.thesis.length).toBeLessThanOrEqual(1);
    });

});