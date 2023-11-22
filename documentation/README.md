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
| d345678@studenti.polito.it | d345678 | professor |
| s901234@studenti.polito.it | s901234 | student |

## Docker
The project can be run in a docker container. To do so, firs make sure the docker daemon is running, then run the following commands in the client folder:

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