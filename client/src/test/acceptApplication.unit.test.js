'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

describe('testing the application to a thesis proposal in the database', () => {

    const acceptedApplications = ["KTlVJduD2sOoZqVnUFaR", "nmkrc8O5mEDionLYIRgU", "snt8Kne11ScimR4KTvwA", "swK6V31H9vOA7YU293Hn", "t2W5rhhZBCp4CymK0OsF", "vB2oSIGDr6JeHJDDoDz6"]

    const nonAcceptedApplications = ["3K6sLgOzPKDIp4HTwXX3", "8cdJi7pfCp8TXGZU8CDq", "H4oCncW0Y48kLrWoINDQ", "L6j6HB2JR2Ig9n2B2obk", "MVzgEaS0cGQhDlLzBx0b"]

    test('Should retrieve an error if a teacher is not logged in', async () => {
        await API.logOut();
        const response = await API.acceptApplication("KTlVJduD2sOoZqVnUFaR");
        expect(response.status).toEqual(401);
    });

    //We try to accept all the aplications that have already been accepted
    for (let i = 0; i < acceptedApplications.length; i++) {
        test('Should retrieve an error if the application has already been accepted', async () => {
            await API.logOut();
            await API.logIn("d123456@polito.it", "test123");
            const response = await API.acceptApplication(acceptedApplications[i]);
            expect(response.status).toEqual(401);

        });
    };

    //We try to accept the first application that has not been accepted
    test('Should accept an application', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.acceptApplication(nonAcceptedApplications[0]);
        expect(response.status).toEqual(200);
    });

    //We try to accept an application which id does not exist
    test('Should retrieve an error if the application does not exist', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.acceptApplication("123456789");
        expect(response.status).toEqual(404);
    });

});