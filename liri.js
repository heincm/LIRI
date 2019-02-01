require("dotenv").config();

let log = console.log;
// requiring needed packages
let Spotify = require("node-spotify-api");
let keys = require("./keys.js"); debugger;
let spotify = new Spotify(keys.spotify)
let axios = require("axios");
let moment = require("moment");
let fs = require("fs");
let command = process.argv[2]
let param = process.argv.splice(3)

// delcaring each function
function concert(band) {
    debugger;
    axios.get("https://rest.bandsintown.com/artists/" + band.join("") + "/events?app_id=codingbootcamp")
        .then(function (response) {
            log("venue name", response.data[0].venue.name);
            log("location:", response.data[0].venue.city + ",", response.data[0].venue.country);
            log("event date", moment((response.data[0].datetime)).format("MM/DD/YYYY"));
        })
        .catch(function (error) {
            log(error);
        })
};

function getSong(song) {
    debugger;
    spotify.request("https://api.spotify.com/v1/search?query=" + song + "&type=track&offset=0&market=US&limit=10")
        .then(function (response) {
            //log(JSON.stringify(response, null, 2));
            log(response)
            
            //for (let i = 0; i < response.tracks; i++) {
                //log(response.tracks.href.items);
                //log(response.tracks.items[0].album.artists[0].name)
            //}
        })
        .catch(function (err) {
            log(err);
        });
};

function getMovie(movie) {
    debugger;
    let title = movie.join("+");
    if (title === "") {
        title = "Mr.+Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            debugger;
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

function doIt() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return log(error);
        }
        let something = data.split(",")
        let fixedIt = something[1].replace(/^"|"$/g, '').split(" ")
        switch (something[0]) {
            case "movie-this":
                getMovie(fixedIt);
                break;
            case "concert-this":
                concert(fixedIt);
                break;
            default: log("you done messed something up, son!");
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
    default: log("you done messed up, A-A-Ron!");
}
