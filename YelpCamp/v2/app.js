var express = require("express"),
    app = express(), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'); 

/// Connects to mongodb through mongoose. 
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true}); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String, 
    image: String, 
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create( 
    {
        name: "Granite Hill", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg",
        description: "This is a huge Hill. Lots of Rocks made of Granite."
    }, function(err, campground){
        if(err){
            console.log(err); 
        }else{
            console.log("NEWLY CREATED CAMPGROUND."); 
            console.log(campground); 
        }
});*/


app.get("/", function(req, res){
   res.render("landing");  
});

//INDEX - GET Display a list of all campgrounds 
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err); 
       } else{
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
}); 

// NEW - Display Form to CREATE new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

// CREATE - New Camground with POST method. 
app.post("/campgrounds", function(req, res){
    //get data from form 
    var name = req.body.name; 
    var image = req.body.image;
    var description = req.body.description; 
    
    var newCampground = {name: name, image: image, description: description}; 
    // Create New Campground and save to DB
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err); 
        }else{
            //redirect back to camprgrounds page. 
            res.redirect("/campgrounds"); 
        }
    });
}); 

// SHOW - Shows more information about campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err); 
        }else {
            //Find the campgruond with provided ID
            res.render("show", {campground: foundCampground});
        }
    }); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp Server Has Started!!");  
});