import { getListings } from "/js/api/listings/storage.mjs";
import { displayListings } from "/js/api/listings/listings.js";


const viewListings = document.getElementById('display-listings');

const searchFormSubmit = document.getElementById('search-submit');
searchFormSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    const search = document.forms['search-form']['search'].value;
    viewListings.innerHTML = '';
    let listings = getListings();
    // console.log(listings)
    let isLoggedin = localStorage.getItem('accessToken') !== null;
    let filterListingsHandler = (listing) => listing.title.toLowerCase().startsWith(search.toLowerCase().trim());
    displayListings(listings, filterListingsHandler, isLoggedin);
})
