let currentPage = 1;
const contentElement = document.getElementById("content-characters");
const nextButton = document.getElementById("btnNext");
const prevButton = document.getElementById("btnPrev");

const fetchCharacterData = page => {
  return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
    response => response.json()
  );
};

const createCharacterCard = character => {
  const {
    image,
    name,
    status,
    species,
    gender,
    origin,
    id,
    location,
    type = "Classified",
  } = character;

  return `
  <div id="character-card" class="character-card">
    <div class="card-header">
      <div class="card-image">
        <img src=${image} />
      </div>
      <div class="character-card-title">
        <h2 class="character-card-name">${name}</h2>
        <p class="character-card-description">ID:${id} | Location:${
    location.name
  }</p>
      </div>
    </div>
    <div class="card-info">
      <div class="character-card-text-wrapper">
        <span>TYPE</span>
        <p>${type || "Undefined"}</p>
      </div>
      <div class="character-card-text-wrapper">
        <span>STATUS</span>
        <p>${status}</p>
      </div>
      <div class="character-card-text-wrapper">
        <span>SPECIES</span>
        <p>${species}</p>
      </div>
      <div class="character-card-text-wrapper">
        <span>GENDER</span>
        <p>${gender}</p>
      </div>
      <div class="character-card-text-wrapper">
        <span>ORIGIN</span>
        <p>${origin.name}</p>
      </div>
    </div>
  </div>
  `;
};

const loadPage = page => {
  fetchCharacterData(page).then(data => {
    contentElement.innerHTML = ""; // Limpiar contenido anterior

    data.results.forEach(character => {
      const card = createCharacterCard(character);
      contentElement.insertAdjacentHTML("beforeend", card);
    });

    currentPage = page;
    updatePageButtons(data.info.prev, data.info.next);
  });
};

const updatePageButtons = (prevPage, nextPage) => {
  prevButton.disabled = !prevPage;
  nextButton.disabled = !nextPage;

  prevButton.onclick = () => prevPage && loadPage(currentPage - 1);
  nextButton.onclick = () => nextPage && loadPage(currentPage + 1);
};

loadPage(currentPage);

// Get current year and display it
const year = new Date().getFullYear();
document.getElementById("year").innerHTML = year;
