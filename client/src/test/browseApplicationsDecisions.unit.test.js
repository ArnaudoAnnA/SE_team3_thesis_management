/** DEPRECATED FUNCTION */

// 'use strict';

// import { describe, expect, test } from '@jest/globals';
// import API from '../API.js';

// describe('testing the browse Application function', () => {

//     const acceptedApplicationsStudent = "Hola";
//     const rejectedApplicationsStudent = "Ciao";
//     const acceptedApplicationsTeacher = "Bonjour";
//     const rejectedApplicationsTeacher = "Ni hao";

//     //We try to retrieve all the accepted applications for the logged student
//     test('Should retrieve all the accepted applications for the logged student', async () => {
//         await API.logOut();
//         await API.logIn("s234567@studenti.polito.it","test123");
//         const response = await API.getApplicationsByState("Accepted");
//         expect(response).toEqual(acceptedApplicationsStudent);
//     });

//     //We try to retrieve all the rejected applications for the logged student
//     test('Should retrieve all the rejected applications for the logged student', async () => {
//         await API.logOut();
//         await API.logIn("s234567@studenti.polito.it","test123");
//         const response = await API.getApplicationsByState("Rejected");
//         expect(response).toEqual(rejectedApplicationsStudent);
//     });

//     //We try to retrieve applications without being logged in
//     test("Should retrieve an error if the student is not logged in", async () => {
//         await API.logOut();
//         const response = await API.getApplicationsByState("Accepted");
//         expect(response).toEqual(null);
//     });

//     //We try to retrieve all the accepted applications for the logged teacher
//     test('Should retrieve all the accepted applications for the logged teacher', async () => {
//         await API.logOut();
//         await API.logIn("d123456@polito.it", "test123");
//         const response = await API.getApplicationsByState("Accepted");
//         expect(response).toEqual(acceptedApplicationsTeacher);
//     } );

//     //We try to retrieve all the rejected applications for the logged teacher
//     test('Should retrieve all the accepted applications for the logged teacher', async () => {
//         await API.logOut();
//         await API.logIn("d123456@polito.it", "test123");
//         const response = await API.getApplicationsByState("Rejected");
//         expect(response).toEqual(rejectedApplicationsTeacher);
//     } );

// });

