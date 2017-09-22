var express = require("express"); 
var router = express.Router(); 
var Campground = require("../models/campground");

//INDEX - GET Display a list of all campgrounds 
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err); 
       } else{
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
}); 

// NEW - Display Form to CREATE new campground
router.get("/new", function(req, res){
   res.render("campgrounds/new"); 
});

// CREATE - New Camground with POST method. 
router.post("/", function(req, res){
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
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err); 
        }else {
            //console.log(foundCampground); 
            //Find the campgruond with provided ID
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
});

module.exports = router; 