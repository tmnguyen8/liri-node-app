# liri-node-app
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)


## What is this repo?
A node js app name LIRI (somewhat related to SIRI). LIRI is a Language Interpretation and Recognition Interface that takes in a command line in node js and parameters. It will then display the data back based on the command, log the results in the terminal as well as write to a text file.

## How is this repo useful?
This is a great learning tool for node js/javascript beginners to get acquainted with the following concepts:
  * Learn about dotenv to store API keys and keeping sensitive information private.
    * [dotenv package](https://www.npmjs.com/package/dotenv)
  * Learn about moment to format date and time.
    * [moment package](https://www.npmjs.com/package/moment)
  * Learn about Axios to http requests from node.js; it supports the Promise API and transforms request and response data.
    * [Axios package](https://www.npmjs.com/package/axios)
  * Learn about OBDb API and the vast movie database that it contains.
    * [OMDb API](http://www.omdbapi.com/)
  * Learn about Band in Town API to get access to your favorite artist's information and upcoming events
    * [Band in Town API](https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0)
  * Learn about Spotify API and the ability to get data about the track, album, link to listen to and many more. 
    * [Spotify API](https://www.npmjs.com/package/node-spotify-api)


## How to get Started
* clone the repository:
```git
git clone git@github.com:tmnguyen8/liri-node-app.git
```
* If you node js and npm installed, you can skip this step.
  * [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

* Install the packages:
Navigate to your directory where this repo lives on your local machine and install the following packages:
```git
npm install --save dotenv
npm install --save moment
npm install --save axios
npm install --save spotify
```
* Getting Spotify Keys
1. Visit https://developer.spotify.com/my-applications/#!/
2. Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
3. Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
4. On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
5. In the same folder directory, create a file named ```.env```, add the following to it, replacing the values with your API keys (no quotes) once you have them:
```git
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
## How does this work?
1. Concert-this command will search the Bands in Town Artist Events API for an artist and render the information about each event to the terminal. Run the following command in the terminal. Replace the artist of your choice.

 ```node liri.js concert-this <artist/band name here>```

2. Spotify-this-song command will show the information about the song in your terminal/bash window Run the following command in the terminal. Replace the song name of your choice.

 ```node liri.js spotify-this-song '<song name here>'```

3. Movie-this will output the movie information to your terminal/bash window. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

 ```node liri.js movie-this '<movie name here>'```

4. Do-what-it-says will take the text inside of random.txt and then use it to call one of LIRI's commands.

 ```node liri.js do-what-it-says```

## Contact

Visit my portfolio and contact page for any comments.
[https://tmnguyen8.github.io/portfolio/](https://tmnguyen8.github.io/portfolio/)


