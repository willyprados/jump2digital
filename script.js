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
