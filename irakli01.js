// using axios with promises

var axios = require('axios');

var mamund = {};
mamund.url = "https://api.github.com/users/mamund";
mamund.method = "get";

var dret = {};
dret.url = "https://api.github.com/users/dret";
dret.method = "get";

var broken = {};
broken.url = "https://api.github.com/users-broken";
broken.method = "get";


var both = [mamund,dret];

function main() {
  promiseRequests(mamund)
    .then(showResponse)
    .catch(showError);

  promiseRequests(dret)
    .then(showResponse)
    .catch(showError);

  promiseRequests(both)
    .then(showResponse)
    .catch(showError);

  promiseRequests(broken)
    .then(showResponse)
    .catch(showError);    
}

main();

// eof

function showResponse(responses) {
  console.log('results:');
  for(i=0,x=responses.length;i<x;i++) {
    const shortData = slimData(responses[i].data);
    console.log(i,shortData);
  } 
  return responses;
}

function slimData(response) {
  const { id, avatar_url, login } = response; // destructuring
  return { id, avatar_url, login };
}

function showError(err) {
  if(err.response) {
    console.log(err.response.data);
  } else {
    console.log(err);
  }
}

// promise-style requestor
function promiseRequests(req) {
  var list = [];

  if(Array.isArray(req)===false) {
    list.push(axios.request(req));
  }
  else {
    for(i=0,x=req.length;i<x;i++) {
      list.push(axios.request(req[i]));
    }
  }
  
  return axios.all(list);
}
 



