import { PROFILE_API_URL } from '../constants.mjs';
import { fetcher } from '/js/fetcher.js';

const credits = document.getElementById("total-credits");
const avatar = document.getElementById("avatar-image");
async function main() {
    // Redirect to login if not logged in
    if (!localStorage.getItem('accessToken')) {
        window.location.href = "/login";
    }
    const name = localStorage.getItem('name');

    const username = document.getElementById("username");
    username.innerHTML = name;

    const profile = await fetcher(`${PROFILE_API_URL}/${name}`, { method: "GET" }, true);
    console.log(profile);
    credits.innerHTML = profile.credits;
    avatar.src = profile.avatar ? profile.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

}

const updateAvatar = document.getElementById("submit-update-avatar");
updateAvatar.addEventListener('click', async (event) => {
    event.preventDefault();
    const newAvatar = document.getElementById("update-media").value;
    const name = localStorage.getItem('name');
    const response = await fetcher(
        `${PROFILE_API_URL}/${name}/media`,
        { 
            method: "PUT",
            body: JSON.stringify({ avatar: newAvatar })
        },
        true);
    console.log(response);
    if (response.errors) {
        alert(response.errors[0].message);
        return;
    }
    window.location.href = "/profile";
});

main();