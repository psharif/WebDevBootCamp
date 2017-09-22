var express = require('express'); 
var app = express(); 
var request = require('request'); 

app.set("view engine", "ejs"); 

app.get("/", function(req, res){
    res.render("search");
}); 

app.get("/results", function(req, res){
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + search + "&apikey=thewdb";
    request(url, function(error, response, body){
       var parsedResponse = JSON.parse(body);
       if(parsedResponse["Error"]){
           res.render("noresults"); 
           return; 
       }
       if(!error && response.statusCode == 200){
           res.render("results", {parsed: parsedResponse}); 
       } 
    });     
}); 


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Has Started");  
});