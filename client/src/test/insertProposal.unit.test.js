'use strict';

import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import API from '../API.js';
// import TEST from '../models/_initdb.js';

// beforeAll(async () => {
//     // launch script to populate the database with test data
//     await TEST.initTestData();
// });

describe('testing the insertion of a thesis proposal in the database', () => {

    const thesisProposal = {
        archiveDate: "",
        coSupervisors: ["coSupervisor1", "coSupervisor2"],
        description: "description",
        expirationDate: "2024-01-01",
        groups: ["group1", "group2"],
        id: 123456789,
        keywords: ["keyword1", "keyword2"],
        level: "Bachelor",
        notes: "some notes",
        programmes: "programme",
        requiredKnowledge: "requiredKnowledge",
        teacherId: "d345678",
        title: "title",
        type: "type",
    };

    const thesisProposalShort = {
        title: "title",
        type: "type",
        description: "description",
        requiredKnowledge: "requiredKnowledge",
        level: "level",
        programmes: ["programme1", "programme2"],
    };

    const thesisProposalWrong = {
        title: "title",
        type: "type",
        description: "description",
        requiredKnowledge: "requiredKnowledge",
        level: "level",
        programmes: ["programme1", "programme2"],
        expirationDate: "2024-01-01",
        coSupervisors: ["coSupervisor1", "coSupervisor2"],
        keywords: ["keyword1", "keyword2"],
        groups: ["group1", "group2"],
        notes: "notes",
        wrongField: "wrongField"
    };

    const thesisProposalEmpty = {
        title: "",
        type: "type",
        description: "description",
        requiredKnowledge: "requiredKnowledge",
        level: "level",
        programmes: ["programme1", "programme2"],
        expirationDate: "2024-01-01",
        coSupervisors: ["coSupervisor1", "coSupervisor2"],
        keywords: ["keyword1", "keyword2"],
        groups: ["group1", "group2"],
        notes: "notes",
        wrongField: "wrongField"
    };

    test('should retrive an error if a teacher is not logged in', async () => {
        await API.logOut();
        const response = await API.insertProposal(thesisProposal);
        expect(response.status).toEqual(401);
    });

    test('should retrive an error if a student is logged in', async () => {
        await API.logOut();
        await API.logIn("s234567@studenti.polito.it", "test123");
        const response = await API.insertProposal(thesisProposal);
        await API.logOut();
        expect(response.status).toEqual(401);
    });

    test('should retrive an error if the thesis proposal does not have all the required fields', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123")
        const response = await API.insertProposal(thesisProposalShort);
        await API.logOut();
        expect(response.status).toEqual(400);
    });

    test('should retrive an error if the thesis proposal has a wrong field', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123")
        const response = await API.insertProposal(thesisProposalWrong);
        await API.logOut();
        expect(response.status).toEqual(400);
    });

    test('should retrive an error if the thesis proposal has an empty field', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123")
        const response = await API.insertProposal(thesisProposalEmpty);
        await API.logOut();
        expect(response.status).toEqual(400);
    });

    test('should add a thesis proposal to the database', async () => {
        await API.logOut();
        await API.logIn("d123456@polito.it", "test123")
        const response = await API.insertProposal(thesisProposal);
        await API.logOut();
        expect(response.error).toBe(null);
        expect(response.status).toEqual(200);
        
    });
 


});