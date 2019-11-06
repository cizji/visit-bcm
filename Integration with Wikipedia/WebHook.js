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
    
    const options = {
     uri: encodeURI("https://cs.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&titles=" + params.titles),
     json : true
     }
     
    return rp(options)
         .then (function (res) {

            console.log('then');
                 
             var index = '';
             for (var key in res['query']['pages']) {
                index = key
                }
            if (res['query']['pages'][index]['extract'] == "" || index == "-1" ) {

                res['query']['pages'][index]['extract'] = "Bohužel, na Wiki není o tomhle žádné info."
             }
             return { response : res['query']['pages'][index]['extract'] }
         })
         .catch (function (err) {
            console.log('catch');
            console.log(err)
         })
 }

//main(params)
