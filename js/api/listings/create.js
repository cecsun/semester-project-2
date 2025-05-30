import { fetcher } from "../../fetcher.js";

const submitNewListing = document.querySelector('#submit-new-listing');

async function createListing() {
    const BASE_API_URL = 'https://api.noroff.dev/api/v1';
    const LISTINGS_API_URL = `${BASE_API_URL}/auction/listings`;
    let medias = [];
    const form = document.forms["new-listing-form"];
    const media1 = form["inputMedia1"].value;
    const media2 = form["inputMedia2"].value;
    const media3 = form["inputMedia3"].value;

    if (media1) medias.push(media1);
    if (media2) medias.push(media2);
    if (media3) medias.push(media3);

    const listing = {
        title: form["inputTitle"].value,
        body: form["inputDescription"].value,
        media: medias,
        endsAt: form["inputEndsAt"].value,
    };

    const response = await fetcher(
        LISTINGS_API_URL,
        { method: 'POST', body: JSON.stringify(listing) },
        true,
    );

    if (response.errors) {
        const errorDisplay = document.getElementById("listing-error");
        if (errorDisplay) {
            errorDisplay.textContent = response.errors[0].message;
        }
        return null;
    }

    return response;
}

function main() {
    const submitNewListingForm = document.getElementById('new-listing-form');

    // Add inline error display container
    const errorElement = document.createElement('p');
    errorElement.id = "listing-error";
    errorElement.className = "text-danger text-center mt-3";
    submitNewListingForm.prepend(errorElement);

    if (!localStorage.getItem('accessToken')) {
        submitNewListingForm.innerHTML = "<p class='text-white text-center'>User must be logged in to create a listing. Please login.</p>";
        return;
    }

    submitNewListing.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await createListing();
        if (response) {
            window.location.href = '/listings';
        }
    });
}

main();
