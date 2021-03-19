var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(function(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})
app.use('/public', express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:false}));

console.log("Hello World");

app.get('/', (req, res)=>{
  // res.send('Hello Express');
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res)=>{
  if(process.env.MESSAGE_STYLE === 'uppercase'){
    res.json({"message": "HELLO JSON"});
  }
  else{
    res.json({"message": "Hello json"});  
  }
});

app.get('/now', function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.json({"time": req.time});
});

app.get('/:word/echo', (req, res)=>{
  res.json({"echo":req.params.word});
});

app.get('/name', (req, res)=>{
  res.json({"name": req.query.first + " " + req.query.last});
});

app.post('/name', (req, res)=>{
  var string = req.body.first + " " + req.body.last;
  res.json({name: string});
});




 module.exports = app;
