var express = require("express"); 
var app = express();
var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

var campgrounds = [
    {name: "Salmon Creek", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1"},
    {name: "Granite Hill", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
    {name: "Sand Mountain", image: "https://europe.huttopia.com/content/uploads/2016/10/Hebergement-camping-canadienne-exterieur-carrousel-768x512.jpg"},
    {name: "Salmon Creek", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1"},
    {name: "Granite Hill", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
    {name: "Sand Mountain", image: "https://europe.huttopia.com/content/uploads/2016/10/Hebergement-camping-canadienne-exterieur-carrousel-768x512.jpg"},
    {name: "Salmon Creek", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1"},
    {name: "Granite Hill", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
    {name: "Sand Mountain", image: "https://europe.huttopia.com/content/uploads/2016/10/Hebergement-camping-canadienne-exterieur-carrousel-768x512.jpg"}
];

app.get("/", function(req, res){
   res.render("landing");  
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
}); 

app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.post("/campgrounds", function(req, res){
    //get data from form 
    var name = req.body.name; 
    var image = req.body.image;
    //add to campgrounds array
    campgrounds.push({name: name, image: image});  
    //redirect back to camprgrounds page. 
    res.redirect("/campgrounds"); 
}); 

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp Server Has Started!!");  
});