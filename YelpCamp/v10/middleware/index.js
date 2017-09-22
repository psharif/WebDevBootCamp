// all the middleware goes here
var Campground = require("../models/campground"); 
var Comment = require("../models/comment"); 
var middlewareObj = {}; 

middlewareObj.checkCampgroundOwnership = function(req, res, next){
     // Is the user logged in at all 
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                // Redirects the user to the previous page they were on
                res.redirect("back"); 
            }else{
                // Does the user own the campground
                if(foundCampground.author.id.equals(req.user._id)) {
                    next(); 
                } else {
                    // Redirects the user to the previous page they were on
                    res.redirect("back");  
                }
            }
        });
    } else{
        // Redirects the user to the previous page they were on
        res.redirect("back"); 
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
     // Is the user logged in at all 
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                // Redirects the user to the previous page they were on
                res.redirect("back"); 
            }else{
                // Does the user own the campground
                if(foundComment.author.id.equals(req.user._id)) {
                    next(); 
                } else {
                    // Redirects the user to the previous page they were on
                    res.redirect("back");  
                }
            }
        });
    } else{
        // Redirects the user to the previous page they were on
        res.redirect("back"); 
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login"); 
}

module.exports = middlewareObj; 