'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';
import { TESTAPI } from '../API.js';
// import TEST from '../models/_initdb.js';

// beforeAll(async () => {
//     // launch script to populate the database with test data
//     await TEST.initTestData();
// });


describe('testing the acceptApplication function', () => {

    test('Should retrieve an error if a teacher is not logged in', async () => {
        await API.logOut();
        const response = await API.acceptApplication("KTlVJduD2sOoZqVnUFaR");
        expect(response.status).toEqual(401);
        expect(response.err).toEqual("User not logged in");
    });

    test('Should retrieve an error if the application has already been accepted', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const acceptedApplication = await TESTAPI.getAcceptedApplicationId();
        const response = await API.acceptApplication(acceptedApplication);
        expect(response.status).toEqual(400);
        expect(response.err).toEqual("Application already accepted");
    });

    test('Should accept an application', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const pendingApplication = await TESTAPI.getPendingApplicationId();
        const response = await API.acceptApplication(pendingApplication);
        expect(response.status).toEqual(200);
    });

    //We try to accept an application which id does not exist
    test('Should retrieve an error if the application does not exist', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const response = await API.acceptApplication("123456789");
        expect(response.status).toEqual(404);
        expect(response.err).toEqual("Application not found");
    });
});

describe('testing the declineApplication function', () => {
    test('Should retrieve an error if a teacher is not logged in', async () => {
        await API.logOut();
        const response = await API.declineApplication("KTlVJduD2sOoZqVnUFaR");
        expect(response.status).toEqual(401);
        expect(response.err).toEqual("User not logged in");
    });

    test('Should retrieve an error if the application has already been declined', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const declinedApplication = await TESTAPI.getDeclinedApplicationId();
        const response = await API.declineApplication(declinedApplication);
        expect(response.status).toEqual(400);
        expect(response.err).toEqual("Application already declined");
    }
    );

    test('Should decline an application', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123");
        const pendingApplication = await TESTAPI.getPendingApplicationId();
        const response = await API.declineApplication(pendingApplication);
        expect(response.status).toEqual(200);
    }
    );

});

