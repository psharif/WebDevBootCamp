var mongoose = require('mongoose'); 
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Desert Peak", 
        image: "http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Farmers Park", 
        image: "http://www.thatsnotcamping.com/wp-content/uploads/2012/02/Riverdale-Farm-Campsites.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Owl Creek", 
        image: "http://www.reinhardt.edu/Current-Students/images/tentfoot.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },    
    {
        name: "Trekkers Spot", 
        image: "http://www.lakechalasafarilodge.com/images/uploads/Lake-Chala-Campsite-No3.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }    
];

function seedDB(){
    /// Remove all campgrounds 
    Campground.remove({}, function(err){
        //     if(err){
        //         console.log(err); 
        //     }
        //     console.log("Removed Campgrounds");
            
        //     //Add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err);
        //             }else {
        //                 console.log("added a campground"); 
        //                 /// create A Comment
        //                 Comment.create(
        //                     {
        //                         text: "It's a great place to be.",
        //                         author: "Homer"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err); 
        //                         }else{
        //                             campground.comments.push(comment); 
        //                             campground.save(); 
        //                             console.log("Created New Comment."); 
        //                         }
        //                       }
        //                 );
        //             }
        //         });
        //     });
         });
}

module.exports = seedDB; 