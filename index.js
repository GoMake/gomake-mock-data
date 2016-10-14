var fs = require('fs');
var path = require('path');
var glob = require('glob');
var pickRandom = require('pick-random');

function getJsonFilesFromFolder(fileFolder) {
	var filePath = `static/${fileFolder}/*.json`; /* */
	var files = glob.sync(filePath, {cwd: __dirname});
	var filesObject = {};
	files.forEach(function(file){
		var basename = path.basename(file, '.json');
		var fileContent = fs.readFileSync(`${__dirname}/${file}`);
		filesObject[basename] = JSON.parse(fileContent);
	});
	return filesObject;
}

function getFilePaths(type) {
  var validTypes = ['seeds'];
  var isValidType = validTypes.indexOf(type) > -1;

  if (isValidType) {
    var files = ['flights', 'telemetry'];
    var filePaths = [];

    var filePaths = files.map(function(file) {
      return `${__dirname}/static/${type}/${file}.json`;
    });
  }
  return filePaths || [];
}

module.exports = {
	_data: {
		telemetry: getJsonFilesFromFolder('telemetry'),
		flights: getJsonFilesFromFolder('flights')
	},
	getFilePaths : getFilePaths,
	get: function(key, filename, count) {
		if(this._data[key]){
			if(count) {
				return pickRandom(this._data[key][filename], {count: count});
			}
			return this._data[key][filename];
		}
		return [];
	}
};

