  
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var port = process.env.port || 3300

app.listen(port, () => {
    console.log("el puerto esta funcionando");
});

app.use(cors()); 

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST'); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
}); 

require('./routes')(app); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes')();

 
app.use('/api', router);

