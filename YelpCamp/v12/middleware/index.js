// all the middleware goes here
var Campground = require("../models/campground"); 
var Comment = require("../models/comment"); 
var middlewareObj = {}; 

middlewareObj.checkCampgroundOwnership = function(req, res, next){
     // Is the user logged in at all 
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground Not Found");
                // Redirects the user to the previous page they were on
                 return res.redirect("back"); 
            }else{
                // Does the user own the campground
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next(); 
                } else {
                    req.flash("error", "You Must Be The Owner To Access That Campground");
                    // Redirects the user to the previous page they were on
                    return res.redirect("back");  
                }
            }
        });
    } else{
        // Redirects the user to the previous page they were on
        req.flash("error", "You Need To Be Logged In To Do That");
        return res.redirect("back"); 
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
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next(); 
                } else {
                    req.flash("error", "You Need To Be Owner To Do That");
                    // Redirects the user to the previous page they were on
                    return res.redirect("back");  
                }
            }
        });
    } else{
        req.flash("error", "You Need To Be Logged In To Do That");
        // Redirects the user to the previous page they were on
        return res.redirect("back"); 
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You Need To Be Logged In To Do That"); 
    res.redirect("/login"); 
}

module.exports = middlewareObj; 