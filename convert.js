var fs = require('fs');
var gpData = {};
var gpNameData = {};

function Convert(){
	
	var jsonVectMap = JSON.parse(fs.readFileSync('jsonVectMap.js'));
	var jsonMpMap = JSON.parse(fs.readFileSync('test.js'));
	var jsonMpNameMap = JSON.parse(fs.readFileSync('names.js'));
	var vectMapKeys = Object.keys(jsonVectMap.paths);
	var count = vectMapKeys.length;

	vectMapKeys.forEach(function(key){
		
		var valuetmp = jsonMpMap[jsonVectMap.paths[key].name.replace(/ /g,'')];
		
		count--;
		gpData[key] = valuetmp ? valuetmp : 0;

		var valuetmpName = jsonMpNameMap[jsonVectMap.paths[key].name.replace(/ /g,'')]
		
		gpNameData[key] = valuetmpName ? valuetmpName : "";

		 if(count == 0){
		 	writeToDataFile(gpData, 'gpData');
		 	writeToDataFile(gpNameData, 'gpNameData');
		 }

	});
	//console.log(Object.keys(jsonVectMap.paths));
	console.log(jsonMpMap);
}

function writeToDataFile(data, name){

	fs.writeFile("/users/anandviswanathan/Documents/code/indiangov/"+ name+ ".js", 'var ' + name +' =' + JSON.stringify(data), function(err) {
	    
	    if(err) {
	        console.log(err);
	    } 
	    else {
	        console.log("The file was saved!");
	    }
	});
}

Convert();