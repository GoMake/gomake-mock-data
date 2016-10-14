var fs = require('fs');
var path = require('path');
var glob = require('glob');

function getJsonFilesFromFolder(fileFolder) {
	var filePath = `static/${fileFolder}/*.json`; /* */
	var files = glob.sync(filePath, {cwd: __dirname});
	var filesObject = {};
	files.forEach(function(file){
		var basename = path.basename(file, '.json');
		var fileContent = fs.readFileSync(file);
		filesObject[basename] = JSON.parse(fileContent);
		
	});
	return filesObject; 
}

module.exports = {
	telemetry: getJsonFilesFromFolder('telemetry')
}
