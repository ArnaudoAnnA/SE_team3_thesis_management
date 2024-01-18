'use strict';

import { describe, expect, test } from '@jest/globals';
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

describe('testing the getNotifications API', () => {
    test('T1.1: Should retrieve an error if a user is not logged in', async () => {
        const response = await API.getNotifications();
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive a list of notifications if a user is logged in', async () => {
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.getNotifications();
        expect(response.status).toBe(200);
    });
});
