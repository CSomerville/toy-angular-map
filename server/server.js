var fs = require('fs');
var express = require('express');
var morgan = require('morgan')

var app = express();

app.use(morgan('dev'))
app.use(express.static('app'));

app.get('/', function(req, res){
  fs.readFile('./app/index.html', 'utf8', function(err, data){
    res.send(data);
  })
})

app.listen(3000, function(){
  console.log('listening')
})