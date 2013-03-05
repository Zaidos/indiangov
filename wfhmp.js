var http = require('http');
var fs = require('fs');
var ids = [];
var attendances = [];
var data = {};
var nameData = {};

function getMpAttendance(mpid, length){
var options = {
  host: 'api.myminister.info',
  path: '/mps/'+ mpid +'.json'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var mpProfile = JSON.parse(JSON.parse(str).mpProfile);
    var attendance = mpProfile.mp_statistic.attendance;
    if(attendance == 0){

      console.log(mpid);
      console.log(mpProfile.name);
      
      var state_name = mpProfile.state_name.replace(/ /g,'');

      

      if(data.hasOwnProperty(state_name)){
        data[state_name] ++;
        nameData[state_name] = nameData[state_name] + ';' + mpProfile.name;
      }
      else{
        data[state_name] = 1;
        nameData[state_name] = mpProfile.name;
      }
    }
    //console.log(attendance);
    attendances.push(attendance);
    if(mpid == length){
      writeToDataFile(data,'test');
      writeToDataFile(nameData, 'names');
    }
  });
}
setTimeout(function(){},0);
http.request(options, callback).end();
}

function getMpIds(){
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
      //console.log("MP number : " + all[n].id + "/n");
     //ids.push(all[n].id);
     getMpAttendance(all[n].id, all.length);
    }
  });
}

http.request(options, callback).end();
}

function writeToDataFile(data, name){

  fs.writeFile("/users/anandviswanathan/Documents/code/indiangov/" + name + ".js", JSON.stringify(data), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
}

getMpIds();



