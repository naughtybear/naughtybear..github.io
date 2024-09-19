const scrollContainerLeft = document.getElementById('scroll-container-left');
let scrollSpeed = 1; // Speed of the scroll
let currentOffsetLeft = 0; // Track the current offset for left scroll
let cardWidth = 250 + 20; // 250px width + 20px margin (adjust for padding and borders too if necessary)

// Function to create a new card dynamically with image, title, and description
function createNewCard(imageSrc, title, description) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title + " Icon";
    newCard.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = title;
    newCard.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = description;
    newCard.appendChild(p);

    return newCard;
}

// Move the container to the left
function scrollLeft() {
    currentOffsetLeft -= scrollSpeed;
    scrollContainerLeft.style.transform = `translateX(${currentOffsetLeft}px)`;

    const firstCard = scrollContainerLeft.firstElementChild;
    const containerRect = scrollContainerLeft.parentNode.getBoundingClientRect();
    const firstCardRect = firstCard.getBoundingClientRect();

    // Check if the first card is completely out of view
    if (firstCardRect.right < containerRect.left) {
        const cardContent = {
            imageSrc: firstCard.querySelector('img').src,
            title: firstCard.querySelector('h3').textContent,
            description: firstCard.querySelector('p').textContent
        };

        // Remove the first card
        scrollContainerLeft.removeChild(firstCard);

        // Create and append the new card to the end of the container
        const newCard = createNewCard(cardContent.imageSrc, cardContent.title, cardContent.description);
        scrollContainerLeft.appendChild(newCard);

        // Update the offset to keep the scroll smooth
        currentOffsetLeft += cardWidth;
        scrollContainerLeft.style.transform = `translateX(${currentOffsetLeft}px)`;
    }

    // Keep the animation going
    requestAnimationFrame(scrollLeft);
}

// Initialize the card duplication and scrolling
function initializeCardsLeft() {
    const initialCards = Array.from(scrollContainerLeft.children);
    initialCards.forEach(card => {
        const clone = card.cloneNode(true);
        scrollContainerLeft.appendChild(clone);
    });
    currentOffsetLeft = 0;
}

// Start scrolling
initializeCardsLeft();
scrollLeft();
