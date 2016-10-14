var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/post', function(request, response) {
  response.send('finished');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var requestsReceived = 0
var locations = []
var STATUS_OK = 200
var STATUS_USER_ERROR = 422
var INFINITY = 200

var NUM_USERS_EXPECTING = 3

app.get('/grabLocation', function(request, response) {
  console.log(locations)

var lowLat = INFINITY
var highLat = -INFINITY

var lowLon = INFINITY
var highLon = -INFINITY

for (i = 0; i < locations.length; i++) {
  if (lowLat > locations[i].la) {
    lowLat = locations[i].la
  }
  if (highLat < locations[i].la) {
    highLat = locations[i].la

  }

  if (lowLon > locations[i].lo) {
    lowLon = locations[i].lo
  }
  if (highLon < locations[i].lo) {
    highLon = locations[i].lo
  }

}

  console.log("lowlat")
  console.log(lowLat)
  console.log("highlat")
  console.log(highLat)
  console.log("lowLon")
  console.log(lowLon)
  console.log("highLon")
  console.log(highLon)

  midLo = (+lowLon + +highLon)/2
  midLa = (+lowLat + +highLat)/2
  console.log("midlo")
  console.log(midLo)
  console.log("midla")
  console.log(midLa)
  var midPoint = {
    lo: midLo,
    la: midLa
  }
response.send(JSON.stringify(midPoint))

})

app.get('/posts', function(request, response) {
	//console.log(request.query.id)

	var item = {
		lo: request.query.lo,
		la: request.query.la
	}
  console.log(item)

	locations.push(item)

	if (!request.query) {
		response.set('Content-type', 'text/plain')
		response.status(STATUS_USER_ERROR)
		response.send('No input given.')
	} else {
		console.log("reached")
		response.set('Content-type', 'text/plain')
		response.status(STATUS_OK)
		response.send('finished')
	}
})

app.listen(3000)
