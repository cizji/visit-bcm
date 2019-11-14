/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */

 var rp = require('request-promise'); 

 console.log('Start');
 
 function main(params) {
    
  if (params.action == "Weather") {
        const options = {
            uri: encodeURI("http://api.openweathermap.org/data/2.5/weather?apikey=4a2360d14bf33378079d2e2d49e35ddb&mode=json&units=metric&q=" + params.search_value),
            json : true
        }
       return rp(options)
          .then (function (res) {
            // Generate answer for cases when extract field is empty or nothing found at all
           if (res['cod'] != "200" ) {
                res['main'['temp']] = "Tak bohužel, město "+ params.titles + "  jsem nenašel na mapě."
             }
             // Add JSON to response and return it back to Watson Assistant 
             return { response : res }
         })
         .catch (function (err) {
            console.log('catch');
            console.log(err)
         }) 
      
   }
   
 }
