import Application from "./Application.js";
import Student from "./Student.js";
import Teacher from "./Teacher.js";
import Career from "./Career.js";
import ThesisProposal from "./ThesisProposal.js";
import Degree from "./Degree.js";

import dayjs from "dayjs";

const students = [
  {
    id: "s123456",
    surname: "Rossi",
    name: "Giuseppe",
    gender: "Male",
    nationality: "Italian",
    email: "s123456@studenti.polito.it",
    cod_degree: "AB123CD",
    enrollment_year: "2019",
  },
  {
    id: "s234567",
    surname: "Bianchi",
    name: "Francesca",
    gender: "Female",
    nationality: "Italian",
    email: "s234567@studenti.polito.it",
    cod_degree: "EF456GH",
    enrollment_year: "2021",
  },
  {
    id: "s345678",
    surname: "Ricci",
    name: "Luca",
    gender: "Male",
    nationality: "Italian",
    email: "s345678@studenti.polito.it",
    cod_degree: "IJ789KL",
    enrollment_year: "2023",
  },
  {
    id: "s456789",
    surname: "Romano",
    name: "Valentina",
    gender: "Female",
    nationality: "Italian",
    email: "s456789@studenti.polito.it",
    cod_degree: "MN012OP",
    enrollment_year: "2020",
  },
  {
    id: "s567890",
    surname: "Ferrari",
    name: "Marco",
    gender: "Male",
    nationality: "Italian",
    email: "s567890@studenti.polito.it",
    cod_degree: "QR345ST",
    enrollment_year: "2022",
  },
  {
    id: "s678901",
    surname: "Martini",
    name: "Alessia",
    gender: "Female",
    nationality: "Italian",
    email: "s678901@studenti.polito.it",
    cod_degree: "UV678WX",
    enrollment_year: "2021",
  },
  {
    id: "s789012",
    surname: "Conti",
    name: "Roberto",
    gender: "Male",
    nationality: "Italian",
    email: "s789012@studenti.polito.it",
    cod_degree: "YZ901AB",
    enrollment_year: "2023",
  },
  {
    id: "s890123",
    surname: "Gallo",
    name: "Laura",
    gender: "Female",
    nationality: "Italian",
    email: "s890123@studenti.polito.it",
    cod_degree: "CD234EF",
    enrollment_year: "2020",
  },
  {
    id: "s901234",
    surname: "Marino",
    name: "Simone",
    gender: "Male",
    nationality: "Italian",
    email: "s901234@studenti.polito.it",
    cod_degree: "GH567IJ",
    enrollment_year: "2022",
  },
  {
    id: "s012345",
    surname: "Ferrara",
    name: "Elena",
    gender: "Female",
    nationality: "Italian",
    email: "s012345@studenti.polito.it",
    cod_degree: "KL890MN",
    enrollment_year: "2021",
  },
];

export const teachers = [
  {
    id: "d123456",
    surname: "Smith",
    name: "John",
    email: "d123456@studenti.polito.it",
    cod_group: "AB123",
    cod_department: "CD456",
  },
  {
    id: "d234567",
    surname: "Johnson",
    name: "Alice",
    email: "d234567@studenti.polito.it",
    cod_group: "EF456",
    cod_department: "GH789",
  },
  {
    id: "d345678",
    surname: "Rossi",
    name: "Marco",
    email: "d345678@studenti.polito.it",
    cod_group: "IJ789",
    cod_department: "KL012",
  },
  {
    id: "d456789",
    surname: "Bianchi",
    name: "Laura",
    email: "d456789@studenti.polito.it",
    cod_group: "MN345",
    cod_department: "OP678",
  },
  {
    id: "d567890",
    surname: "Jones",
    name: "David",
    email: "d567890@studenti.polito.it",
    cod_group: "QR678",
    cod_department: "ST901",
  },
];

export const degrees = [
  {
    codDegree: 'AB123CD',
    titleDegree: 'Bachelor of Engineering in Electrical Engineering'
  },
  {
    codDegree: 'EF456GH',
    titleDegree: 'Bachelor of Design in Industrial Design'
  },
  { codDegree: 'IJ789KL', 
    titleDegree: 'Bachelor of Architecture' 
  },
  {
    codDegree: 'MN012OP',
    titleDegree: 'Master of Engineering in Civil Engineering'
  },
  {
    codDegree: 'QR345ST',
    titleDegree: 'Master of Design in Graphic Design'
  }
]

export const transformedDegrees = degrees.map(degree => {
  return {
    codDegree: degree.codDegree,
    titleDegree: degree.titleDegree
  };
});

const generateCareers = () => {
  const studentIDs = [
    "s123456",
    "s234567",
    "s345678",
    "s456789",
    "s567890",
    "s678901",
    "s789012",
    "s890123",
    "s901234",
    "s012345",
  ];

  const courses = ["Engineering", "Architecture", "Design"];

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomDate = () =>
    dayjs()
      .year(getRandomInt(2015, 2023))
      .month(getRandomInt(0, 11))
      .day(getRandomInt(1, 28));
  const getRandomGrade = () =>
    Math.random() < 0.95 ? getRandomInt(18, 30) : "30L";

  const careers = [];

  studentIDs.forEach((student) => {
    const numExams = getRandomInt(1, 3);
    for (let i = 0; i < numExams; i++) {
      const id = student + i;
      const codCourse = courses[getRandomInt(0, 2)];
      const titleCourse = codCourse + " Course";
      const cfu = [6, 8, 10, 12][getRandomInt(0, 3)];
      const grade = getRandomGrade();
      const date = getRandomDate();
      careers.push({
        id: id,
        codCourse: codCourse,
        titleCourse: titleCourse,
        cfu: cfu,
        grade: grade,
        date: date,
      });
    }
  });

  return careers;
};

export const careers = generateCareers();

const generateThesisProposals = () => {
  const teachers = ["d123456", "d234567", "d345678", "d456789", "d567890"];
  const emailDomains = ["@studenti.polito.it", "@example.com", "@company.com"]; // Possible email domains

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomDate = () =>
    dayjs()
      .year(getRandomInt(2022, 2026))
      .month(getRandomInt(0, 11))
      .day(getRandomInt(1, 28));
  const getRandomEmail = () =>
    teachers[getRandomInt(0, 4)] + emailDomains[getRandomInt(0, 2)];

  const thesisProposals = [];
  let thesisProposalIndex = 0;

  teachers.forEach((teacherId) => {
    for (let i = 0; i < 2; i++) {
      const title = `Thesis Proposal ${++thesisProposalIndex}`;
      const type = Math.random() < 0.5 ? "academic research" : "stage";
      const description = `Description for Thesis Proposal ${i + 1}`;
      const requiredKnowledge = `Required knowledge for Thesis Proposal ${
        i + 1
      }`;
      const level = Math.random() < 0.5 ? "master" : "bachelor";
      const programmes = `Programmes for Thesis Proposal ${i + 1}`;
      const expirationDate = getRandomDate();
      const coSupervisors = [getRandomEmail(), getRandomEmail()];
      const keywords = [`keyword${i + 1}`, `tag${i + 1}`];
      const notes = `Additional notes for Thesis Proposal ${i + 1}`;
      thesisProposals.push({
        id: thesisProposalIndex - 1,
        title: title,
        teacherId: teacherId,
        type: type,
        description: description,
        requiredKnowledge: requiredKnowledge,
        level: level,
        programmes: programmes,
        expirationDate: expirationDate,
        coSupervisors: coSupervisors,
        keywords: keywords,
        notes: notes,
      });
    }
  });

  return thesisProposals;
};

export const thesisProposals = generateThesisProposals();

export const applications = [
  {"studentId": "s123456", "thesisId": 2, "accepted": true, "curriculum": null, "date": dayjs("2022-08-15T12:30:00Z")},
  {"studentId": "s234567", "thesisId": 7, "accepted": false, "curriculum": null, "date": dayjs("2023-02-20T09:45:00Z")},
  {"studentId": "s345678", "thesisId": 4, "accepted": true, "curriculum": null, "date": dayjs("2022-11-10T15:20:00Z")},
  {"studentId": "s567890", "thesisId": 1, "accepted": false, "curriculum": null, "date": dayjs("2023-05-05T18:10:00Z")},
  {"studentId": "s678901", "thesisId": 8, "accepted": true, "curriculum": null, "date": dayjs("2022-09-30T14:05:00Z")},
  {"studentId": "s678901", "thesisId": 3, "accepted": true, "curriculum": null, "date": dayjs("2022-06-22T10:55:00Z")},
  {"studentId": "s789012", "thesisId": 5, "accepted": false, "curriculum": null, "date": dayjs("2023-01-18T17:35:00Z")},
  {"studentId": "s789012", "thesisId": 0, "accepted": true, "curriculum": null, "date": dayjs("2022-12-05T16:40:00Z")},
  {"studentId": "s901234", "thesisId": 9, "accepted": true, "curriculum": null, "date": dayjs("2022-07-12T13:15:00Z")},
  {"studentId": "s901234", "thesisId": 6, "accepted": false, "curriculum": null, "date": dayjs("2023-03-28T11:25:00Z")}
]