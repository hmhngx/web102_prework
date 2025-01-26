/*****************************************************************************
 * Import and Parse Game Data
 */

import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA);

/*****************************************************************************
 * Utility Functions
 */

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add Game Cards to the Page
 */

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    games.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <h2>${game.name}</h2>
            <img src="${game.img}" alt="${game.name}" />
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        gamesContainer.appendChild(gameCard);
    });
}

addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4: Create Summary Statistics
 */

// Grab elements for contributions, total raised, and total games
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Calculate and display the total contributions, total raised, and total games
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;

contributionsCard.innerHTML = totalContributions.toLocaleString();
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
gamesCard.innerHTML = totalGames;

/*****************************************************************************
 * Challenge 5: Add Functions to Filter Games
 */
``
// Show only unfunded games
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

// Show only funded games
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

// Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 6: Add More Information
 */

const descriptionContainer = document.getElementById("description-container");

const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const descriptionText = `
    A total of ${totalGames} games have been added. 
    ${unfundedGamesCount} ${unfundedGamesCount === 1 ? "game remains" : "games remain"} unfunded. 
    We need your help to fund these amazing games!
`;

// Create and append a new paragraph for the description
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);

/*****************************************************************************
 * Challenge 7: Display the Top 2 Games
 */

const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

const [topGame, secondGame] = sortedGames;

document.getElementById("first-game").innerHTML += `
    <h2>${topGame.name}</h2>
    <p><strong>Pledged:</strong> $${topGame.pledged.toLocaleString()}</p>
`;

document.getElementById("second-game").innerHTML += `
    <h2>${secondGame.name}</h2>
    <p><strong>Pledged:</strong> $${secondGame.pledged.toLocaleString()}</p>
`;
