var fs = require('fs');
const staticPath = '/lib/static/';

function getJsonFileAsObject(filePath) {
	var fileContent = fs.readFileSync(staticPath + filePath);
	return JSON.parse(fileContent);
}

module.exports = {
	telemetry: getJsonFileAsObject('telemetry.json')
}