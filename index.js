var express = require('express');
var app = require('./server').app;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRoutes = require('./api/routes');
var cors = require('cors');
var http = require('./server').server;

var port = process.env.PORT || 3000;
app.set("port", port);

app.use(cookieParser());
app.use(cors());


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const sourceDir = 'client/dist';

app.use(express.static(sourceDir));



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use('/api', apiRoutes);

http.listen(app.get('port'), '0.0.0.0');