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
     uri: encodeURI("https://cs.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&titles=" + params.titles),
     json : true
     }
     
    return rp(options)
         .then (function (res) {

             var index = '';
             for (var key in res['query']['pages']) {
                index = key
                }
            if (res['query']['pages'][index]['extract'] == "" || index == "-1" ) {

                res['query']['pages'][index]['extract'] = "Tak bohužel, na české Wiki není o "+ params.titles + " žádné info."
             }
             return { response : res['query']['pages'][index]['extract'] }
         })
         .catch (function (err) {
            console.log('catch');
            console.log(err)
         })
   } else if (params.action == "Weather") {
        const options = {
            uri: encodeURI("http://api.openweathermap.org/data/2.5/weather?apikey=4a2360d14bf33378079d2e2d49e35ddb&mode=json&units=metric&q=" + params.titles),
            json : true
        }
       return rp(options)
          .then (function (res) {

           if (res['cod'] != "200" ) {
                res['main'['temp']] = "Tak bohužel, město "+ params.titles + "  jsem nenašel na mapě."
             }
             return { response : res }
         })
         .catch (function (err) {
            console.log('catch');
            console.log(err)
         }) 
      
   }
   
 }

//main(params)
