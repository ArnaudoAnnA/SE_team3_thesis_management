'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';
// import TEST from '../models/_initdb.js';

// beforeAll(async () => {
//     // launch script to populate the database with test data
//     await TEST.initTestData();
// });

describe('1: Testing the getThesis API', () => {
    //teacherName still missing
    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        await API.logOut();
        const response = await API.getThesis({type: "myType"});
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive a thesis array with length=0 if there are any thesis', async () => {
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.getThesis({type : "myType"}, null, null, 0);
        await API.logOut();
        expect(response.status).toBe(200);
        expect(response.thesis).toHaveLength(0);
    });
});

/*
expect(response.status).toBe(200);
expect(response.body.data).toBeNull();
expect(response.body.data).toHaveProperty("notes");
expect(response.body.data).toBeGreaterThanOrEqual(1);
expect(response.body.data).toBe(0);
expect(response.body.data).toHaveLength(2)
*/