var express = require("express"),
    app = express(), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'),
    passport = require("passport"), 
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require('./seeds');

/// Connects to mongodb through mongoose. 
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true}); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public")); 

seedDB();

/// PASSPORT Configuration 
app.use(require("express-session")({
    secret: "Long Secret For Session", 
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next(); 
}); 




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
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
}); 

// NEW - Display Form to CREATE new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
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

/// ==========================================
//          Comments
// ===========================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //res.send("You Are Trying to create a new comment"); 
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err); 
       } else{
           res.render("comments/new", {campground: foundCampground}); 
       }
    });
}); 

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

// ===========
//Auth Routes
// ===========

app.get("/register", function(req, res){
    res.render("register"); 
});

app.post("/register", function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login"); 
}

// Show login form 
app.get("/login", function(req, res){
    res.render("login");
});

/// Handling login Logic
/// app.post("/login", middleware, callback function)
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp Server Has Started!!");  
});