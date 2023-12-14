const careers = [
  {
    "titleCourse": "Test Course",
    "cfu": 8,
    "date": "2022-11-29T15:15:06.465Z",
    "codCourse": "Cod Test Course",
    "grade": 23,
    "id": "s000000"
  },
  {
    "titleCourse": "Information Systems Course",
    "cfu": 8,
    "date": "2022-11-29T15:15:06.465Z",
    "codCourse": "Information Systems",
    "grade": 23,
    "id": "s234567"
  },
  {
    "date": "2020-07-05T14:15:06.465Z",
    "cfu": 10,
    "grade": 26,
    "titleCourse": "Software Engineering 1 Course",
    "id": "s123456",
    "codCourse": "Software Engineering 1"
  },
  {
    "titleCourse": "Web App 1 Course",
    "cfu": 10,
    "codCourse": "Web App 1",
    "grade": 19,
    "date": "2016-12-31T15:15:06.466Z",
    "id": "s345678"
  },
  {
    "titleCourse": "Information Systems Course",
    "id": "s890123",
    "grade": 22,
    "cfu": 6,
    "codCourse": "Information Systems",
    "date": "2017-12-11T15:15:06.470Z"
  },
  {
    "cfu": 10,
    "grade": 29,
    "titleCourse": "Data Science Course",
    "date": "2021-10-20T14:15:06.462Z",
    "codCourse": "Data Science",
    "id": "s123456"
  },
  {
    "titleCourse": "System Programming Course",
    "grade": 26,
    "date": "2019-08-15T14:15:06.469Z",
    "cfu": 6,
    "id": "s678901",
    "codCourse": "System Programming"
  },
  {
    "id": "s567890",
    "codCourse": "System Programming",
    "titleCourse": "System Programming Course",
    "date": "2020-12-28T15:15:06.469Z",
    "cfu": 12,
    "grade": 24
  },
  {
    "grade": 23,
    "codCourse": "Web App 1",
    "cfu": 8,
    "date": "2020-10-06T14:15:06.469Z",
    "titleCourse": "Web App 1 Course",
    "id": "s678901"
  },
  {
    "titleCourse": "Software Engineering 1 Course",
    "grade": 28,
    "id": "s678901",
    "date": "2015-01-31T15:15:06.469Z",
    "codCourse": "Software Engineering 1",
    "cfu": 10
  },
  {
    "titleCourse": "Information Systems Course",
    "codCourse": "Information Systems",
    "cfu": 12,
    "id": "s012345",
    "date": "2015-01-15T15:15:06.473Z",
    "grade": 26
  },
  {
    "titleCourse": "Architecture Course",
    "id": "s345678",
    "codCourse": "Architecture",
    "cfu": 12,
    "grade": 22,
    "date": "2018-05-08T14:15:06.466Z"
  },
  {
    "id": "s901234",
    "codCourse": "System Programming",
    "grade": 20,
    "titleCourse": "System Programming Course",
    "cfu": 6,
    "date": "2021-05-08T14:15:06.472Z"
  },
  {
    "date": "2020-04-01T14:15:06.472Z",
    "cfu": 10,
    "titleCourse": "Software Engineering 1 Course",
    "codCourse": "Software Engineering 1",
    "id": "s901234",
    "grade": 25
  },
  {
    "id": "s678901",
    "titleCourse": "Formal Languages Course",
    "grade": 25,
    "codCourse": "Formal Languages",
    "cfu": 12,
    "date": "2022-06-12T14:15:06.469Z"
  },
  {
    "codCourse": "Software Engineering 1",
    "cfu": 12,
    "grade": 27,
    "date": "2017-03-17T15:15:06.471Z",
    "titleCourse": "Software Engineering 1 Course",
    "id": "s890123"
  },
  {
    "grade": 19,
    "codCourse": "Computer Networks",
    "titleCourse": "Computer Networks Course",
    "id": "s234567",
    "date": "2022-05-29T14:15:06.465Z",
    "cfu": 8
  },
  {
    "codCourse": "Information Systems",
    "id": "s456789",
    "date": "2016-03-24T15:15:06.466Z",
    "titleCourse": "Information Systems Course",
    "cfu": 12,
    "grade": 20
  },
  {
    "titleCourse": "Information Systems Course",
    "grade": 25,
    "cfu": 12,
    "id": "s567890",
    "codCourse": "Information Systems",
    "date": "2019-08-30T14:15:06.468Z"
  },
  {
    "date": "2015-06-04T14:15:06.472Z",
    "titleCourse": "Data Science Course",
    "cfu": 10,
    "id": "s012345",
    "codCourse": "Data Science",
    "grade": 18
  },
  {
    "date": "2023-04-23T14:15:06.466Z",
    "codCourse": "System Programming",
    "id": "s234567",
    "cfu": 6,
    "grade": 30,
    "titleCourse": "System Programming Course"
  },
  {
    "grade": 19,
    "id": "s567890",
    "date": "2016-07-11T14:15:06.467Z",
    "titleCourse": "Data Science Course",
    "cfu": 12,
    "codCourse": "Data Science"
  },
  {
    "titleCourse": "Computer Networks Course",
    "id": "s890123",
    "codCourse": "Computer Networks",
    "grade": 29,
    "cfu": 6,
    "date": "2018-05-03T14:15:06.470Z"
  },
  {
    "titleCourse": "Information Systems Course",
    "cfu": 8,
    "date": "2018-07-03T14:15:06.472Z",
    "grade": 30,
    "id": "s901234",
    "codCourse": "Information Systems"
  },
  {
    "titleCourse": "Web App 1 Course",
    "codCourse": "Web App 1",
    "date": "2017-04-28T14:15:06.473Z",
    "grade": 29,
    "cfu": 6,
    "id": "s012345"
  },
  {
    "cfu": 12,
    "id": "s890123",
    "grade": 21,
    "date": "2018-07-31T14:15:06.470Z",
    "titleCourse": "Data Science Course",
    "codCourse": "Data Science"
  },
  {
    "date": "2023-04-06T14:15:06.471Z",
    "cfu": 12,
    "grade": 18,
    "codCourse": "Web App 1",
    "titleCourse": "Web App 1 Course",
    "id": "s890123"
  },
  {
    "titleCourse": "Software Engineering 1 Course",
    "grade": 26,
    "date": "2022-05-27T14:15:06.473Z",
    "id": "s012345",
    "codCourse": "Software Engineering 1",
    "cfu": 10
  },
  {
    "date": "2018-02-23T15:15:06.470Z",
    "id": "s789012",
    "codCourse": "Web App 1",
    "cfu": 6,
    "titleCourse": "Web App 1 Course",
    "grade": 19
  },
  {
    "titleCourse": "Computer Networks Course",
    "grade": 29,
    "cfu": 10,
    "date": "2020-09-05T14:15:06.470Z",
    "id": "s789012",
    "codCourse": "Computer Networks"
  },
  {
    "grade": 21,
    "codCourse": "Computer Networks",
    "cfu": 8,
    "titleCourse": "Computer Networks Course",
    "date": "2018-02-28T15:15:06.468Z",
    "id": "s567890"
  },
  {
    "codCourse": "Software Engineering 1",
    "cfu": 8,
    "titleCourse": "Software Engineering 1 Course",
    "date": "2017-10-17T14:15:06.466Z",
    "id": "s345678",
    "grade": "30L"
  },
  {
    "date": "2017-12-16T15:15:06.470Z",
    "titleCourse": "Formal Languages Course",
    "id": "s789012",
    "cfu": 12,
    "grade": 22,
    "codCourse": "Formal Languages"
  },
  {
    "date": "2018-06-25T14:15:06.466Z",
    "id": "s345678",
    "cfu": 6,
    "grade": 30,
    "codCourse": "Information Systems",
    "titleCourse": "Information Systems Course"
  },
  {
    "id": "s234567",
    "codCourse": "Formal Languages",
    "date": "2015-03-23T15:15:06.466Z",
    "cfu": 6,
    "grade": 24,
    "titleCourse": "Formal Languages Course"
  },
  {
    "titleCourse": "Software Engineering 1 Course",
    "grade": 20,
    "cfu": 10,
    "codCourse": "Software Engineering 1",
    "date": "2017-02-18T15:15:06.467Z",
    "id": "s456789"
  },
  {
    "date": "2020-10-22T14:15:06.471Z",
    "id": "s890123",
    "grade": "30L",
    "titleCourse": "Formal Languages Course",
    "codCourse": "Formal Languages",
    "cfu": 6
  },
  {
    "id": "s678901",
    "date": "2016-01-20T15:15:06.469Z",
    "codCourse": "Information Systems",
    "cfu": 8,
    "grade": 19,
    "titleCourse": "Information Systems Course"
  },
  {
    "cfu": 12,
    "grade": "30L",
    "id": "s456789",
    "titleCourse": "Web App 1 Course",
    "date": "2021-11-04T15:15:06.466Z",
    "codCourse": "Web App 1"
  },
  {
    "grade": 26,
    "titleCourse": "Computer Networks Course",
    "id": "s678901",
    "codCourse": "Computer Networks",
    "cfu": 12,
    "date": "2017-09-01T14:15:06.469Z"
  },
  {
    "cfu": 10,
    "grade": 23,
    "id": "s123456",
    "date": "2017-05-06T14:15:06.465Z",
    "titleCourse": "Formal Languages Course",
    "codCourse": "Formal Languages"
  },
  {
    "id": "s234567",
    "titleCourse": "Software Engineering 1 Course",
    "date": "2020-01-24T15:15:06.465Z",
    "grade": 25,
    "cfu": 10,
    "codCourse": "Software Engineering 1"
  },
  {
    "titleCourse": "Data Science Course",
    "codCourse": "Data Science",
    "grade": 18,
    "cfu": 12,
    "id": "s789012",
    "date": "2015-11-08T15:15:06.469Z"
  },
  {
    "id": "s456789",
    "date": "2020-09-06T14:15:06.467Z",
    "grade": 27,
    "titleCourse": "System Programming Course",
    "codCourse": "System Programming",
    "cfu": 8
  },
  {
    "id": "s789012",
    "codCourse": "Software Engineering 1",
    "grade": 30,
    "cfu": 6,
    "titleCourse": "Software Engineering 1 Course",
    "date": "2018-06-09T14:15:06.470Z"
  },
  {
    "grade": 29,
    "date": "2020-06-26T14:15:06.472Z",
    "id": "s901234",
    "cfu": 8,
    "codCourse": "Architecture",
    "titleCourse": "Architecture Course"
  },
  {
    "titleCourse": "Web App 1 Course",
    "grade": 20,
    "id": "s234567",
    "cfu": 8,
    "date": "2020-11-29T15:15:06.465Z",
    "codCourse": "Web App 1"
  },
  {
    "grade": 22,
    "titleCourse": "Architecture Course",
    "codCourse": "Architecture",
    "date": "2021-01-10T15:15:06.468Z",
    "cfu": 10,
    "id": "s567890"
  },
  {
    "titleCourse": "Architecture Course",
    "codCourse": "Architecture",
    "id": "s678901",
    "cfu": 10,
    "date": "2016-07-08T14:15:06.469Z",
    "grade": 22
  },
  {
    "titleCourse": "Architecture Course",
    "id": "s123456",
    "date": "2016-11-24T15:15:06.464Z",
    "cfu": 8,
    "grade": 25,
    "codCourse": "Architecture"
  },
  {
    "titleCourse": "Formal Languages Course",
    "codCourse": "Formal Languages",
    "date": "2017-05-23T14:15:06.469Z",
    "grade": 30,
    "id": "s567890",
    "cfu": 12
  },
  {
    "id": "s012345",
    "codCourse": "System Programming",
    "cfu": 8,
    "date": "2018-03-20T15:15:06.473Z",
    "grade": 21,
    "titleCourse": "System Programming Course"
  },
  {
    "date": "2015-03-05T15:15:06.472Z",
    "codCourse": "Web App 1",
    "id": "s901234",
    "cfu": 8,
    "grade": 23,
    "titleCourse": "Web App 1 Course"
  },
  {
    "titleCourse": "Information Systems Course",
    "id": "s789012",
    "grade": 25,
    "cfu": 6,
    "codCourse": "Information Systems",
    "date": "2015-10-30T15:15:06.470Z"
  },
  {
    "date": "2023-11-26T15:15:06.466Z",
    "cfu": 10,
    "codCourse": "Computer Networks",
    "grade": 21,
    "titleCourse": "Computer Networks Course",
    "id": "s345678"
  },
  {
    "titleCourse": "Computer Networks Course",
    "codCourse": "Computer Networks",
    "grade": 29,
    "id": "s456789",
    "date": "2017-02-23T15:15:06.466Z",
    "cfu": 6
  },
  {
    "id": "s345678",
    "codCourse": "System Programming",
    "titleCourse": "System Programming Course",
    "cfu": 8,
    "grade": 30,
    "date": "2018-02-22T15:15:06.466Z"
  },
  {
    "date": "2023-08-03T14:15:06.466Z",
    "titleCourse": "Data Science Course",
    "codCourse": "Data Science",
    "grade": 21,
    "id": "s345678",
    "cfu": 12
  },
  {
    "date": "2023-09-18T14:15:06.464Z",
    "cfu": 6,
    "codCourse": "Information Systems",
    "titleCourse": "Information Systems Course",
    "grade": 23,
    "id": "s123456"
  },
  {
    "grade": 25,
    "date": "2023-09-26T14:15:06.472Z",
    "id": "s901234",
    "titleCourse": "Data Science Course",
    "cfu": 8,
    "codCourse": "Data Science"
  },
  {
    "grade": 30,
    "cfu": 8,
    "codCourse": "Architecture",
    "titleCourse": "Architecture Course",
    "id": "s890123",
    "date": "2022-07-20T14:15:06.470Z"
  },
  {
    "grade": 21,
    "id": "s456789",
    "titleCourse": "Formal Languages Course",
    "codCourse": "Formal Languages",
    "date": "2021-02-06T15:15:06.467Z",
    "cfu": 6
  },
  {
    "cfu": 8,
    "titleCourse": "Architecture Course",
    "grade": 25,
    "codCourse": "Architecture",
    "date": "2017-03-21T15:15:06.470Z",
    "id": "s789012"
  },
  {
    "date": "2019-05-31T14:15:06.470Z",
    "id": "s789012",
    "grade": 23,
    "titleCourse": "System Programming Course",
    "codCourse": "System Programming",
    "cfu": 12
  },
  {
    "cfu": 8,
    "codCourse": "Data Science",
    "id": "s678901",
    "date": "2022-04-08T14:15:06.469Z",
    "grade": "30L",
    "titleCourse": "Data Science Course"
  },
  {
    "date": "2023-02-24T15:15:06.469Z",
    "grade": 21,
    "titleCourse": "Software Engineering 1 Course",
    "id": "s567890",
    "codCourse": "Software Engineering 1",
    "cfu": 8
  },
  {
    "cfu": 12,
    "date": "2015-12-11T15:15:06.465Z",
    "titleCourse": "Architecture Course",
    "grade": 19,
    "id": "s234567",
    "codCourse": "Architecture"
  },
  {
    "date": "2015-07-26T14:15:06.465Z",
    "titleCourse": "Web App 1 Course",
    "codCourse": "Web App 1",
    "cfu": 6,
    "grade": 21,
    "id": "s123456"
  },
  {
    "codCourse": "Data Science",
    "date": "2022-11-18T15:15:06.466Z",
    "grade": 20,
    "titleCourse": "Data Science Course",
    "id": "s456789",
    "cfu": 6
  },
  {
    "codCourse": "Data Science",
    "date": "2021-04-10T14:15:06.465Z",
    "grade": 28,
    "titleCourse": "Data Science Course",
    "cfu": 10,
    "id": "s234567"
  },
  {
    "cfu": 12,
    "codCourse": "Computer Networks",
    "date": "2015-11-30T15:15:06.464Z",
    "titleCourse": "Computer Networks Course",
    "grade": "30L",
    "id": "s123456"
  },
  {
    "codCourse": "Computer Networks",
    "grade": 29,
    "id": "s901234",
    "date": "2018-12-18T15:15:06.472Z",
    "titleCourse": "Computer Networks Course",
    "cfu": 6
  },
  {
    "titleCourse": "Web App 1 Course",
    "grade": 19,
    "date": "2021-07-15T14:15:06.469Z",
    "id": "s567890",
    "cfu": 8,
    "codCourse": "Web App 1"
  },
  {
    "titleCourse": "System Programming Course",
    "codCourse": "System Programming",
    "cfu": 12,
    "date": "2023-09-04T14:15:06.465Z",
    "grade": 19,
    "id": "s123456"
  },
  {
    "titleCourse": "Computer Networks Course",
    "grade": "30L",
    "id": "s012345",
    "codCourse": "Computer Networks",
    "cfu": 12,
    "date": "2018-04-01T14:15:06.473Z"
  },
  {
    "date": "2018-12-25T15:15:06.473Z",
    "id": "s012345",
    "grade": 29,
    "codCourse": "Architecture",
    "cfu": 6,
    "titleCourse": "Architecture Course"
  },
  {
    "titleCourse": "System Programming Course",
    "cfu": 12,
    "grade": 26,
    "id": "s890123",
    "codCourse": "System Programming",
    "date": "2016-02-07T15:15:06.472Z"
  },
  {
    "id": "s901234",
    "titleCourse": "Formal Languages Course",
    "codCourse": "Formal Languages",
    "grade": 21,
    "date": "2017-05-13T14:15:06.472Z",
    "cfu": 10
  },
  {
    "grade": 24,
    "codCourse": "Architecture",
    "cfu": 12,
    "date": "2017-03-07T15:15:06.466Z",
    "id": "s456789",
    "titleCourse": "Architecture Course"
  },
  {
    "titleCourse": "Formal Languages Course",
    "codCourse": "Formal Languages",
    "date": "2020-11-28T15:15:06.466Z",
    "grade": 20,
    "id": "s345678",
    "cfu": 8
  },
  {
    "id": "s012345",
    "codCourse": "Formal Languages",
    "grade": 18,
    "date": "2023-08-10T14:15:06.473Z",
    "titleCourse": "Formal Languages Course",
    "cfu": 12
  }
]

export default careers;