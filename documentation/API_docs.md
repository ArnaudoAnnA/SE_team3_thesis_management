# Documentation
This file is just a general schema for APIs in the following format:
- Story name
  - function name
  - input parameters
  - output

----
- Insert proposal
  - function name: 'insert_proposals'
  - input parameters: 
    - supervisorId
    - co-supervisorsId (list)
    - keywords (list)
    - type
    - groups
    - description
    - required knoledge (list or string)
    - note
    - expiration
    - level
    - CdS Corso di Studio (id) 
  - output: documento creato (id)

- search proposals
  - function name: 'get_proposals'
  - input parameters:
    - supervisorId
    - co-supervisorsId (list)
    - keywords (list)
    - type
    - groups
    - required knoledge (list or string)
    - expiration
    - level
    - CdS Corso di Studio (id)
  - output: list of matching docs 

- Apply for proposal:
  - function name: 'apply_to_proposal'
  - input parameters:
    - studentId
    - proposalId
    - application date
  - output: true or false/null

- Browse application:
  - function name: 'get_all_applications'
  - input parameters:
    - professorId/supervisorId
  - output: list of docs

- Accept application
  - function name: 'accept_application'
  - input parameters
    - applicationId
  - output: true or false

- 