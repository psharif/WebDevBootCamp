var express = require("express"); 
var router = express.Router(); 
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder"); 

//INDEX - GET Display a list of all campgrounds 
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err); 
       } else{
           res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
}); 

// NEW - Display Form to CREATE new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// CREATE - New Camground with POST method. 
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form 
    var name = req.body.name; 
    var image = req.body.image;
    var cost = req.body.cost; 
    var description = req.body.description;
    var author = {id: req.user._id, username: req.user.username}
    //console.log(req.user);
    geocoder.geocode(req.body.location, function(err, data){
        if(err){console.log(err)}
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, image: image, cost: cost, description: description, author: author, location: location, lat: lat, lng: lng}; 
        // Create New Campground and save to DB
        Campground.create(newCampground, function(err, newCamp){
            if(err){
                console.log(err); 
            }else{
                req.flash("success", "You Successfully Created A New Campground");
                //redirect back to camprgrounds page. 
                return res.redirect("/campgrounds"); 
            }
        });
    });
}); 

// SHOW - Shows more information about campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err); 
        }else {
            //Find the campgruond with provided ID
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        if(err){console.log(err)}
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
        //Find and update the right campground
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground){
              // redirect to another page.
            if(err){
                res.redirect("/campgrounds"); 
            }else{
                req.flash("success", "Campground Successfully Updated"); 
                return res.redirect("/campgrounds/" + updatedCampground._id);
            }
        });
    });
});

/// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds"); 
        }else{
            res.redirect("/campgrounds"); 
        }
    });
});

module.exports = router; 