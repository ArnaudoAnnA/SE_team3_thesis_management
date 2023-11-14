'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

describe('testing the insertion of a thesis proposal in the database', () => {

    const thesisProposal = {
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
        notes: "notes"
    };

    test('should retrive an error if a teacher is not logged in', async () => {
        const response = await API.insertProposal(thesisProposal);
        expect(response.status).toEqual(401);
    });

    test('should retrive an error if a student is logged in', async () => {
        API.logIn("s901234@studenti.polito.it", "s901234")
        const response = await API.insertProposal(thesisProposal);
        API.logOut();
        expect(response.status).toEqual(401);
    });

    test('should add a thesis proposal to the database', async () => {
        API.logIn("d345678@studenti.polito.it", "d345678")
        const response = await API.insertProposal(thesisProposal);
        API.logOut();
        expect(response.status).toEqual(200);
    });
});