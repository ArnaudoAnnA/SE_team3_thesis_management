const thesisRequests = [
  {
    requestDate: "2021-05-06",
    approvalDate: "2021-05-07",
    approved: true,
    title:
      "T1",
    description: "Description for Thesis Request 1",
    programmes: "Design in Graphic Design",
    studentId: "s345678",
    teacherId: "d345678",
    notes: "Additional notes for Thesis Request 1",
    type: "academic research",
    coSupervisors: [],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "2023-12-31",
    approved: true,
    type: "academic research",
    notes: "Additional notes for Thesis Request 2",
    studentId: "s345678",
    teacherId: "d345678",
    description: "Description for Thesis Request 2",
    programmes: "Engineering in Civil Engineering",
    title:
      "T2",
    coSupervisors: ["david@example.com", "d567890@polito.it"],
  },
  {
    requestDate: "2020-11-06",
    approvalDate: "2020-11-07",
    approved: true,
    description: "Description for Thesis Request 1",
    studentId: "s123456",
    teacherId: "d345678",
    title:
      "T3",
    type: "academic research",
    programmes: "Engineering in Electrical Engineering",
    notes: "Additional notes for Thesis Request 1",
    coSupervisors: [],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "2023-12-31",
    approved: true,
    type: "stage",
    description: "Description for Thesis Request 2",
    notes: "Additional notes for Thesis Request 2",
    studentId: "s890123",
    teacherId: "d345678",
    title:
      "T4",
    programmes: "Architecture",
    coSupervisors: [],
  },
  {
    requestDate: "2021-01-06",
    approvalDate: "",
    approved: null,
    description: "Description for Thesis Request 1",
    studentId: "s345678",
    teacherId: "d345678",
    type: "stage",
    notes: "Additional notes for Thesis Request 1",
    title:
      "Automatic and Optimal Configuration of Secure Communications in Virtualized Networks",
    programmes: "Design in Graphic Design",
    coSupervisors: ["marco@company.com", "alice@example.com"],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "2023-12-31",
    approved: true,
    description: "Description for Thesis Request 2",
    programmes: "Engineering in Civil Engineering",
    notes: "Additional notes for Thesis Request 2",
    title:
      "Utilizing Machine Learning Techniques for Predictive Maintenance of Metallurgical Equipment",
    studentId: "s345678",
    teacherId: "d456789",
    type: "academic research",
    coSupervisors: ["d234567@polito.it"],
  },
  {
    requestDate: "2022-12-06",
    approvalDate: "",
    approved: null,
    studentId: "s890123",
    teacherId: "d456789",
    description: "Description for Thesis Request 1",
    title:
      "Enhancing Software Quality Through Automated Testing and Continuous Integration",
    notes: "Additional notes for Thesis Request 1",
    programmes: "Engineering in Electrical Engineering",
    type: "academic research",
    coSupervisors: [],
  },
  {
    requestDate: "2021-08-06",
    approvalDate: "",
    approved: null,
    description: "Description for Thesis Request 2",
    programmes: "Architecture",
    studentId: "s789012",
    teacherId: "d456789",
    title:
      "Definizione dell’infrastruttura di comunicazione e computing per l’operatività di droni/rover su Marte (POLITO/PIC4SER)",
    type: "academic research",
    notes: "Additional notes for Thesis Request 2",
    coSupervisors: [],
  },
  {
    requestDate: "2020-12-06",
    approvalDate: "",
    approved: null,
    type: "academic research",
    title:
      "Evaluation of Sustainable Construction Materials for Eco-Friendly Building Design",
    studentId: "s789012",
    teacherId: "d567890",
    description: "Description for Thesis Request 1",
    programmes: "Engineering in Electrical Engineering",
    notes: "Additional notes for Thesis Request 1",
    coSupervisors: [],
  },
  {
    requestDate: "2023-11-06",
    approvalDate: "",
    approved: null,
    description: "Description for Thesis Request 2",
    type: "stage",
    notes: "Additional notes for Thesis Request 2",
    programmes: "Engineering in Electrical Engineering",
    title:
      "Formal Methods for Software Specification and Verification: Ensuring System Correctness and Reliability",
    studentId: "s012345",
    teacherId: "d567890",
    coSupervisors: ["d234567@polito.it", "d345678@polito.it"],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "",
    approved: null,
    title:
      "Reply: Investigation of AI-Powered Robotics for Automated Manufacturing Processes",
    notes: "",
    description: "Tesi in azienda",
    type: "Stage",
    programmes: "Architecture",
    studentId: "s012345",
    teacherId: "d345678",
    coSupervisors: ["marco@company.com", "alice@example.com"],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "2023-12-31",
    approved: true,
    description: "Description for Thesis Request 2",
    studentId: "s567890",
    teacherId: "d567890",
    title: "Optimizing Deep Learning Models for Edge Devices",
    type: "academic research",
    programmes: "Engineering in Electrical Engineering",
    notes: "Additional notes for Thesis Request 2",
    coSupervisors: ["marco@company.com", "d567890@polito.it"],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "",
    approved: null,
    description: "Description for Thesis Request 3",
    studentId: "s567890",
    teacherId: "d345678",
    title: "Autonomous Robot Navigation using Machine Learning",
    type: "academic research",
    programmes: "Engineering in Electrical Engineering",
    notes: "Additional notes for Thesis Request 3",
    coSupervisors: ["alice@example.com", "d567890@polito.it"],
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "2023-12-31",
    approved: true,
    description: "Description for Thesis Request 4",
    studentId: "s234567",
    teacherId: "d234567",
    title: "Enhancing Network Security with Blockchain",
    type: "academic research",
    programmes: "Engineering in Electrical Engineering",
    notes: "Additional notes for Thesis Request 4",
    coSupervisors: []
  },
  {
    requestDate: "2023-12-06",
    approvalDate: "",
    approved: null,
    description: "Description for Thesis Request 5",
    studentId: "s234567",
    teacherId: "d456789",
    title: "Scalable Cloud Solutions for Web Applications",
    type: "academic research",
    programmes: "Engineering in Electrical Engineering",
    notes: "Additional notes for Thesis Request 5",
    coSupervisors: []
  },
];

export default thesisRequests;
