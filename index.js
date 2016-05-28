var http = require('http');
var port = process.env.PORT || 8080;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var server = http.createServer(function(req, res){
    if (req.method == "GET"){
        var query = req.url.slice(1).replace(/%20/g, " ");
        //query = query.slice(1);
        //query = query.replace(/%20/g, " ");
        var nd;
        if (isNaN(Number(query))){
            nd = new Date(query);
        } else {
            nd = new Date(Number(query)*1000);
        }
        
        var ut = Date.parse(nd)/1000;
        var datestr;
        if (isNaN(ut)){
            datestr = null;
        } else {
            datestr = months[nd.getMonth()] + " "
                        + nd.getDate() + " "
                        + nd.getFullYear();
        }
        
        var dateobj = {
            unix: ut,
            natural: datestr
        }
        
        
        //res.json(dateobj);
        //res.write(dateobj);
        //dateobj.pipe(res);
        //req.pipe(res);
        var a = JSON.stringify(dateobj);
        var len = a.length;
        console.log(len);
        console.log(a);
        console.log(typeof a);
        console.log(typeof dateobj);
        console.log(typeof (typeof dateobj));
        //console.log(req.headers);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': len, 
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin":"*"
        });
        res.end(JSON.stringify(dateobj));
    }

});

server.listen(port);