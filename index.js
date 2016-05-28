var http = require('http');
var port = process.env.PORT || 8080;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var server = http.createServer(function(req, res){
    if (req.method == "GET"){
        var query = req.url.slice(1).replace(/%20/g, " ");
        if (query.length <1){
            res.writeHead(200, {'content-type': 'text/html'})
            res.end("api usage: add / then add a natural language date (e.g. March 14, 1592) or a unix timestamp (e.g -11922249600). Response format is JSON. <br> Github: https://github.com/plover11/fcc-timestamp")
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