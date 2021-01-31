var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.use(function (req, res, next) {
    next();
});



module.exports = {
    app: app,
    server: server
};