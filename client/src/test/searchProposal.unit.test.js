'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

describe('1: Testing the getAllThesis API', () => {
    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        await API.logOut();
        const response = await API.getAllThesis();
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive a thesis array with length=0 if there are any thesis', async () => {
        await API.logIn("d123456@polito.it", "test123");
        await API.removeAllProposals();
        const response = await API.getAllThesis();
        await API.logOut();
        expect(response.status).toBe(200);
        expect(response.thesis).toHaveLength(0);
    });

    test('T1.3: Should retrive a thesis array with length=1 if there is only 1 thesis', async () => {
        await API.logIn("d123456@polito.it", "test123");

        const user = await API.getUser("d123456@polito.it");
        
        await API.removeAllProposals();

        const thesisProposal = {
            archiveDate: new Date('2023-12-31').toISOString(),
            coSupervisors: ["Supervisor 1", "Supervisor 2"],
            description: "UnitTest",
            expirationDate: new Date('2023-12-31').toISOString(),
            groups: ["Group 1", "Group 2"],
            id: 25,
            keywords: ["Keyword 1", "Keyword 2"],
            level: "Master's",
            notes:  "Additional notes for the proposal.",
            programmes: "Programme name",
            requiredKnowledge: "Required knowledge for the proposal.",
            teacherId: user.id,
            title: "Unit Test Proposal",
            type: "Type of thesis"
            };

        await API.insertProposal(thesisProposal);
        const response = await API.getAllThesis();
        await API.logOut();
        expect(response.status).toBe(200);
        expect(response.thesis).toHaveLength(1);
    });

});


describe('2: Testing the getThesis API', () => {
    //teacherName still missing
    test('T2.1: Should retrive an error if a user is not logged in', async () => {
        await API.logOut();
        const response = await API.getThesis({type: "myType"});
        expect(response.status).toBe(401);
    });

    test('T2.2: Should retrive a thesis array with length=0 if there are any thesis', async () => {
        await API.logIn("d123456@polito.it", "test123");
        await API.removeAllProposals();
        const response = await API.getThesis({type : "myType"});
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