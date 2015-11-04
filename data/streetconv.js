var _ = require('underscore');
var lazy= require('lazy');
var fs = require('fs');

var ulice = [];

lazy(fs.createReadStream('./streets.txt'))
.lines
.map(function (line) {
	var l = line.toString();
	if (l.length < 2) {
		return '';
	}
	var city = l.substr(0, l.indexOf('Bratislava')-1);
	var address = city.split(' ');
	city = l.substr(l.indexOf('Bratislava'));
	switch (address.length) {
		case 1:
			address = [address[0]];
			break;
		case 2:
			address = [address[0], address[1], city];
			break;
		case 3:
			var c = address[1][0];
			if (c === c.toUpperCase()) {
				address = [address[0], [address[1], address[2]].join(' '), city];
			} else {
				address = [[address[0], [address[1]]].join(' '), address[2], city];
			}
			break;
		case 4:
			address = [[address[0], address[1]].join(' '), [address[2], address[3]].join(' '), city];
			break;
	}
	return (address.length === 3) ? address : null;
})
.join(function (ulice) {
	ulice = _.compact(ulice);
	// fs.writeFileSync('ulice.js',JSON.stringify(ulice,null,0),'utf8');
	console.log(ulice);
});
