let pokeID = 132;
let pokeName, sprite, types;
let height, weight, hp, attack, defense, specialAttack, specialDefense, speed;
let moves;

const typeColorMap = {
    "normal": "#a8a77a",
    "fire": "#ee8130",
    "water": "#6390f0",
    "electric": "#f7d02c",
    "grass": "#7ac74c",
    "ice": "#96d9d6",
    "fighting": "#c22e28",
    "poison": "#a33ea1",
    "ground": "#e2bf65",
    "flying": "#a98ff3",
    "psychic": "#f95587",
    "bug": "#a6b91a",
    "rock": "#b6a136",
    "ghost": "#735797",
    "dragon": "#6f35fc",
    "dark": "#705746",
    "steel": "#b7b7ce",
    "fairy": "#d685ad"
}

const nameContainer = document.getElementById("name-container");
const pokePic = document.getElementById("pokemon-pic");
const typesContainer = document.getElementById("types-container");
const leftButton = document.getElementById("left-btn-container");
const rightButton = document.getElementById("right-btn-container");

const rightHeader = document.getElementById("right-header");
const statsContainer = document.getElementById("stats-container");
const infoButton = document.getElementById("info-btn-container");
const movesButton = document.getElementById("moves-btn-container");
let infoSelected = true;

leftButton.addEventListener("click", (event) => {
    pokeID--;
    if (pokeID === 0) {
        pokeID = 1017;
    }
    fetchData();
});

rightButton.addEventListener("click", (event) => {
    pokeID++;
    if (pokeID === 1018) {
        pokeID = 0;
    }
    fetchData();
});

infoButton.addEventListener("click", (event) => {
    infoSelected = true;
    displayInfo();
});

movesButton.addEventListener("click", (event) => {
    infoSelected = false;
    displayMoves();
});

function fetchData() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeID)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            pokeName = data.name;
            sprite = data.sprites.front_default;
            types = data.types;

            height = data.height;
            weight = data.weight;
            hp = data.stats[0].base_stat;
            attack = data.stats[1].base_stat;
            defense = data.stats[2].base_stat;
            specialAttack = data.stats[3].base_stat;
            specialDefense = data.stats[4].base_stat;
            speed = data.stats[5].base_stat;

            moves = data.moves;

            nameContainer.innerHTML = pokeName;
            pokePic.src = sprite;

            let typesHTML = ``;
            types.forEach((type) => {
                const typeName = type.type.name;
                typesHTML += `<div class="type" style="background-color:${typeColorMap[typeName]}">${typeName}</div>`;
            });
            typesContainer.innerHTML = typesHTML;

            if (infoSelected) {
                displayInfo();
            } else {
                displayMoves();
            }
        })
}

function displayInfo() {
    rightHeader.innerHTML = "Info";
    statsContainer.innerHTML = `
        height: ${height / 10}m
        <br>
        weight: ${weight}kg
        <br>
        hp: ${hp}
        <br>
        attack: ${attack}
        <br>
        defense: ${defense}
        <br>
        special-attack: ${specialAttack}
        <br>
        special-defense: ${specialDefense}
        <br>
        speed: ${speed}
    `;
    infoButton.style.backgroundColor = "#7cff79";
    movesButton.style.backgroundColor = "#e8e8e8";
}

function displayMoves() {
    rightHeader.innerHTML = "Moves";
    let movesHTML = ``;
    moves.forEach((move) => movesHTML += move.move.name + `<br>`);
    statsContainer.innerHTML = movesHTML;
    infoButton.style.backgroundColor = "#e8e8e8";
    movesButton.style.backgroundColor = "#7cff79";
}

fetchData();