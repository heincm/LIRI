require("dotenv").config();

let log = console.log
// requiring needed packages
let spot = require("./keys.js").spotify
let axios = require("axios");
let moment = require("moment");

// defiing concert function
function concert() {
    let input = process.argv.splice(3)
    let artist = input.join("");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
        log("venue name", response.data[0].venue.name);
        log("location:", response.data[0].venue.city + ",", response.data[0].venue.country);
        log("event date", moment((response.data[0].datetime)).format("MM/DD/YYYY"));
      })
      .catch(function (error) {
        log(error);
      })
}


// switch statement to handle various function options
switch (process.argv[2]) {
    case "concert-this":
       concert();
        break;
    case "spotify-this-song":
       // spotify();
       log("spotify")
        break;
    case "movie-this":
       // movie();
       log("movie")
        break;
    case "do-what-it-says":
        //doIt();
        log("do it")
        break;
    default: log("you messed up");
}

/*function concert-this(){

};
spotify-this-song
movie-this
do-what-it-says

let process.argv[2] = action;
*/