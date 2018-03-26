// using axios 
// with and w/o promises

// library
var axios = require('axios');

// axios call objects
var mamund = {};
mamund.url = "https://api.github.com/users/mamund";
mamund.method = "get";

var dret = {};
dret.url = "https://api.github.com/users/dret";
dret.method = "get";

// collection of calls
var both = [mamund,dret];

// do it!
main('cb');

// main routine
function main(style) {

  switch(style.toLowerCase()) {
    case "callback":
    case "cb":
      cbRequests(mamund,showResponse,showError);
      cbRequests(both,showResponse,showError);
      break;
    case "promise":
    case "p":
      promiseRequests(mamund).then(showResponse).catch(showError);
      promiseRequests(both).then(showResponse).catch(showError);
      break;
    default:
      console.log("unknown style: ${style}",style);
      break;
  }
}

// **** helper functions ****

// show results
function showResponse(responses) {
  console.log('results');
  for(i=0,x=responses.length;i<x;i++) {
    console.log(i,responses[i].data);
  } 
  return responses;
}

// show error info
function showError(err) {
  console.log('Error!');
  console.log(err.config.url);
  
  if(err.response) {
    console.log(err.response.data);
  } else if(err.request) {
    console.log(err.request);
  }
  
  return err;
}

// promise-style requestor
function promiseRequests(req) {
  var list = [];

  // fix up request collection
  if(Array.isArray(req)===false) {
    list.push(axios.request(req));
  }
  else {
    for(i=0,x=req.length;i<x;i++) {
      list.push(axios.request(req[i]));
    }
  }
  
  // return the promise object
  return new Promise(function(resolve, reject) {
    axios.all(list)
    .then(function(responses) { 
      resolve(responses);
    })
    .catch(function(err) {
      reject(err);
    });
  });  
}
 
// callback-style requestor
function cbRequests(req, cb, err) {
  var list = [];

  // load array of requests
  if(Array.isArray(req)===false) {
    list.push(axios.request(req));
  }
  else {
    for(i=0,x=req.length;i<x;i++) {
      list.push(axios.request(req[i]));
    }
  } 
 
  // kick off requests,
  // call cb when all are completed,
  // do catch if error
  axios.all(list)
  .then(function(responses) {
    cb(responses);
  })
  .catch(function(error){
    err(error)
  });
}

