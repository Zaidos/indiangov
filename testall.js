var http = require('http');
var options = {
  host: 'api.myminister.info',
  path: '/mps.json'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var all = JSON.parse(JSON.parse(str).model);
    for(var n in all){
      console.log(all[n].id)
    }
  });
}

http.request(options, callback).end();