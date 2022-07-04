var http = require('http');
http.createServer(function(req,res){
    res.write("Hello Bitch!");
    res.end();
}).listen(8080);