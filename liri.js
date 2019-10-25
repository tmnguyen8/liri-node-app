// read and set environment variables with dotenv package
require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
var action = process.argv[2];
var value = process.argv.slice(3, process.argv.length).join(" ");
// Spotify variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// switch case which direct to different action functions
switch (action) {
  case ("concert-this"):
    concert();
    break;
  case ("spotify-this-song"):
    spotifyThis();
    break;
  case ("movie-this"):
    movie();
    break;
  case ("do-what-it-says"):
    doIt();
    break;
}

// function to get bands in town
function concert() {
  var artist = value;
  axios
    .get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
    .then(function(response) {
      // console.log(response.data);
      for (i of response.data) {
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
      for (i of response.tracks.items) {
          // console.log(i)
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

function findRotTomato(arrayObj) {
  for (i of arrayObj) {
    if (i.Source === "Rotten Tomatoes") {
      return i.Value
    }
  }
  return "No rating available"
}

// function to get movie
function movie() {
  var movieTitle = value;
  axios.get(`http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=trilogy`).then(
  function(response) {

    if (response.data.Response === 'False') {
      console.log('Movie is not found. Here is something for your to watch')
      axios.get(`http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy`).then( function(secondResponse) {
          
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
}
