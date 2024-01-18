'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

beforeEach(async () => {
    await API.logOut();
});

afterEach(async () => {
    await API.logOut();
});

describe('testing the getNotifications API', () => {

    const acceptedApplications = ["swK6V31H9vOA7YU293Hn","3K6sLgOzPKDIp4HTwXX3","8cdJi7pfCp8TXGZU8CDq", "nmkrc8O5mEDionLYIRgU", "snt8Kne11ScimR4KTvwA"]
    const declinedApplications = ["H4oCncW0Y48kLrWoINDQ", "KTlVJduD2sOoZqVnUFaR","L6j6HB2JR2Ig9n2B2obk", "MVzgEaS0cGQhDlLzBx0b", "gsntN4bG23fjEiWLnSaG", "rozNTqebvquCHm2iqR86"]
    const nullApplications = ["vB2oSIGDr6JeHJDDoDz6", "t2W5rhhZBCp4CymK0OsF"];
    
    test('T1.1: Should retrieve an error if a user is not logged in', async () => {
        const response = await API.getNotifications();
        expect(response.status).toBe(401);
    });




    /*test('T2.x: Should return status 200s if the notification exists', async () => {
        await API.logIn(secretaryUser, password);
        const response = await API.getSnapshotSTR(0);
        expect(response.status).toBe(200);
    });*/
});
