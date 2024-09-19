const scrollContainerLeft = document.getElementById('scroll-container-left');
const scrollContainerRight = document.getElementById('scroll-container-right');
let scrollSpeed = 1; // Speed of the scroll
let currentOffsetLeft = 0; // Track the current offset of the scroll
let currentOffsetRight = 0;
let cardWidth = 250 + 40; // 150px width + 20px margin

// Function to create a new card dynamically with image, title, and description
function createNewCard(imageSrc, title, description) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    // Create the icon container
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title + " Icon";
    img.classList.add('icon');
    iconContainer.appendChild(img);
    newCard.appendChild(iconContainer);

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

// Move the right container to the right
function scrollRight() {
    currentOffsetRight += scrollSpeed;
    scrollContainerRight.style.transform = `translateX(${currentOffsetRight}px)`;

    const lastCard = scrollContainerRight.lastElementChild;
    const containerRect = scrollContainerRight.parentNode.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();

    if (lastCardRect.left > containerRect.right) {
        const cardContent = {
            imageSrc: lastCard.querySelector('img').src,
            title: lastCard.querySelector('h3').textContent,
            description: lastCard.querySelector('p').textContent
        };
        // console.log(cardContent)
        scrollContainerRight.removeChild(lastCard);
        const newCard = createNewCard(cardContent.imageSrc, cardContent.title, cardContent.description);
        scrollContainerRight.insertBefore(newCard, scrollContainerRight.firstChild);
        currentOffsetRight -= cardWidth;
        // Recalculate the container width after the card is added
        scrollContainerRight.style.transform = `translateX(${currentOffsetRight}px)`;
    }

    requestAnimationFrame(scrollRight);
}

function initializeCards() {
    // Duplicate the initial cards to create a seamless effect
    const initialCardsLeft = Array.from(scrollContainerLeft.children);
    initialCardsLeft.forEach(card => {
        const clone = card.cloneNode(true);
        scrollContainerLeft.appendChild(clone);
    });

    // Set initial offset based on the total width of the cards
    currentOffsetLeft = 0;

    const initialCardsRight = Array.from(scrollContainerRight.children);
    initialCardsRight.reverse().forEach(card => {
        const clone = card.cloneNode(true);
        scrollContainerRight.insertBefore(clone, scrollContainerRight.firstChild);
    });
    currentOffsetRight = 0;
}

// Initialize the card duplication and scrolling
initializeCards();
scrollLeft();
scrollRight();
