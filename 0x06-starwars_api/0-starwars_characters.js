#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.log("Usage: ./script.js <Movie ID>");
  process.exit(1);
}

const movieId = process.argv[2];

request(`https://swapi-api.hbtn.io/api/films/${movieId}`, (err, response, body) => {
  if (err) {
    console.error("Error fetching film data:", err);
    process.exit(1);
  }
  
  if (response.statusCode !== 200) {
    console.error("Failed to fetch film data. Status code:", response.statusCode);
    process.exit(1);
  }

  const filmData = JSON.parse(body);
  const characters = filmData.characters;

  function fetchCharacter(index) {
    if (index === characters.length) return;
    request(characters[index], (err, response, body) => {
      if (err) {
        console.error("Error fetching character data:", err);
      } else if (response.statusCode !== 200) {
        console.error("Failed to fetch character data. Status code:", response.statusCode);
      } else {
        console.log(JSON.parse(body).name);
      }
      fetchCharacter(index + 1);
    });
  }

  fetchCharacter(0);
});

