import API from './API.js';

let filters = {
    expirationDate: {
        to: '01-01-2021',
        from: '01-01-2026'
    }
}

await API.logIn("d345678@studenti.polito.it", "d345678");

let response = await API.getThesis(filters);

//console.log(response.thesis);
console.log(response.thesis);

await API.logOut();