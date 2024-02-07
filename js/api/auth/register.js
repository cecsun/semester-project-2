import { REGISTER_API_URL } from "/js/api/constants.mjs";
import { fetcher } from "/js/fetcher.js";
import { validateEmail, validatePassword } from "/js/utils/form-validation.mjs";

const form = document.querySelector('#register-form');

async function registerUser(user) {
    const postBody = JSON.stringify(user);
    const userRegisterData = await fetcher(REGISTER_API_URL, {
        method: 'POST',
        body: postBody,
    });
    if (userRegisterData.errors) {
        alert(userRegisterData.errors[0].message);
        return;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
        name: document.forms["register-form"]["form-name"].value,
        email: document.forms["register-form"]["form-email"].value,
        password: document.forms["register-form"]["form-password"].value,
    };
    if (!validateRegisterForm(user)) {
        return;
    }
    registerUser(user);
});


function validateRegisterForm(user) {
    if (user.name.length <= 5) {
      alert("Username must be more than 5 characters");
      return false;
    }
  
    if (user.name.split(" ").length >= 2) {
      alert("Username cannot contain spaces ");
      return false;
    }

    if (!validateEmail(user.email)) {
        alert('Email must be of type @stud.noroff.no or @noroff.no');
        return false; 
    }
  
    if (!validatePassword(user.password)) {
        alert("Password must be at least 8 characters");
        return false;
    }
}
