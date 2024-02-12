import { logout } from "../../utils/local-storage.js";

const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
});