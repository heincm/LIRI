require("dotenv").config();

let log = console.log;
// requiring needed packages
let spot = require("./keys.js").spotify;
let axios = require("axios");
let moment = require("moment");
let useSpotify = require("node-spotify-api");

// defiing concert function
function concert() {
    let artist = process.argv.splice(3).join("");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            log("venue name", response.data[0].venue.name);
            log("location:", response.data[0].venue.city + ",", response.data[0].venue.country);
            log("event date", moment((response.data[0].datetime)).format("MM/DD/YYYY"));
        })
        .catch(function (error) {
            log(error);
        })
};

function getSong() {
    useSpotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        .then(function (response) {
            log(response);
        })
        .catch(function (err) {
            log(err);
        });
};

function getMovie() {
    let movie = process.argv.splice(3).join("+");
    if (movie === ""){
        movie = "Mr.+Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            let info = response.data;
            log("Title:", info.Title, '\n' +
                "Year:", info.Year, '\n' +
                "IMDB Rating:", info.imdbRating, '\n' +
                "Rotten Tomatoes Rating:", info.Ratings[1].Value, '\n' +
                "Country:", info.Country, '\n' +
                "Language:", info.Language, '\n' +
                "Plot:", info.Plot, '\n' +
                "Actors:", info.Actors);

        })
        .catch(function (error) {
            log(error);
        })
};

// switch statement to handle various function options
switch (process.argv[2]) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        //doIt();
        log("do it")
        break;
    default: log("you done messed up, A-A-Ron!");
}
