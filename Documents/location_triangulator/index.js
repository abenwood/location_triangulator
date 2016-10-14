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

//===============================================================
//var express        =        require("express");
//ar bodyParser     =        require("body-parser");
//var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

var requestsReceived = 0
var locations = []
var STATUS_OK = 200
var STATUS_USER_ERROR = 422
var INFINITY = 200

var NUM_USERS_EXPECTING = 3

app.get('/grabLocation', function(request, response) {
  console.log(locations)

  /**<html>

    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />        title>Triangulator </title>
        <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
    </head>

    <body>
        <div id="map" style="width: 1000px; height: 1000px;"></div>
        <script type="text/javascript"> */
/*
var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

var infowindow = new google.maps.InfoWindow();

var marker, i;
var bound = new google.maps.LatLngBounds();

//console.log(test);

for (i = 0; i < locations.length; i++) {
  bound.extend( new google.maps.LatLng(locations[i][2], locations[i][3]) );

}

console.log( bound.getCenter() lahok); */

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
	//response.send(JSON.stringify(locations))
  //response.json({notes: "This is your notebook. Edit this to start saving your notes!"})
})


/*
*		request.query.id
*/
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
