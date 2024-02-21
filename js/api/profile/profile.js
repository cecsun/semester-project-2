import { PROFILE_API_URL } from '../constants.mjs';
import { fetcher } from '/js/fetcher.js';

const credits = document.getElementById("total-credits");
const avatar = document.getElementById("avatar-image");
async function main() {
    const name = localStorage.getItem('name');
    const profile = await fetcher(`${PROFILE_API_URL}/${name}`, { method: "GET" }, true);
    console.log(profile);
    credits.innerHTML = profile.credits;
    avatar.src = profile.avatar ? profile.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

}

main();