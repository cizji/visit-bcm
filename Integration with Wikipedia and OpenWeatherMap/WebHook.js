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
 //var params = {"titles" : "Aštar"};

 console.log('Start');
 
 function main(params) {
    
   if (params.action == "Wiki") { const options = {
     uri: encodeURI("https://cs.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=1&prop=extracts&pilimit=max&exintro&explaintext&exsentences=8&exlimit=max&gsrsearch=" + params.search_value),
     json : true
     }
     
    return rp(options)
         .then (function (res) {

            // Wiki returns 'page number' as a key (eg. "23456"), we need to know this key to retrieve extract from the JSON tree 
             var index = '';              
             for (var key in res['query']['pages']) {
                index = key
                }
            // Generate answer for cases when extract field is empty or nothing found at all
            if (res['query']['pages'][index]['extract'] == "" || index == "-1" ) {
                res['query']['pages'][index]['extract'] = "Tak bohužel, na české Wiki není o "+ params.titles + " žádné info."
             }
             // Add JSON to response and return it back to Watson Assistant 
             return { response : res['query']['pages'][index]['extract'] }
         })
         .catch (function (err) {
            console.log('catch');
            console.log(err)
         })
   } else if (params.action == "Weather") {
        const options = {
            uri: encodeURI("http://api.openweathermap.org/data/2.5/weather?apikey=4a2360d14bf33378079d2e2d49e35ddb&mode=json&lang=cz&units=metric&q=" + params.search_value),
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

//main(params)
