require("dotenv").config();

let log = console.log;

// requiring needed packages
let Spotify = require("node-spotify-api");
const keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
let fs = require("fs");
let command = process.argv[2];
let param = process.argv.splice(3);

// creating each function
function concert(band) {
  axios.get("https://rest.bandsintown.com/artists/" + band.join("") + "/events?app_id=codingbootcamp")
    .then(function (response) {
      let info = response.data[0]
      let logInfo =
        `
      ============
      Venue Name: ${info.venue.name}
      Location: ${info.venue.city}, ${info.venue.country}
      Event Date: ${moment(info.datetime).format("MM/DD/YYYY")}
      ============
      `;
      log(logInfo);
      fs.appendFile("log.txt", logInfo, "utf8", (error) => {
        if (error) throw error;
        log('The "data to append" was appended to file!');
      });
    })
    .catch(function (error) {
      log(error);
    });
};

function getSong(song) {
  let songName = song.join(" ");
  if (songName === "") {
    songName = "The Sign"
  };
  spotify.request("https://api.spotify.com/v1/search?query=" + songName + "&type=track&offset=0&market=US&limit=10")
    .then(function (response) {
      log("===========");
      let data = response.tracks.items[0];
      let logInfo =
        `
      ==========
      Artist name: ${data.album.artists[0].name}
      Song name: ${data.name}
      Album: ${data.album.name}
      Preview Url ${data.preview_url}
      ==========
        `;
      log(logInfo);

      fs.appendFile("log.txt", logInfo, "utf8", (error) => {
        if (error) throw error;
        log('The "data to append" was appended to file!');
      });
    })
    .catch(function (err) {
      log("Something's not right");
    });
};

function getMovie(movie) {
  let title = movie.join("+");
  if (title === "") {
    title = "Mr.+Nobody"
  };
  axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      let info = response.data;
      let logInfo =
        `
      ==========
      Title: ${info.Title}
      Year: ${info.Year}
      IMDB Rating: ${info.imdbRating}
      Rotten Tomatoes Rating: ${info.Ratings[1].Value}
      Country: ${info.Country}
      Language: ${info.Language}
      Plot: ${info.Plot}
      Actors: ${info.Actors}
      ==========
        `
      log(logInfo);

      fs.appendFile("log.txt", logInfo, "utf8", (error) => {
        if (error) throw error;
        log('The "data to append" was appended to file!');
      });
    })
    .catch(function (error) {
      log(error);
    })
};

function doIt() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      return log(error);
    };
    let ignoreComma = data.split(",");
    let textCommand = ignoreComma[1].replace(/^"|"$/g, '').split(" ");
    switch (ignoreComma[0]) {
      case "movie-this":
        getMovie(textCommand);
        break;
      case "spotify-this-song":
        getSong(textCommand);
        break;
      case "concert-this":
        concert(textCommand);
        break;
      default: log("You done messed something up, son! Check your command");
    }
  });
};

// switch statement to handle various function options
switch (command) {
  case "concert-this":
    concert(param);
    break;
  case "spotify-this-song":
    getSong(param);
    break;
  case "movie-this":
    getMovie(param);
    break;
  case "do-what-it-says":
    doIt();
    break;
  default: log("you done messed up, A-A-Ron! Check your command");
};
