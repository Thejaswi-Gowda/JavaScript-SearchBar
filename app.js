const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

// Create a loader element
const loader = document.createElement('div');
loader.classList.add('loader');
document.body.appendChild(loader);

// Function to show loader
const showLoader = () => {
    loader.style.display = 'block';
}

// Function to hide loader
const hideLoader = () => {
    loader.style.display = 'none';
}

const noData = () => {
    return `<h1> No Data Found</h1>`
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        showLoader();  // Show loader while fetching data
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        hideLoader();  // Hide loader after data is fetched
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
        hideLoader();  // Hide loader in case of error
    }
};

const displayCharacters = (characters) => {
    console.log("first", characters);
    const htmlString = characters.length === 0 ? noData() : (
        characters.map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}" alt="${character.name}">
            </li>
        `;
        }).join('')
    );
    charactersList.innerHTML = htmlString;
};

loadCharacters();