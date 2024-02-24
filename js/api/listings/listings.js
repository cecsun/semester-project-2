import { generateListingHtml } from "../../utils/generateListingHtml.js";

const listingsContainer = document.getElementById('display-listings');

function sortCallback(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    } 
    return 0;
  }

function filterExpired(listing) {
    return new Date(listing.endsAt) > new Date();
}

export async function displayListings(listings, filterCallback, isAuthorized = false) {
    listingsContainer.innerHTML = '';
    listings
    .filter(filterCallback)
    .filter(filterExpired)
    .sort(sortCallback)
    .forEach((listing) => {
        const currentListing = generateListingHtml(listing, isAuthorized);
        listingsContainer.appendChild(currentListing);
    })
}