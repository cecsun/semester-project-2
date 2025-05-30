import { PROFILE_API_URL } from '../constants.mjs';
import { fetcher } from '/js/fetcher.js';

const credits = document.getElementById("total-credits");
const avatar = document.getElementById("avatar-image");

async function main() {
    if (!localStorage.getItem('accessToken')) {
        window.location.href = "/index.html";
    }
    const name = localStorage.getItem('name');

    const username = document.getElementById("username");
    username.innerHTML = name;

    const profile = await fetcher(`${PROFILE_API_URL}/${name}`, { method: "GET" }, true);
    credits.innerHTML = profile.credits;
    avatar.src = profile.avatar ? profile.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
}

const updateAvatar = document.getElementById("submit-update-avatar");

// Create or get inline error container for avatar update errors
let avatarError = document.getElementById("avatar-error");
if (!avatarError) {
    avatarError = document.createElement("p");
    avatarError.id = "avatar-error";
    avatarError.className = "text-danger my-2";
    updateAvatar.parentNode.insertBefore(avatarError, updateAvatar);
}

updateAvatar.addEventListener('click', async (event) => {
    event.preventDefault();
    avatarError.textContent = "";  // Clear previous errors

    const newAvatar = document.getElementById("update-media").value;
    const name = localStorage.getItem('name');

    const response = await fetcher(
        `${PROFILE_API_URL}/${name}/media`,
        { 
            method: "PUT",
            body: JSON.stringify({ avatar: newAvatar })
        },
        true
    );

    if (response.errors) {
        avatarError.textContent = response.errors[0].message;
        return;
    }
    window.location.href = "/profile";
});

main();
