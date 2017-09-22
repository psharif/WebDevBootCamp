var express = require("express"),
    app = express(), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")
    seedDB = require('./seeds');

/// Connects to mongodb through mongoose. 
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true}); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

seedDB();


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

app.get("/campgrounds/:id/comments/new", function(req, res){
    //res.send("You Are Trying to create a new comment"); 
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err); 
       } else{
           res.render("comments/new", {campground: foundCampground}); 
       }
    });
}); 

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp Server Has Started!!");  
});