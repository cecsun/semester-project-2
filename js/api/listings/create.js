import { fetcher } from "/js/fetcher.js";

const submitNewListing = document.querySelector('#submit-new-listing');

async function createListing() {
    const BASE_API_URL = 'https://api.noroff.dev/api/v1';
    const LISTINGS_API_URL = `${BASE_API_URL}/auction/listings`;
    const listing = {
        title: document.forms["new-listing-form"]["inputTitle"].value,
        body: document.forms["new-listing-form"]["inputDescription"].value,
        media: document.forms["new-listing-form"]["inputMedia"].value,
        endsAt: document.forms["new-listing-form"]["inputEndsAt"].value,
    }
    console.log(listing.endsAt);
    const response = await fetcher(
        LISTINGS_API_URL, 
        { method: 'POST', body: JSON.stringify(listing) }, 
    );
    return response;
}

submitNewListing.addEventListener('click', async (event) => {
    event.preventDefault();
    const response = await createListing();
    console.log(response);
    // location.reload();
});
