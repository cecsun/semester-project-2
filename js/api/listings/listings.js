import { generateListingHtml } from "../../utils/generateListingHtml.js";

const displayListingsNode = document.querySelector('#display-listings');

function sortCallback(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    } 
    return 0;
  }

export async function displayListings(listings, filterCallback, isAuthorized = false) {
    displayListingsNode.textContent = '';
    listings
    .filter(filterCallback)
    .sort(sortCallback)
    .forEach((listing) => {
        const currentListing = generateListingHtml(listing, isAuthorized);
        displayListingsNode.appendChild(currentListing);
    })
}
