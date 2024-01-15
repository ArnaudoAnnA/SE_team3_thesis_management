import app from "./applications.js";
import studs from "./students.js";
import teachs from "./teachers.js";
import cars from "./careers.js";
import thesis from "./thesisProposals.js";
import degs from "./degrees.js";
import str from "./thesisRequests.js";
import secret from "./secretaries.js";

import dayjs from "dayjs";

export const date = [
  {
    date: dayjs("2021-09-01T00:00:00Z").format("YYYY-MM-DD"),
  },
];

export const applications = app;
export const students = studs;
export const teachers = teachs;
export const careers = cars;
export const thesisProposals = thesis;
export const degrees = degs;
export const thesisRequests = str;
export const secretaries = secret;
