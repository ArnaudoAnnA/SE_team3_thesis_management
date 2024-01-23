/** FUNCTION CHANGED, DEPRECATED */

// 'use strict';

// import { describe, expect, test } from '@jest/globals';
// import API from '../API.js';
// import dayjs from 'dayjs';
// // import TEST from '../models/_initdb.js';

// // beforeAll(async () => {
// //     // launch script to populate the database with test data
// //     await TEST.initTestData();
// // });

// const studentCredentials = {
//     email: "s234567@studenti.polito.it",
//     password: "test123"
// }

// const professorEmail = {
//     email: "d123456@polito.it",
//     password: "test123"
// };

// describe('Testing professor seeing active thesis proposals', () => {

//     test('Professor logged in: should return list of thesis', async () => {
//         await API.logOut();
//         await API.logIn(professorEmail.email, professorEmail.password);
//         const response = await API.getThesis(null, null, null, 1);
//         expect(response.status).toBe(200);
//         expect(response.thesis).toBeInstanceOf(Array);
//         expect(response.thesis.length).toBeLessThanOrEqual(1);
//     });

//     test('Professor logged in: should return list only active (not archived) thesis', async () => {
//         await API.logOut();
//         await API.logIn(professorEmail.email, professorEmail.password);
//         const response = await API.getThesis(null, null, null, 100);
//         expect(response.status).toBe(200);
//         expect(response.thesis).toBeInstanceOf(Array);
//         expect(response.thesis.length).toBeLessThanOrEqual(100);

//         async function check_thesis_dates()
//         {
//             let curr_date = await API.getVirtualDate();
//             response.thesis.forEach(t =>
//                 {
//                     expect(dayjs(t.expirationDate).isBefore(dayjs(curr_date))).toBeTruthy();
//                 });
//         }

//         check_thesis_dates();
//         API.changeVirtualDate(dayjs(await API.getVirtualDate()).add(6, 'month'));
//         check_thesis_dates();
//         API.changeVirtualDate(dayjs(await API.getVirtualDate()).add(2, 'year'));
//         check_thesis_dates();
//         API.changeVirtualDate(dayjs(await API.getVirtualDate()).subtract(4, 'year'));
//         check_thesis_dates();
//     });

// });