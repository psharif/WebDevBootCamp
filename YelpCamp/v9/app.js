var express = require("express"),
    app = express(), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'),
    passport = require("passport"), 
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");
    //seedDB = require('./seeds');

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"), 
    indexRoutes = require("./routes/index");

/// Connects to mongodb through mongoose. 
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true}); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public")); 

//seedDB();

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

// Requiring Routes
app.use(indexRoutes); 
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp Server Has Started!!");  
});