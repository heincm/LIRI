# LIRI Bot

### Overview

For this assignment, I created LIRI a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### How it Works
There are four command line functions that can be utlizied with this CLI. 

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

Along with the first three commands, LIRI also takes in a search term provided by the user to search for information about the given term. 

`do-what-it-says` will read a text file, `random.txt` and will run the command with provided in that file. 

Each of the four commands will display information in the terminal. In addition, if there is no existing `log.txt` file, one will be created with the requested information. If the `log.txt` file already exists, the new information will be appended to the end of the file. 

#### Concert-this
   * This searches the Bands in Town Artist Events API for an artist and renders the following information about each event to the terminal:

     * Name of the venue
     * Venue location
     * Date of the Event 

#### Spotify-this-song
* This will show the following information about the song in your terminal/bash window

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

#### Movie-this
* This displays the following information to the terminal/bash window:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

#### Do-what-it-says
 * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

### See it in action
https://drive.google.com/file/d/1iE29KVr3TUbnbvFSAdUO6Y-pVqNuKq5B/view?usp=sharing