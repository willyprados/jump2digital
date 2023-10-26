let charactersData;
let locationsData;
let episodesData;

const baseUrl = "https://rickandmortyapi.com/api/";

const getCharacters = async () => {
  try {
    const response = await fetch(`${baseUrl}character`);
    charactersData = await response.json();
    console.log(charactersData);
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
};

const getLocations = async () => {
  try {
    const response = await fetch(`${baseUrl}location`);
    locationsData = await response.json();
    console.log(locationsData);
  } catch (error) {
    console.error("Error al obtener las ubicaciones:", error);
  }
};

const getEpisodes = async () => {
  try {
    const response = await fetch(`${baseUrl}episode`);
    episodesData = await response.json();
    console.log(episodesData);
  } catch (error) {
    console.error("Error al obtener los episodios:", error);
  }
};

getCharacters()
  .then(() => getLocations())
  .then(() => getEpisodes())
  .then(() => {
    document.getElementById("countApi").innerHTML += `<p>
    CHARACTERS: ${charactersData.info.count} | LOCATIONS: ${locationsData.info.count} | EPISODES: ${episodesData.info.count}
  </p>`;
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });

// Año del Footer
const date = new Date();
const year = date.getFullYear();
document.getElementById("year").innerHTML = year;

// Card Personajes Random
async function getRandomCharacters() {
  const randomCharacterIds = [];
  while (randomCharacterIds.length < 3) {
    const randomId = Math.floor(Math.random() * 826) + 1;
    if (!randomCharacterIds.includes(randomId)) {
      randomCharacterIds.push(randomId);
    }
  }

  const characterData = [];

  for (const id of randomCharacterIds) {
    try {
      const response = await fetch(`${baseUrl}character/${id}`);
      const data = await response.json();
      characterData.push(data);
    } catch (error) {
      console.error(`Error al obtener el personaje ${id}:`, error);
    }
  }

  return characterData;
}

async function displayRandomCharacters() {
  const characters = await getRandomCharacters();

  characters.forEach((character, index) => {
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
}

displayRandomCharacters();
