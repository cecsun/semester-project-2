import { REGISTER_API_URL } from "/js/api/constants.mjs";
import { fetcher } from "/js/fetcher.js";
import { validateEmail, validatePassword } from "/js/utils/form-validation.mjs";

const form = document.querySelector('#register-form');

// Create or get the inline error container
let errorDisplay = document.getElementById("register-error");
if (!errorDisplay) {
  errorDisplay = document.createElement("p");
  errorDisplay.id = "register-error";
  errorDisplay.className = "text-danger text-center mt-3";
  form.prepend(errorDisplay);
}

async function registerUser(user) {
    const postBody = JSON.stringify(user);
    const userRegisterData = await fetcher(REGISTER_API_URL, {
        method: 'POST',
        body: postBody,
    });
    if (userRegisterData.errors) {
        errorDisplay.textContent = userRegisterData.errors[0].message;
        return false;
    }
    errorDisplay.textContent = ""; // Clear errors if any success
    return true;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorDisplay.textContent = ""; // Clear previous errors

    const user = {
        name: form["form-name"].value,
        email: form["form-email"].value,
        password: form["form-password"].value,
        avatar: form["form-avatar"].value,
    };

    if (!validateRegisterForm(user)) {
        return;
    }
    if (!await registerUser(user)) {
        return;
    }
    window.location.href = '/';
});


function validateRegisterForm(user) {
    if (user.name.length <= 5) {
        errorDisplay.textContent = "Username must be more than 5 characters";
        return false;
    }
  
    if (user.name.includes(" ")) {
        errorDisplay.textContent = "Username cannot contain spaces";
        return false;
    }

    if (!validateEmail(user.email)) {
        errorDisplay.textContent = 'Email must be of type @stud.noroff.no or @noroff.no';
        return false; 
    }
  
    if (!validatePassword(user.password)) {
        errorDisplay.textContent = "Password must be at least 8 characters";
        return false;
    }

    errorDisplay.textContent = ""; // Clear any error
    return true;
}
