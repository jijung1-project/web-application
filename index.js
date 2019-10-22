let bodyParser = require("body-parser");
let express = require("express");
let http = require('http')
let app = express();
let ejs = require('ejs');
let static = require('serve-static');
let path = require('path');

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('port',3000);
app.use(express.static('uploads'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', require('./router.js'));

http.createServer(app).listen(app.get('port'), function(){
    console.log("express start : %d ", app.get('port'));
});

