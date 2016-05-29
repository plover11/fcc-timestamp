var http = require('http');
var port = process.env.PORT || 8080;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var server = http.createServer(function(req, res){
    if (req.method == "GET"){
        var query = req.url.slice(1).replace(/%20/g, " ");
        if (query.length <1){
            res.writeHead(200, {'content-type': 'text/html'})
            res.end("<title>Timestamp microservice</title>API usage: url/ then add a natural language date (e.g. March 14, 1592) or a unix timestamp (e.g -11922249600). <br>A valid query returns JSON containing both unix timestamp and natural language date of given string. <br> Examples: https://fccts.herokuapp.com/march%2014%1592, https://fccts.herokuapp.com/-11922249600 <br> JSON: { unix: -11922249600, \"natural\": \"March 1, 1592\" } <br><a href=\"https://github.com/plover11/fcc-timestamp\">View GitHub</a>");
        }
        
        var nd; //convert query to new Date
        if (isNaN(Number(query))){
            nd = new Date(query);
        } else {
            nd = new Date(Number(query)*1000);
        }
        
        var ut = Date.parse(nd)/1000; //unix date
        var datestr; //natural date
        if (isNaN(ut)){
            datestr = null;
        } else {
            datestr = months[nd.getMonth()] + " "
                        + nd.getDate() + ", "
                        + nd.getFullYear();
        }
        
        var dateobj = {
            unix: ut,
            natural: datestr
        }
        
        var jsonstr = JSON.stringify(dateobj);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': jsonstr.length, 
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin":"*"
        });
        res.end(jsonstr);
    }

});

server.listen(port);