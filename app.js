'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
    res.send(getHtml('main'));
});

app.post('/', multer().single('file'), function(req, res, next) {
    res.json({
        size: req.file.size
    });
});

app.listen(app.get('port'), function() {
    console.log('Server up') ;
});

// utils
var htmlCache = {};
function getHtml(name) {
    if(htmlCache.hasOwnProperty(name)) {
        return htmlCache[name];
    } else {
        let filePath = path.join(__dirname, 'assets', name + '.html');
        let html = fs.readFileSync(filePath, 'utf8');
        htmlCache[name] = html;
        return html;
    }
}