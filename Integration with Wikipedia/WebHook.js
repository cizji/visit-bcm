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
 //var params = {"titles" : "Madonna"};

 console.log('Start');
 
 function main(params) {
     const options = {
     uri :  "https://cs.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&titles=" + params.titles,
     json : true
     }
     
 
     return rp(options)
         .then (function (res) {
             //console.log(res['query']['pages'][0])
             console.log('then');
                 
             var index = '';
             for (var key in res['query']['pages']) {
                index = key
                }

             return { response : res['query']['pages'][index]['extract'] }
         })
         .catch (function (err) {
            console.log('catch');
            console.log(err)
         })
 }

// main(params)
 
