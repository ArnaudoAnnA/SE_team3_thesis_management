# Team 3: Thesis Management System

Project for the Software Engineering 2 exam in Politecnico di Torino.

## Database Initialization

To initialize or restart the database run the following command in the repo folder:

```bash
node ./client/src/models/_initdb.js
```

## Users credentials
List of users and credentials for simple authentication.<br>
To add other users, go in firebase -> authentication -> users -> add user

| email | password | type | 
| :--- | :--- | :--- |
| d345678@polito.it | p6bTzUftxNHG5y | professor |
| d234567@polito.it | SHbw&A!vXji56s | professor |
| professore.team3@gmail.com | ^E3rFGVjP6qr%u | professor |
| s901234@studenti.polito.it | 7eNfF7Ssxvctd7 | student |
| s123456@studenti.polito.it | %@xm6wQf2hkHXy | student |
| studente.team3@gmail.com | FYUVzFWJ0dskB | student |
| u000001@polito.it          | PJNkzwt7V!&N6B | secretary |

| email | password | type | 
| :--- | :--- | :--- |
| juanstefano.pauli@polito.it | da2Lt%cNgKCH&x | Professor 
| giulia.saracco@polito.it    | P$Sgs3Z*ggP8B^ | Professor 
| s0000001@studenti.polito.it | kbYBMKm!W*4upW  | Student Elmo Moss   
| s0000002@studenti.polito.it | MPnW3$3yjufM5X | Student Bryan Woods 
| palm.beesly@polito.it | jMHAn#TDR5oneR | Secretary Pam Beesly

### Gmail credentials 

To prevent sending emails to real accounts, the emails are received only by these two accounts

| email | password | type |
| :--- | :--- | :--- | 
| studente.team3@gmail.com | Team3Rocks! | student |
| professore.team3@gmail.com | Team3Rocks! | professor |

## Front-end mockups
Front-end mockups can be found on [Figma](https://www.figma.com/file/MeeoGtJIzVourXVYfm2Yn0/ThesisManagement?type=design&node-id=0%3A1&mode=design&t=9N2yFZs1i90W0aVH-1).

## Docker
The project can be run in a docker container. To do so, first make sure the docker daemon is running, then run the following commands in the client folder:

```bash
docker compose up --build
```
This will create a container with the client running on port 5173. To access the client, go to http://localhost:5173.
After the first run, the container can be started with the following command:

```bash
docker compose up
```
Is also possible to downlaod the image from docker hub with the following command:

```bash
docker pull pucciorenzo/se2-thesismanagement-g3
```
And run with:

```bash
docker run -p 5173:5173 --name client pucciorenzo/se2-thesismanagement-g3
```