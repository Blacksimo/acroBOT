var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');



app.use(bodyParser.urlencoded({ extended: false }));

/* app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/GUI.html'));
}); */

app.use(express.static('public'));

app.post("/", function(req,res){
    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    //console.log(Object.keys(req.body).length);
    var data = req.body.first_point + "\n" + req.body.second_point + "\n" + req.body.third_point; 
    console.log(req.body.first_point);
    console.log(req.body.second_point);
    console.log(req.body.third_point);
    fs.writeFile('message.txt', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
});

app.post("/posenet", function(req,res){
    console.log("Ricevuto una richiesta POST image");
    console.log(req.body.image)
    // contenuto della richiesta
    //console.log(Object.keys(req.body).length);
    /* var data = req.body.first_point + "\n" + req.body.second_point + "\n" + req.body.third_point; 
    console.log(req.body.first_point);
    console.log(req.body.second_point);
    console.log(req.body.third_point);
    fs.writeFile('message.txt', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); */
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
