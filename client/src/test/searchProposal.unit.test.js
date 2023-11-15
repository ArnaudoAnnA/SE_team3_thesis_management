'use strict';

import { describe, expect, test } from '@jest/globals';
import API from '../API.js';

describe('1: Testing the getAllThesis API', () => {
    //Who call it? And also, it returns something different from what Anna asked maybe
});

describe('2: Testing the getThesis API', () => {
    //teacherName still missing
});

describe('3: Testing the getThesisNumber API', () => {
    //You can work on it
});

describe('4: Testing the getThesisWithId API', () => {
    //It returns something different from what Anna asked maybe

    test('T4.1: Should retrive an error if a user is not logged in', async () => {
        const response = await API.getThesisWithId(0);
        expect(response.status).toBe(401);
    });

    test('T4.2: Should retrive an error if ID is not a number', async () => {
        API.logIn("d345678@studenti.polito.it", "d345678")
        const response = await API.getThesisWithId("hello");
        API.logOut();
        expect(response.status).toBe(400);
    });
    
    //...

    test('T4.x: Should retrieve a thesis proposal from the database', async () => {
        API.logIn("d345678@studenti.polito.it", "d345678")
        await API.insertProposal(thesisProposal);
        const response = await API.getThesisWithId(0);
        API.logOut();
        expect(response.status).toBe(200);
        //expect(response.body.data).toHaveProperty("ok")
        //expect(response.body.data).toHaveProperty("err")
    });
})

//expect(cats).toHaveLength(2)