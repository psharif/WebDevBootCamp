var mongoose = require('mongoose'); 

/// Looks for or makes a cat database 
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});

/// Defines a cat schema in mongo db using mongoose. 
var catSchema = mongoose.Schema({
    name: String, 
    age: Number, 
    furColor: String
});

/// Use schema for cat to create a model. Now we can use Cat and it's 
/// methods like .find(), .remove(), etc. 
var Cat = mongoose.model("Cat", catSchema); 


/// Creates a Cat with the the same Schema
var newCat = new Cat({
    name: "Smooth", 
    age: 4, 
    furColor: "None"
}); 

/// Saves the Cat to the DB using .save() on the created Cat object
newCat.save(function(err, cat){
     if(err){
        console.log("Something went Wrong with Save."); 
    }
    else{
        console.log("Cat was saved to DB: "); 
        console.log(cat); 
    }
});


/// Adding a new cat to the db using .create() method. 
Cat.create({
    name: "Richy", 
    age: 2, 
    furColor: "White"
}, function(err, cat){
    if(err){
        console.log("Something went Wrong with Create."); 
    }
    else{
        console.log("Cat was created and saved to DB: "); 
        console.log(cat); 
    }
});


Cat.find({}, function(err, cats){
    if(err){
        console.log(err)
    }
    else{
        console.log(cats); 
    }
}); 
