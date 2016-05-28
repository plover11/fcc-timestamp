var express = require('express');
var port = process.env.PORT || 8080;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var app = express();
app.get('/', function(req, res){
    res.end("Homepage");
})

app.get('/*', function(req, res){
    var query = req.url.slice(1).replace(/%20/g, " ");
    var nd;
    if (isNaN(Number(query))){
        nd = new Date(query);
    } else {
        nd = new Date(Number(query)*1000);
    }
        
    var ut = Date.parse(nd)/1000;
    var datestr;
    if (isNaN(ut)){
        datestr = "null";
    } else {
        datestr = months[nd.getMonth()] + " "
                    + nd.getDate() + ", "
                    + nd.getFullYear();
    }
        
    var dateobj = {
        unix: ut,
        natural: datestr
    }
    console.log(typeof dateobj);
    res.setHeader('Content-Type', 'application/json');
    //res.send({ unix: ut, natural: datestr });
    res.send(JSON.stringify(dateobj));
    //res.end("datestring?");
})

app.listen(port);