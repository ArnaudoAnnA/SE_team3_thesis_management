'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

describe('1: Testing the getAllThesis API', () => {
    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        //ready
        const response = await API.getAllThesis();
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive a thesis array with length=0 if there are any thesis', async () => {
        //ready
        await API.logIn("d345678@studenti.polito.it", "d345678");
        await API.removeAllProposals();
        const response = await API.getAllThesis();
        await API.logOut();
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(0);
    });

    test('T1.3: Should retrive a thesis array with length=1 if there is only 1 thesis', async () => {
        //ready
        await API.logIn("d345678@studenti.polito.it", "d345678");

        const user = await API.getUser("d345678@studenti.polito.it");
        
        await API.removeAllProposals();

        const thesisProposal = {
            archiveDate: new Date('2023-12-31'), // Replace with your timestamp
            coSupervisors: ["Supervisor 1", "Supervisor 2"],
            description: "UnitTest",
            expirationDate: new Date('2024-01-31'), // Replace with your timestamp
            groups: ["Group 1", "Group 2"],
            id: 25,
            keywords: ["Keyword 1", "Keyword 2"],
            level: "Master's",
            notes: "Additional notes for the proposal.",
            programmes: "Programme name",
            requiredKnowledge: "Required knowledge for the proposal.",
            teacherId: user.id,
            title: "Unit Test Proposal",
            type: "Type of thesis", // Replace with your type
        };

        await API.insertProposal(thesisProposal);
        const response = await API.getAllThesis();
        await API.logOut();
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
    });

});


describe('2: Testing the getThesis API', () => {
    //teacherName still missing
    test('T2.1: Should retrive an error if a user is not logged in', async () => {
        //ready
        const response = await API.getThesis();
        expect(response.status).toBe(401);
    });
});

/*
describe('3: Testing the getThesisNumber API', () => {

    test('T3.2: Should retrive a number>=1', async () => {
        //Wait for insertProposal development paying attention if it returns the thesisId
        API.logIn("d345678@studenti.polito.it", "d345678")
        const proposalID = await API.insertProposal(thesisProposal);
        const response = await API.getThesisNumber();
        API.logOut();
        expect(response.status).toBe(200);
        expect(response.body.data).toBeGreaterThanOrEqual(1);
    });

    test('T3.3: Should retrive 0', async () => {
        //ready
        API.logIn("d345678@studenti.polito.it", "d345678")
        await API.removeAllProposals();
        const response = await API.getThesisNumber();
        API.logOut();
        expect(response.status).toBe(200);
        expect(response.body.data).toBe(0);
    });

});

describe('4: Testing the getThesisWithId API', () => {
    test('T4.1: Should retrive an error if a user is not logged in', async () => {
        //ready
        const response = await API.getThesisWithId(0);
        expect(response.status).toBe(401);
    });

    test('T4.2: Should retrive a null object if the thesis does not exist', async () => {
        //ready
        API.logIn("d345678@studenti.polito.it", "d345678")
        const response = await API.getThesisWithId("hello");
        API.logOut();
        expect(response.status).toBe(200);
        expect(response.body.data).toBeNull();
    });

    test('T4.3: Should retrieve a thesis proposal from the database', async () => {
        //Wait for insertProposal development paying attention if it returns the thesisId
        API.logIn("d345678@studenti.polito.it", "d345678")
        const proposalID = await API.insertProposal(thesisProposal);
        const response = await API.getThesisWithId(proposalID);
        API.logOut();
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("title");
        expect(response.body.data).toHaveProperty("type");
        expect(response.body.data).toHaveProperty("description");
        expect(response.body.data).toHaveProperty("requiredKnowledge");
        expect(response.body.data).toHaveProperty("level");
        expect(response.body.data).toHaveProperty("programmes");
        expect(response.body.data).toHaveProperty("expirationDate");
        expect(response.body.data).toHaveProperty("coSupervisors");
        expect(response.body.data).toHaveProperty("keywords");
        expect(response.body.data).toHaveProperty("groups");
        expect(response.body.data).toHaveProperty("notes");
    });
})
*/

/*
expect(response.status).toBe(200);
expect(response.body.data).toBeNull();
expect(response.body.data).toHaveProperty("notes");
expect(response.body.data).toBeGreaterThanOrEqual(1);
expect(response.body.data).toBe(0);
expect(response.body.data).toHaveLength(2)
*/