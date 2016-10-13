var glob = require('glob-fs')({ gitignore: true });
var fs = require('fs');
var path = require('path');

function getJsonFilesAsObject(fileFolder) {
	var files = glob.readdirSync(`lib/static/${fileFolder}/*.json`, {});
	var filesObject = {};
	files.forEach(function(file){
		var basename = path.basename(file, '.json');
		var fileContent = fs.readFileSync(file);
		filesObject[basename] = JSON.parse(fileContent);
	});
	return filesObject;
}

module.exports = {
	telemetry: getJsonFilesAsObject('telemetry')
}