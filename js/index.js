import { displayListings } from "/js/api/listings/listings.js";
import { fetcher } from "/js/fetcher.js";
import { LISTINGS_API_URL } from "./api/constants.mjs";
import { setListings } from "/js/api/listings/storage.mjs";

async function main() {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    const search = document.forms['search-form']['search'].value;
    let listings = await fetcher(LISTINGS_API_URL+"?_seller=true&sort=created&_bids=true", { method: "GET" });
    setListings(listings);

    let filterListingsHandler = (listing) => listing.title.toLowerCase().startsWith(search.toLowerCase().trim());
    displayListings(listings, filterListingsHandler, isLoggedIn);
}

main();
