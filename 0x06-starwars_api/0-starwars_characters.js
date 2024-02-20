const axios = require('axios');

async function getCharacters(movieId) {
    try {
        const response = await axios.get(`https://swapi.dev/api/films/${movieId}/`);
        const filmData = response.data;
        const characters = filmData.characters;
        for (const characterUrl of characters) {
            const characterResponse = await axios.get(characterUrl);
            console.log(characterResponse.data.name);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

if (process.argv.length !== 3) {
    console.log("Usage: node script.js <Movie ID>");
    process.exit(1);
}

const movieId = process.argv[2];
getCharacters(movieId);

