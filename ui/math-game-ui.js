var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html')); 
});

app.listen(port, () => {
  console.log("Server is started at port: ", port);
})