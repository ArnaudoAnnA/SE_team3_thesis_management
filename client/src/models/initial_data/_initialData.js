import applications from "/application.json";
import students from "/student.json";
import teachers from "/teacher.json";
import careers from "/career.json";
import thesisProposals from "/thesisProposal.json";
import degrees from "/degree.json";

import dayjs from "dayjs";

export const date = [
  {
    date: dayjs("2021-09-01T00:00:00Z").format("YYYY-MM-DD")
  }
];

export const applications = applications;
export const students = students;
export const teachers = teachers;
export const careers = careers;
export const thesisProposals = thesisProposals;
export const degrees = degrees;