/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */

 import rp from 'request-promise'; 

 console.log('Start');
 
 function main(params) {
     const options = {
     uri :  "https://cs.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&titles=" + params.titles,
     json : true
     }
     
     console.log('JSON.parse');
     
     //console.log(rp(options));
     
     return rp(options)
         .then (function (res) {
             console.log(res['query']['pages'])
             return { response : res['query']['pages'] }
         })
         .catch (function (err) {
             console.log(err)
         })
 }
 
