const baseUrl = "https://rickandmortyapi.com/api/";

// Helper function to make API requests
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
  }
}

// Fetch characters, locations, and episodes data
async function fetchAllData() {
  try {
    const [charactersData, locationsData, episodesData] = await Promise.all([
      fetchData("character"),
      fetchData("location"),
      fetchData("episode"),
    ]);
    return [charactersData, locationsData, episodesData];
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
}

// Display counts of characters, locations, and episodes
async function displayDataCounts() {
  try {
    const [charactersData, locationsData, episodesData] = await fetchAllData();
    document.getElementById("countApi").innerHTML += `<p>
      CHARACTERS: ${charactersData.info.count} | LOCATIONS: ${locationsData.info.count} | EPISODES: ${episodesData.info.count}
    </p>`;
  } catch (error) {
    console.error("Error displaying data counts:", error);
  }
}

// Get current year and display it
const year = new Date().getFullYear();
document.getElementById("year").innerHTML = year;

// Display random character cards
async function displayRandomCharacters() {
  try {
    const randomCharacterIds = new Set();
    while (randomCharacterIds.size < 3) {
      const randomId = Math.floor(Math.random() * 826) + 1;
      randomCharacterIds.add(randomId);
    }

    const characterData = await Promise.all(
      [...randomCharacterIds].map(id => fetchData(`character/${id}`))
    );

    characterData.forEach((character, index) => {
      const characterCard = `
      <div id="character-card" class="character-card">
        <div class="card-header">
          <div class="card-image">
            <img src=${character.image} />
          </div>
          <div class="character-card-title">
            <h2 class="character-card-name">${character.name}</h2>
            <p class="character-card-description">ID:${
              character.id
            } | Location:${character.location.name}</p>
          </div>
        </div>
        <div class="card-info">
          <div class="character-card-text-wrapper">
            <span>TYPE</span>
            <p>${character.type || "Undefined"}</p>
          </div>
          <div class="character-card-text-wrapper">
            <span>STATUS</span>
            <p>${character.status}</p>
          </div>
          <div class="character-card-text-wrapper">
            <span>SPECIES</span>
            <p>${character.species}</p>
          </div>
          <div class="character-card-text-wrapper">
            <span>GENDER</span>
            <p>${character.gender}</p>
          </div>
          <div class="character-card-text-wrapper">
            <span>ORIGIN</span>
            <p>${character.origin.name}</p>
          </div>
        </div>
      </div>
      `;
      const contents = document.getElementById("content");
      contents.innerHTML += characterCard;
    });
  } catch (error) {
    console.error("Error displaying random characters:", error);
  }
}

// Entry point to fetch data and display random characters
(async () => {
  try {
    await displayDataCounts();
    await displayRandomCharacters();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
