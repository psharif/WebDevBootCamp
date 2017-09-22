var express = require('express'); 
/// Execute express and call it app. 
var app = express(); 

//  "/" => 'Hi there!' => HTTP Request (req) and HTTP Response (res)
app.get('/', function(req, res){
    res.send("Hi There"); 
}); 
// "/bye" => 'Goodbye!'
app.get('/bye', function(req, res){
    res.send("Goodbye"); 
});
// "/dog" => 'Meow'
app.get('/dog', function(req, res){
    res.send("Meow"); 
});

// "*" => 'You are a star ***' If user types anything after '/' that is not shown. 
app.get('*', function(req, res){
    res.send("You are a star ***"); 
});
/// (Process.env.PORT is the environment variable for a PORT for the server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started.");
});