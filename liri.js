require('dotenv').config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs');
var keys = require('./keys');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

var userInput = process.argv;
var command = process.argv[2];
var textToSearch = process.argv[3];


function concertThis (textTosearch) {
    axios.get("https://rest.bandsintown.com/artists/" + textToSearch + "/events?app_id=codingbootcamp").then(
        
            
    
        function(response){
            
            venue = response.data.venue.name;
             locationCity = response.data.venue.city;
             locationRegion = response.data.venue.region;
             date = response.data.datetime;
             newDate = moment(date).format("MM-DD-YYYY");
            
           
            console.log("Venue: " + venue + "/n Location: " +locationCity + " ," + locationRegion + "/n Date: " + newdate);
        }
        
    )
};

function spotifyThisSong(textToSearch) {
  spotify
  .search({ type: 'track', query: textToSearch })
  .then(function(response) {
    console.log(response);
  //the rest of this function should include responses from the spotify API (i.e. artist = response.data.artist) 
  //and then console logging the response but I cannot access the path

})
}



function movieThis (textToSearch) {

    if (!textToSearch) {
      textToSearch = "Mr. Nobody"
    };
    
      axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + textToSearch).then(

      
    function(error, response, body) {

           if (error) {

                   return console.log(error);

           }

           var json = response.data;

           var  showData = [

           title = 'Title: '+json.Title,

           year = 'Year: '+json.Year,

           rating1 = 'Rating from '+json.Ratings[0].Source+": "+json.Ratings[0].Value,

           rating2 = 'Rating from '+json.Ratings[1].Source+": "+json.Ratings[1].Value,

           country = 'Country of Origin: '+json.Country,

           language = 'Language: '+json.Language,

           plot = "Plot: "+json.Plot,

           actors = 'Actors: '+json.Actors
           ].join("\n\n");

           

          console.log(showData);

    }
      )
  };

       


function runProgram(){

if (command === "concert-this") {
    concertThis(textToSearch);
  }
  
  else if (command === "spotify-this-song") {
    spotifyThisSong(textToSearch);
  }
  
  else if (command === "movie-this") {
    movieThis(textToSearch);
  }
  
  else if (command === "do-what-it-says") {
    doWhatItSays(textToSearch);
  }
  
  else {
    error(textToSearch);
  };
};

runProgram();


  
  

