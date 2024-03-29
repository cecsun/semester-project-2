import { LOGIN_API_URL } from "/js/api/constants.mjs";
import { addToLocalStorage } from "/js/utils/local-storage.mjs";

import { fetcher } from "../../fetcher.js";
import { validateEmail, validatePassword } from "/js/utils/form-validation.mjs";

const form = document.querySelector('#login-form');
const email = document.querySelector('#form-email');
const password = document.querySelector('#form-password');

async function loginUser(user) {
    try {
        const postBody = JSON.stringify(user);
        const userLoginData = await fetcher(LOGIN_API_URL, {
            method: 'POST',
            body: postBody,
        });
        console.log(userLoginData);
        if (userLoginData.errors) {
            alert(userLoginData.errors[0].message);
            return;
        }
        const token = userLoginData.accessToken;
        const name = userLoginData.name;
        const credits = userLoginData.credits;
        addToLocalStorage('accessToken', token);
        addToLocalStorage('name', name);
        addToLocalStorage('credits', credits);
        window.location.href = '/listings/index.html';
    } catch (error) {
        alert('Login request failed, please try again.');
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userLoginDetails = {
        email: email.value,
        password: password.value,
    };


    if (!validateLoginForm(userLoginDetails)) {
        return;
    }
    await loginUser(userLoginDetails);
});

function validateLoginForm(user) {
    if (!validateEmail(user.email)) {
        alert('Email must be of type @stud.noroff.no or @noroff.no');
        return false;
    }

    if (!validatePassword(user.password)) {
        alert("Password must be at least 8 characters");
        return false;
    }
    return true;
}