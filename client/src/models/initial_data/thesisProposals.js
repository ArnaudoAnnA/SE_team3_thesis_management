const thesisProposals = [
  {
    "title": "Instrumenting Kubernetes 5G services with eBPF probes",
    "coSupervisors": ["david@example.com", "d567890@polito.it"],
    "description": "Description for Thesis Proposal 1",
    "programmes": "Design in Graphic Design",
    "keywords": ["keyword1", "tag1"],
    "level": "master",
    "id": 0,
    "archiveDate": "2025-08-24T14:15:06.473Z",
    "teacherId": "d123456",
    "notes": "Additional notes for Thesis Proposal 1",
    "expirationDate": "2025-09-24T14:15:06.473Z",
    "groups": ["SOFTENG", "FM"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 1",
    "type": "academic research"
  },
  {
    "coSupervisors": ["d345678@polito.it", "alice@company.com"],
    "level": "master",
    "type": "academic research",
    "archiveDate": "2022-06-28T14:15:06.474Z",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 2",
    "notes": "Additional notes for Thesis Proposal 2",
    "keywords": ["keyword2", "tag2"],
    "expirationDate": "2022-06-28T14:15:06.474Z",
    "teacherId": "d123456",
    "description": "Description for Thesis Proposal 2",
    "programmes": "Engineering in Civil Engineering",
    "title": "Sviluppo e containerizzazione di microservizi di monitoraggio e analisi dei consumi energetici su cluster Kubernetes",
    "id": 1,
    "groups": ["SOFTENG", "METENG"]
  },
  {
    "keywords": ["keyword1", "tag1"],
    "description": "Description for Thesis Proposal 1",
    "coSupervisors": ["laura@polito.it", "d123456@polito.it"],
    "level": "bachelor",
    "groups": ["FM", "SOFTENG"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 1",
    "teacherId": "d234567",
    "title": "Endless scalability of CPU-hungry applications across multiple federated clusters (Liqo/Aruba)",
    "type": "academic research",
    "programmes": "Engineering in Electrical Engineering",
    "notes": "Additional notes for Thesis Proposal 1",
    "expirationDate": "2024-08-04T14:15:06.474Z",
    "archiveDate": "2024-02-04T15:15:06.474Z",
    "id": 2
  },
  {
    "type": "stage",
    "keywords": ["keyword2", "tag2"],
    "id": 3,
    "coSupervisors": ["marco@company.com", "alice@example.com"],
    "level": "bachelor",
    "description": "Description for Thesis Proposal 2",
    "groups": ["FM"],
    "expirationDate": "2024-01-28T15:15:06.474Z",
    "notes": "Additional notes for Thesis Proposal 2",
    "teacherId": "d234567",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 2",
    "title": "Formal Verification of Safety-Critical Software Systems Using Model Checking Techniques",
    "programmes": "Architecture",
    "archiveDate": "2023-08-28T14:15:06.474Z"
  },
  {
    "level": "master",
    "groups": ["METENG", "FM"],
    "id": 4,
    "description": "Description for Thesis Proposal 1",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 1",
    "coSupervisors": ["d567890@polito.it", "laura@example.com"],
    "keywords": ["keyword1", "tag1"],
    "teacherId": "d345678",
    "type": "stage",
    "notes": "Additional notes for Thesis Proposal 1",
    "title": "Automatic and Optimal Configuration of Secure Communications in Virtualized Networks",
    "archiveDate": "2019-12-05T15:15:06.474Z",
    "programmes": "Design in Graphic Design",
    "expirationDate": "2020-06-05T14:15:06.474Z"
  },
  {
    "description": "Description for Thesis Proposal 2",
    "programmes": "Engineering in Civil Engineering",
    "expirationDate": "2025-09-28T14:15:06.474Z",
    "coSupervisors": ["d234567@polito.it", "david@company.com"],
    "notes": "Additional notes for Thesis Proposal 2",
    "keywords": ["keyword2", "tag2"],
    "title": "Utilizing Machine Learning Techniques for Predictive Maintenance of Metallurgical Equipment",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 2",
    "level": "master",
    "archiveDate": "2025-06-28T14:15:06.474Z",
    "id": 5,
    "teacherId": "d345678",
    "groups": ["METENG", "FM"],
    "type": "academic research"
  },
  {
    "teacherId": "d456789",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 1",
    "description": "Description for Thesis Proposal 1",
    "groups": ["SOFTENG"],
    "archiveDate": "2025-04-19T14:15:06.474Z",
    "expirationDate": "2025-07-19T14:15:06.474Z",
    "keywords": ["keyword1", "tag1"],
    "level": "bachelor",
    "coSupervisors": ["d123456@polito.it", "marco@polito.it"],
    "id": 6,
    "title": "Enhancing Software Quality Through Automated Testing and Continuous Integration",
    "notes": "Additional notes for Thesis Proposal 1",
    "programmes": "Engineering in Electrical Engineering",
    "type": "academic research"
  },
  {
    "description": "Description for Thesis Proposal 2",
    "programmes": "Architecture",
    "teacherId": "d456789",
    "title": "Definizione dell’infrastruttura di comunicazione e computing per l’operatività di droni/rover su Marte (POLITO/PIC4SER)",
    "archiveDate": "2022-10-29T14:15:06.474Z",
    "groups": ["SOFTENG", "METENG"],
    "id": 7,
    "type": "academic research",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 2",
    "keywords": ["keyword2", "tag2"],
    "notes": "Additional notes for Thesis Proposal 2",
    "level": "bachelor",
    "expirationDate": "2022-11-29T15:15:06.474Z",
    "coSupervisors": ["d345678@polito.it", "laura@polito.it"]
  },
  {
    "type": "academic research",
    "title": "Evaluation of Sustainable Construction Materials for Eco-Friendly Building Design",
    "expirationDate": "2022-11-26T15:15:06.474Z",
    "id": 8,
    "teacherId": "d567890",
    "archiveDate": "2022-07-26T14:15:06.474Z",
    "coSupervisors": [
      "d234567@polito.it",
      "d345678@polito.it"
    ],
    "level": "bachelor",
    "keywords": ["keyword1", "tag1"],
    "description": "Description for Thesis Proposal 1",
    "programmes": "Engineering in Electrical Engineering",
    "groups": ["FM", "METENG"],
    "notes": "Additional notes for Thesis Proposal 1",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 1"
  },
  {
    "expirationDate": "2025-10-08T14:15:06.475Z",
    "keywords": ["keyword2", "tag2"],
    "level": "bachelor",
    "description": "Description for Thesis Proposal 2",
    "archiveDate": "2025-09-08T14:15:06.475Z",
    "id": 9,
    "groups": ["FM", "SOFTENG"],
    "type": "stage",
    "notes": "Additional notes for Thesis Proposal 2",
    "requiredKnowledge": "Required knowledge for Thesis Proposal 2",
    "programmes": "Engineering in Electrical Engineering",
    "title": "Formal Methods for Software Specification and Verification: Ensuring System Correctness and Reliability",
    "teacherId": "d567890",
    "coSupervisors": [
      "d123456@polito.it",
      "d123456@polito.it"
    ]
  },
  {
    "title": "Reply: Investigation of AI-Powered Robotics for Automated Manufacturing Processes",
    "groups": ["METENG"],
    "requiredKnowledge": "Web App1",
    "id": 25,
    "keywords": ["Reply"],
    "expirationDate": "2024-05-20T07:17:35.131Z",
    "coSupervisors": ["s123456@polito.it"],
    "notes": "",
    "description": "Tesi in azienda",
    "type": "Stage",
    "archiveDate": "2024-05-20T07:17:35.131Z",
    "programmes": "Architecture",
    "teacherId": "d345678",
    "level": "bachelor"
  },
  {
    "keywords": ["keyword2", "tag2"],
    "description": "Description for Thesis Proposal 2",
    "coSupervisors": ["marco@company.com", "alice@example.com"],
    "level": "bachelor",
    "groups": ["FM"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 2",
    "teacherId": "d567890",
    "title": "Optimizing Deep Learning Models for Edge Devices",
    "type": "academic research",
    "programmes": "Engineering in Electrical Engineering",
    "notes": "Additional notes for Thesis Proposal 2",
    "expirationDate": "2024-09-15T12:30:00.000Z",
    "archiveDate": "2024-03-15T12:30:00.000Z",
    "id": 26
  },
  {
    "keywords": ["keyword3", "tag3"],
    "description": "Description for Thesis Proposal 3",
    "coSupervisors": ["alice@example.com", "d567890@polito.it"],
    "level": "bachelor",
    "groups": ["FM", "METENG"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 3",
    "teacherId": "d345678",
    "title": "Autonomous Robot Navigation using Machine Learning",
    "type": "academic research",
    "programmes": "Engineering in Electrical Engineering",
    "notes": "Additional notes for Thesis Proposal 3",
    "expirationDate": "2024-10-20T10:45:00.000Z",
    "archiveDate": "2024-04-20T10:45:00.000Z",
    "id": 27
  },
  {
    "keywords": ["keyword4", "tag4"],
    "description": "Description for Thesis Proposal 4",
    "coSupervisors": ["marco@company.com", "d567890@polito.it"],
    "level": "bachelor",
    "groups": ["FM"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 4",
    "teacherId": "d234567",
    "title": "Enhancing Network Security with Blockchain",
    "type": "academic research",
    "programmes": "Engineering in Electrical Engineering",
    "notes": "Additional notes for Thesis Proposal 4",
    "expirationDate": "2024-11-25T15:30:00.000Z",
    "archiveDate": "2024-05-25T15:30:00.000Z",
    "id": 28
  },
  {
    "keywords": ["keyword5", "tag5"],
    "description": "Description for Thesis Proposal 5",
    "coSupervisors": ["d234567@polito.it", "laura@polito.it"],
    "level": "bachelor",
    "groups": ["FM", "SOFTENG"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 5",
    "teacherId": "d456789",
    "title": "Scalable Cloud Solutions for Web Applications",
    "type": "academic research",
    "programmes": "Engineering in Electrical Engineering",
    "notes": "Additional notes for Thesis Proposal 5",
    "expirationDate": "2024-12-10T09:00:00.000Z",
    "archiveDate": "2024-06-10T09:00:00.000Z",
    "id": 29
  },
  {
    "keywords": ["keyword30", "tag30"],
    "description": "Description for Thesis Proposal 30",
    "coSupervisors": ["alice@example.com", "d567890@polito.it"],
    "level": "bachelor",
    "groups": ["FM", "METENG"],
    "requiredKnowledge": "Required knowledge for Thesis Proposal 30",
    "teacherId": "d345678",
    "title": "THESIS DEMO 3",
    "type": "academic research",
    "programmes": "Engineering in Electrical Engineering",
    "notes": "Additional notes for Thesis Proposal 30",
    "expirationDate": "2024-12-10T09:00:00.000Z",
    "archiveDate": "2024-06-10T09:00:00.000Z",
    "id": 30
  }
]

export default thesisProposals;