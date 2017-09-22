var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var User = require("../models/user");
var Campground = require("../models/campground"); 
var middleware = require("../middleware");



/// Root Route
router.get("/", function(req, res){
   res.render("landing");  
});

// New User Route
router.get("/register", function(req, res){
    res.render("register", {page: 'register'}); 
});

// Create User Route 
router.post("/register", function(req, res){
    
    var newUser = new User({
        username: req.body.username, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        avatar: req.body.avatar
    });
    
    if(req.body.adminCode ==='adminpw'){
        newUser.isAdmin = true; 
    }
    
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message); 
            /// Short circuits to get out of callback methods 
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            console.log(user);
            req.flash("success", "Welcome To YelpCamp " + user.username);
            return res.redirect("/campgrounds"); 
        });
    });
}); 

// Show login form 
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

/// Handling login Logic
/// router.post("/login", middleware, callback function)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res){
});

//Logout Route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You Logged Out"); 
   return res.redirect("/campgrounds"); 
});

router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
       if(err){
           req.flash("error", "Something Went Wrong");
           /// Takes User back to Landing Page
           return res.redirect("/"); 
       } else{
           Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
                 if(err){
                    req.flash("error", "Something Went Wrong");
                    /// Takes User back to Landing Page
                    return res.redirect("/");
                 } else{
                    res.render("users/show", {user: foundUser, campgrounds: campgrounds}); 
                 }
               
           });
       }
    });
});

module.exports = router; 