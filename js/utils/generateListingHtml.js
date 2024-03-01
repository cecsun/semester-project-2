import { LISTINGS_API_URL } from "../api/constants.mjs";
import { fetcher } from "../fetcher.js";
import { validateBid } from "./form-validation.mjs";
import { addToLocalStorage, getFromLocalStorage } from "./local-storage.mjs";

export function generateListingHtml(listing, isAuthorized = false) {
    const {
        title, body, media
    } = listing;
    const listingWrapper = document.createElement('div');
    listingWrapper.classList.add('listing-wrapper');

    const listingContainer = document.createElement('div');
    listingContainer.classList.add('listing-container');

    const listingTitle = document.createElement('h2');
    listingTitle.textContent = title;

    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    if (media.length > 0) {
        image.src = media[0];
    } else {
        image.src = 'https://via.placeholder.com/150';
    }
    image.alt = title;
    image.classList.add('listing-image');

    const bodyElement = document.createElement('p');
    bodyElement.textContent = body;

    const bidButton = document.createElement('button');
    bidButton.textContent = 'Bid';

    const bidSection = document.createElement('div');
    bidSection.classList.add('bid-section');
    bidSection.appendChild(bidButton);

    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Enter bid';
    input.classList.add('bid-input');
    bidSection.appendChild(input);

    const bids = listing.bids;
    let highestBid = 0;

    if (bids.length > 0) {
        highestBid = Math.max(...bids.map(bid => bid.amount));
    }
    const highestBidElement = document.createElement('p');
    highestBidElement.textContent = `Current bid: ${highestBid}`;
    highestBidElement.classList.add('highest-bid');
    bidSection.appendChild(highestBidElement);

    const endOfBid = document.createElement('p');
    endOfBid.textContent = `Ends at: ${new Date(listing.endsAt).toLocaleString()}`;
    endOfBid.classList.add('end-of-bid');
    bidSection.appendChild(endOfBid);

    bidButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const bid = input.value;
        if (bid < 0) {
            return;
        }

        if (!validateBid(bid)) {
            alert('Invalid bid amount');
            return;
        }
        const available_credits = getFromLocalStorage('credits');

        if (parseInt(available_credits) < bid) {
            alert('Insufficient credits, available credits: ' + available_credits);
            return;
        }

        const success = await placeBid(listing.id, bid);
        if (success) {
            highestBidElement.textContent = `Current bid: ${bid}`;
        }
     
    });


    imageContainer.appendChild(image);
    listingContainer.append(listingTitle, imageContainer, bodyElement);
    if (isAuthorized === true) {
        listingContainer.appendChild(bidSection);
    }
    listingWrapper.appendChild(listingContainer);
    return listingWrapper;
}

async function placeBid(id, bid) {
    const body = {
        amount: parseInt(bid),
    }
    const response = await fetcher(
        `${LISTINGS_API_URL}/${id}/bids`, 
        { method: 'POST', body: JSON.stringify(body) }, 
        true,
    );
    if (response.errors) {
        alert(response.errors[0].message);
        return false;
    }
    const credits = getFromLocalStorage('credits');
    const newCredits = credits - bid;
    addToLocalStorage('credits', newCredits);
    alert('Bid placed successfully');
    return true;
}