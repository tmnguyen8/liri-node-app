// read and set environment variables with dotenv package
require("dotenv").config();
var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query: 'the way that I want' })
  .then(function(response) {
    console.log(response.tracks.items[0]);
    console.log('\n-----------\n');
  })
  .catch(function(err) {
    console.log(err.message);
  });

// Band in Town
var artist = "backstreet boys"

axios
.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
.then(function(response) {
  // If the axios was successful...
  // Then log the body from the site!
  console.log(response.data);
})
.catch(function(error) {
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

// Movie Tis OMBD
var movieTitle = 'i am legend'
axios.get(`http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=trilogy`).then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
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
