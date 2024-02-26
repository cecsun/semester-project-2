import { fetcher } from "../../fetcher.js";

const submitNewListing = document.querySelector('#submit-new-listing');

async function createListing() {
    const BASE_API_URL = 'https://api.noroff.dev/api/v1';
    const LISTINGS_API_URL = `${BASE_API_URL}/auction/listings`;
    const media = document.forms["new-listing-form"]["inputMedia"].value;
    const listing = {
        title: document.forms["new-listing-form"]["inputTitle"].value,
        body: document.forms["new-listing-form"]["inputDescription"].value,
        media: media ? [media] : [],
        endsAt: document.forms["new-listing-form"]["inputEndsAt"].value,
    }

    const response = await fetcher(
        LISTINGS_API_URL, 
        { method: 'POST', body: JSON.stringify(listing) }, 
        true,
    );

    if (response.errors) {
        alert(response.errors[0].message);
        return;
    }
    return response;
}

function main() {
    const submitNewListingForm = document.getElementById('new-listing-form');
    if (!localStorage.getItem('accessToken')) {
        submitNewListingForm.innerHTML = "User must be logged in to create a listing. Please log in.";
        return;
    }
    submitNewListing.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await createListing();
        // console.log(response);
    });
}

main();