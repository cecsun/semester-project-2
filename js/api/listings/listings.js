import { generateListingHtml } from "../../utils/generateListingHtml.js";

const listingsContainer = document.getElementById('display-listings');

function sortNewestCallback(a, b) {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
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
    .sort(sortNewestCallback)
    .forEach((listing) => {
        const currentListing = generateListingHtml(listing, isAuthorized);
        listingsContainer.appendChild(currentListing);
    })
}