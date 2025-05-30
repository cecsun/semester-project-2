import { LOGIN_API_URL } from "/js/api/constants.mjs";
import { addToLocalStorage } from "/js/utils/local-storage.mjs";
import { fetcher } from "../../fetcher.js";
import { validateEmail, validatePassword } from "/js/utils/form-validation.mjs";

const form = document.querySelector('#login-form');
const email = document.querySelector('#form-email');
const password = document.querySelector('#form-password');

// Create and insert inline error elements
const emailError = document.createElement('small');
emailError.className = "text-danger d-block mt-1";
email.insertAdjacentElement('afterend', emailError);

const passwordError = document.createElement('small');
passwordError.className = "text-danger d-block mt-1";
password.insertAdjacentElement('afterend', passwordError);

// Clear all error messages
function clearErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
}

async function loginUser(user) {
    try {
        const postBody = JSON.stringify(user);
        const userLoginData = await fetcher(LOGIN_API_URL, {
            method: 'POST',
            body: postBody,
        });

        if (userLoginData.errors) {
            // Generic error shown at top of form, if needed
            const formError = document.querySelector('#form-error');
            if (formError) {
                formError.textContent = userLoginData.errors[0].message;
            }
            return;
        }

        const { accessToken, name, credits } = userLoginData;
        addToLocalStorage('accessToken', accessToken);
        addToLocalStorage('name', name);
        addToLocalStorage('credits', credits);

        window.location.href = '/listings/index.html';
    } catch (error) {
        const formError = document.querySelector('#form-error');
        if (formError) {
            formError.textContent = "Login request failed, please try again.";
        }
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearErrors(); // reset old messages
    const userLoginDetails = {
        email: email.value.trim(),
        password: password.value,
    };

    if (!validateLoginForm(userLoginDetails)) {
        return;
    }

    await loginUser(userLoginDetails);
});

function validateLoginForm(user) {
    let valid = true;

    if (!validateEmail(user.email)) {
        emailError.textContent = "Must be a @stud.noroff.no or @noroff.no email.";
        valid = false;
    }

    if (!validatePassword(user.password)) {
        passwordError.textContent = "Password must be at least 8 characters.";
        valid = false;
    }

    return valid;
}
