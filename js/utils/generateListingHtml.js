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
    if (media) {
        image.src = media;
    } else {
        image.src = 'https://via.placeholder.com/150';
    }
    image.alt = title;
    image.classList.add('listing-image');

    const bodyElement = document.createElement('p');
    bodyElement.textContent = body;

    const bidButton = document.createElement('button');
    bidButton.textContent = 'Bid';
    bidButton.addEventListener('click', () => {
        window.location.href = `/listings/?id=${listing.id}`;
    });

    imageContainer.appendChild(image);
    listingContainer.append(listingTitle, imageContainer, bodyElement);
    if (isAuthorized === true) {
        listingContainer.appendChild(bidButton);
    }
    listingWrapper.appendChild(listingContainer);
    return listingWrapper;
}
