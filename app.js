var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');
var apiKey = '90bc1bc54a463389bfd0d1c93344976d';

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/reports', function(req, res) {
  res.render("reports");
});

app.get('/reports/:location', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q='+request.params.location + '&appid=' + apiKey, function(res){ 
    var body = "";
    res.on('data', function(d){
      body += d;
    });
    res.on('end', function(){
      var locationReport = JSON.parse(body);
      response.send(locationReport);
    });
  });
});

app.listen('3000', function() {
  console.log('Serving on port 3000');
})

