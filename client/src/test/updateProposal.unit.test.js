'use strict';

import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import API from '../API.js';
import TEST from '../models/_initdb.js';

beforeAll(async () => {
    // launch script to populate the database with test data
    await TEST.initTestData();
});

const teacherUser = "d123456@polito.it";
const studentUser = "s234567@studenti.polito.it";
const password = "test123"

describe('1: Testing the updateProposal API', () => {
    beforeEach(async () => {
        await API.logOut();
    });

    afterEach(async () => {
        await API.logOut();
    });

    const updateProposal = {
        title: "UPDATED Instrumenting Kubernetes 5G services with eBPF probes",
        coSupervisors: ["david@example.com", "d567890@polito.it"],
        description: "Description for Thesis Proposal 1",
        programmes: "Design in Graphic Design",
        keywords: ["keyword1", "tag1"],
        level: "master",
        archiveDate: "2025-08-24T14:15:06.473Z",
        teacherId: "d123456",
        notes: "Additional notes for Thesis Proposal 1",
        expirationDate: "2025-09-24T14:15:06.473Z",
        requiredKnowledge: "Required knowledge for Thesis Proposal 1",
        type: "academic research"
    }
    
    const sameNameUpdatedProposal = {
        title: 'Scalable Cloud Solutions for Web Applications',
        coSupervisors: ["david@example.com", "d567890@polito.it"],
        description: "Description for Thesis Proposal 1",
        programmes: "Design in Graphic Design",
        keywords: ["keyword1", "tag1"],
        level: "master",
        archiveDate: "2025-08-24T14:15:06.473Z",
        teacherId: "d123456",
        notes: "Additional notes for Thesis Proposal 1",
        expirationDate: "2025-09-24T14:15:06.473Z",
        requiredKnowledge: "Required knowledge for Thesis Proposal 1",
        type: "academic research"
    }

    const emptyProposal = {};

    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        const response = await API.updateProposal(-1, emptyProposal);
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive an error if the user is not a teacher', async () => {
        await API.logIn(studentUser, password);

        const response = await API.updateProposal(-1, emptyProposal);
        expect(response.status).toBe(401);
    });

    test('T1.3: Should retrive an error if the proposal does not exist', async () => {
        await API.logIn(teacherUser, password);

        const response = await API.updateProposal(-1, emptyProposal);
        expect(response.error).toEqual("Thesis not found");
        expect(response.status).toBe(404);
    });

    test('T1.4: Should update the proposal if everything is right', async () => {
        await API.logIn(teacherUser, password);
        
        const user = await API.getUser();
        updateProposal.teacherId = user.id;
        console.log(user)

        const response = await API.updateProposal(0, updateProposal);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(25);
    });

    test('T1.5: Should retrive an error if the proposal has a title that already exists', async () => {
        await API.logIn("d123456@polito.it", password)
        const response = await API.updateProposal(0, sameNameUpdatedProposal);
        expect(response.error).toBe("A thesis with this title already exists");
        expect(response.status).toBe(400);
    });
});