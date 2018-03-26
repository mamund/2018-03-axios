// axios testing

var axios = require('axios');

var mamund = {};
mamund.url = "https://api.github.com/users/mamund";
mamund.method = "get";

var dret = {};
dret.url = "https://api.github.com/users/dret";
dret.method = "get";

var both = [mamund,dret];

makeRequest(mamund, showResponse, showError);
makeRequest(dret, showResponse, showError);
makeRequest(both, showResponse, showError);

// eof

function showResponse(responses) {
  console.log('results');
  for(i=0,x=responses.length;i<x;i++) {
    console.log(i,responses[i].data);
  } 
}

function showError(err) {
  if(err.response) {
    console.log(err.response);
  } else if(err.request) {
    console.log(err.request);
  } else {
    console.log(err.config);
  }
}
 
// general requestor
function makeRequest(req, cb, err) {
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


