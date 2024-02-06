import { REGISTER_API_URL } from "../constants.mjs";
import { fetcher } from "../../fetcher.js";

const form = document.querySelector('#register-form');
const name = document.querySelector('#form-name');
const email = document.querySelector('#form-email');
const password = document.querySelector('#form-password');

async function registerUser(user) {
    const postBody = JSON.stringify(user);
    const myData = await fetcher(REGISTER_API_URL, {
        method: 'POST',
        body: postBody,
    });
    console.log(myData);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    registerUser(user);
});

function validateEmail() {
    const emailInput = document.getElementById('form-email');
    const domain = ["stud.noroff.no"];
    var regex = new RegExp('^[a-zA-Z0-9._-]+@' + domain + '$');
    
    if (regex.test(emailInput)) {
        alert('Email is valid');
        return true;
    } else {
        alert('Email must be of type @stud.noroff.no');
        return false;
    }
}



