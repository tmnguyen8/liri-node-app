// GLOBAL VARIABLES
// *********************************************
// read and set environment variables with dotenv package
require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var action = process.argv[2];
var value = process.argv.slice(3, process.argv.length).join(" ");
// Spotify variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// EXECUTIONS
// *********************************************
// Execute LIRI
runLIRI();


// FUNCTIONS
// *********************************************
// switch case which direct to different action functions
function runLIRI () {
  switch (action) {
  case ("concert-this"):
    concertThis();
    break;
  case ("spotify-this-song"):
    spotifyThis();
    break;
  case ("movie-this"):
    movieThis();
    break;
  case ("do-what-it-says"):
    doThis();
    break;
  }
}

// function to get bands in town
function concertThis() {
  var artist = value;
  axios
    .get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
    .then(function(response) {
      // console.log(response.data);
      logThis(`\n******************************************\n${action} ${value}`)
      for (i of response.data) {
        // log this by appending to log.txt
        logThis(`
\t Artist: ${i.lineup[0]}
\t Venue name: ${i.venue.name}
\t Venue location: ${i.venue.city}, ${i.venue.country}
\t Date of event: ${moment(i.datetime).format('MM/DD/YYYY')} 
\t Link: ${i.url}
    -------------------
        `);

        console.log(`
          Artist: ${i.lineup[0]}
          Venue name: ${i.venue.name}
          Venue location: ${i.venue.city}, ${i.venue.country}
          Date of event: ${moment(i.datetime).format('MM/DD/YYYY')} 
          Link: ${i.url}
          -------------------
        `);
      };
    }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// function to get spotify song
function spotifyThis() {
  var songTitle = value;
  spotify
    .search({ type: 'track', query: songTitle })
    .then(function(response) {
      // console.log(response.tracks.items[0]);
      logThis(`\n******************************************\n${action} ${value}`)
      for (i of response.tracks.items) {
        logThis(`
\t Artist: ${i.artists[0].name}
\t Song: ${i.name}
\t Link: ${i.external_urls.spotify}
\t Album: ${i.album.name}
    -------------------
        `);

        console.log(`
          Artist: ${i.artists[0].name}
          Song: ${i.name}
          Link: ${i.external_urls.spotify}
          Album: ${i.album.name}
          -------------------
        `);
      }
    }).catch(function(err) {
      console.log(err.message);
    });

}

// function to find the Rottem Tomatoes rating only from OMDB API
function findRotTomato(arrayObj) {
  for (i of arrayObj) {
    if (i.Source === "Rotten Tomatoes") {
      return i.Value
    }
  }
  return "No rating available"
}

// function to get movie
function movieThis() {
  var movieTitle = value;
  axios.get(`http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=trilogy`).then(
  function(response) {

    if (response.data.Response === 'False') {
      console.log('Movie is not found. Here is something for your to watch')
      axios.get(`http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy`).then( function(secondResponse) {
          // log this by appending to log.txt
          logThis(`\n******************************************\n${action} ${value}
\t Title: ${secondResponse.data.Title}
\t Year: ${secondResponse.data.Year}
\t IMBD Rating: ${secondResponse.data.imdbRating}
\t Rotten Tomatoes Rating: ${findRotTomato(secondResponse.data.Ratings)}
\t Country: ${secondResponse.data.Country}
\t Language: ${secondResponse.data.Language}
\t Plot: ${secondResponse.data.Plot}
\t Actors: ${secondResponse.data.Actors}
          -------------------
          `);
          // console this to terminal
          console.log(`
          Title: ${secondResponse.data.Title}
          Year: ${secondResponse.data.Year}
          IMBD Rating: ${secondResponse.data.imdbRating}
          Rotten Tomatoes Rating: ${findRotTomato(secondResponse.data.Ratings)}
          Country: ${secondResponse.data.Country}
          Language: ${secondResponse.data.Language}
          Plot: ${secondResponse.data.Plot}
          Actors: ${secondResponse.data.Actors}
          `)
        });
    } else {
        // log this by appending to log.txt
        logThis(`\n******************************************\n${action} ${value}
\t Title: ${response.data.Title}
\t Year: ${response.data.Year}
\t IMBD Rating: ${response.data.imdbRating}
\t Rotten Tomatoes Rating: ${findRotTomato(response.data.Ratings)}
\t Country: ${response.data.Country}
\t Language: ${response.data.Language}
\t Plot: ${response.data.Plot}
\t Actors: ${response.data.Actors}
    -------------------
        `);
        // console log this to terminal
        console.log(`
        Title: ${response.data.Title}
        Year: ${response.data.Year}
        IMBD Rating: ${response.data.imdbRating}
        Rotten Tomatoes Rating: ${findRotTomato(response.data.Ratings)}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors: ${response.data.Actors}
      `);      
    };
  }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};

// function to do what it says according to what the random.txt is saying
function doThis() {
  fs.readFile("./random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    };

    var dataArr = data.split(' ');
    action = dataArr[0];
    value = dataArr.slice(1, dataArr.length).join(" ");
    runLIRI();
  });
};

// function to write the command and output results
function logThis(text) {
  fs.appendFile("./log.txt", text, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  
    // // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    // else {
    //   console.log("Content Added!");
    // }
  
  });
}
