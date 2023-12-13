'use strict';

import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import API from '../API.js';


describe('1: Testing the updateProposal API', () => {
    beforeEach(async () => {
        await API.logOut();
    });

    afterEach(async () => {
        await API.logOut();
    });

    const predefinedProposalStructure = {
        archiveDate: 'dayjs(selectedDate).toISOString()',
        coSupervisors: 'emailTags',
        description: 'description',
        expirationDate: 'dayjs(selectedDate).toISOString()',
        keywords: 'tags',
        level: 'level',
        notes: 'note',
        programmes: 'pname',
        requiredKnowledge: 'knowledge',
        teacherId: 'user.id',
        title: 'title',
        type: 'degree',
    };

    const originalProposal = {
        archiveDate: "2024-05-20T07:17:35.131Z",
        coSupervisors: ["s123456@polito.it"],
        description: "Tesi in azienda",
        expirationDate: '2024-05-20T07:17:35.131Z',
        keywords: ['Reply'],
        level: 'bachelor',
        notes: '',
        programmes: 'Architecture',
        requiredKnowledge: 'Web App1',
        teacherId: undefined,
        title: 'Reply: Investigation of AI-Powered Robotics for Automated Manufacturing Processes',
        type: 'Stage',
    }

    const updateProposal = {
        archiveDate: "2024-05-20T07:17:35.131Z",
        coSupervisors: ["s123456@polito.it"],
        description: "Tesi in azienda",
        expirationDate: '2024-05-20T07:17:35.131Z',
        keywords: ['Reply'],
        level: 'master',
        notes: '',
        programmes: 'Architecture',
        requiredKnowledge: 'Web App1',
        teacherId: undefined,
        title: 'Reply: Investigation of AI-Powered Robotics for Automated Manufacturing Processes',
        type: 'Stage',
    }

    const emptyProposal = {};

    test('T1.1: Should retrive an error if a user is not logged in', async () => {
        const response = await API.updateProposal(-1, emptyProposal);
        expect(response.status).toBe(401);
    });

    test('T1.2: Should retrive an error if the user is not a teacher', async () => {
        await API.logIn("s901234@studenti.polito.it", "7eNfF7Ssxvctd7");

        const response = await API.updateProposal(-1, emptyProposal);
        expect(response.status).toBe(500);
    });

    test('T1.3: Should retrive an error if the proposal does not exist', async () => {
        await API.logIn("d345678@polito.it", "p6bTzUftxNHG5y");

        const response = await API.updateProposal(-1, emptyProposal);
        expect(response.status).toBe(500);
        console.log(response.body)
    });

    test('T1.4: Should update the proposal if everything is right', async () => {
        await API.logIn("d345678@polito.it", "p6bTzUftxNHG5y");
        
        const user = await API.getUser();
        updateProposal.teacherId = user.id;
        console.log(user)

        const response = await API.updateProposal(25, updateProposal);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(25);
    });
});