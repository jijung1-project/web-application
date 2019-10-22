let bodyParser = require("body-parser");
let express = require("express");
let http = require('http')
let app = express();
let jade = require('jade');
let static = require('serve-static');
let path = require('path');

app.set('view engine', 'html');
app.engine('html', jade.renderFile);
app.set('port',3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', require('./Exercise2_router.js'));

http.createServer(app).listen(app.get('port'), function(){
    console.log("express start : %d ", app.get('port'));
});
