import axios from "axios";
import QuestList from "./questList";

export default {
  // function Api Capital
  searchDataCapital: async (numberQuest) => {
    const tabDataCapital = [];
    await fetch(
      "https://restcountries.com/v3.1/all?fields=capital,population,cca3,capitalInfo"
    )
      .then((res) => res.json())
      .then((data) => {
        let i = 0;
        while (i < numberQuest) {
          const FilteredCountry = data.filter(
            (country) =>
              country.population > 400000 &&
              country.capitalInfo !== null &&
              country.capital !== null &&
              country.cca3 !== null
          );
          const randomCountryIndex = () =>
            Math.floor(Math.random() * FilteredCountry.length);
          const countrySet = new Set();
          while (countrySet.size < 4) {
            countrySet.add(FilteredCountry[randomCountryIndex()]);
          }
          const countryArray = Array.from(countrySet);

          const rightIndex = Math.floor(Math.random() * 3);

          const duplicate = tabDataCapital.some(
            (element) => element.cca3 === countryArray[rightIndex]?.cca3
          );

          if (!duplicate) {
            tabDataCapital.push({
              apiName: "capital",
              quest: QuestList.capital,
              answers: countryArray,
              rightAnswer: rightIndex,
            });
            i += 1;
          }
        }
      })
      .catch((err) => console.error("err -->", err));
    console.warn("tabDataCapital", tabDataCapital);
    console.warn("tabDataCapital.length", tabDataCapital.length);
    return tabDataCapital;
  },
  // Function Api Game
  searchDataCocktail: async (numberQuest) => {
    const tabDataCoktail = [];
    await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
    )
      .then((res) => res.json())
      .then((data) => {
        let i = 0;
        while (i < numberQuest) {
          const randomIndex = () =>
            Math.floor(Math.random() * data.drinks.length);
          const cocktailSet = new Set();
          while (cocktailSet.size < 4) {
            cocktailSet.add(data.drinks[randomIndex()]);
          }
          const cocktailArray = Array.from(cocktailSet);
          const rightIndex = Math.floor(Math.random() * 3);

          const duplicateCocktail = tabDataCoktail.some(
            (element) =>
              element.strDrink === cocktailArray[rightIndex]?.strDrink
          );
          if (!duplicateCocktail) {
            tabDataCoktail.push({
              apiName: "cocktail",
              quest: QuestList.cocktail,
              answers: cocktailArray,
              rightAnswer: rightIndex,
            });
            i += 1;
          }
        }
      })
      .catch((err) => console.error("err -->", err));
    return tabDataCoktail;
  },
  // Function Api Game
  searchDataGame: async (numberQuest) => {
    const tabDataGame = [];
    await axios
      .get("http://localhost:5001/api/game/data")
      .then((response) => {
        let i = 0;
        while (i < numberQuest) {
          const games = response.data.results;
          const randomGameIndex = Math.floor(Math.random() * games.length);
          const randomGame = games[randomGameIndex];
          const gameTitles = [randomGame.name];
          while (gameTitles.length < 4) {
            const randomIndex = Math.floor(Math.random() * games.length);
            const randomTitle = games[randomIndex].name;
            const isDuplicate = gameTitles.some(
              (element) => element === randomTitle
            );

            if (!isDuplicate) {
              gameTitles.push(randomTitle);
            }
          }
          gameTitles.sort(() => Math.random() - 0.5);
          tabDataGame.push({
            apiName: "game",
            quest: QuestList.game,
            answers: gameTitles,
            rightAnswer: gameTitles.indexOf(randomGame.name),
            rightImage: randomGame.background_image,
          });
          i += 1;
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    return tabDataGame;
  },

  // Function Api Music
  searchDataMusic: async (numberQuest) => {
    const tabDataMusic = [];
    await fetch("http://localhost:5001/api/music/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        const trackLinks = data.tracks.data.map((track) => {
          const objectMusic = {
            preview: track.preview,
            title: track.title,
          };
          return objectMusic;
        });

        let i = 0;
        while (i < numberQuest) {
          const randomMusicIndex = () =>
            Math.floor(Math.random() * trackLinks.length);
          const musicSet = new Set();
          while (musicSet.size < 4) {
            musicSet.add(trackLinks[randomMusicIndex()]);
          }
          const musicArray = Array.from(musicSet);

          const rightIndex = Math.floor(Math.random() * 3);

          const duplicate = tabDataMusic.some(
            (element) => element.title === musicArray[rightIndex]?.title
          );

          if (!duplicate) {
            tabDataMusic.push({
              apiName: "music",
              quest: QuestList.music,
              answers: musicArray,
              rightAnswer: rightIndex,
            });
            i += 1;
          }
        }
      })
      .catch((err) => console.error("err -->", err));
    return tabDataMusic;
  },
};
