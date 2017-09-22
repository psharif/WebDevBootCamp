var express = require("express"); 
var router = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// Comments New Route
router.get("/new", isLoggedIn, function(req, res){
    //res.send("You Are Trying to create a new comment"); 
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err); 
       } else{
           res.render("comments/new", {campground: foundCampground}); 
       }
    });
}); 

// Comments Create Route 
router.post("/", isLoggedIn, function(req, res){
   // lookup campground using id
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err); 
           res.redirect("/campgrounds");
       }else{
           // create new comment
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err); 
               }else{
                   // connect new comment to campground
                   campground.comments.push(comment); 
                   campground.save(); 
                   // redirect to show page. 
                   res.redirect("/campgrounds/" + campground._id); 
               }
           }); 
       }
   });
});

/// MiddleWare
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login"); 
}

module.exports = router; 