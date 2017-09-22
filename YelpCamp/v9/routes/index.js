var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var User = require("../models/user"); 


/// Root Route
router.get("/", function(req, res){
   res.render("landing");  
});

// New User Route
router.get("/register", function(req, res){
    res.render("register"); 
});

// Create User Route 
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            /// Short circuits to get out of callback methods 
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds"); 
        });
    });
}); 

// Middleware 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login"); 
}

// Show login form 
router.get("/login", function(req, res){
    res.render("login");
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
   res.redirect("/campgrounds"); 
});

module.exports = router; 