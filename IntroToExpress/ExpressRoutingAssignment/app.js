var express = require("express"); 
var app = express(); 

app.get("/", function(req, res){
    res.send("Hi there, welcome to the assignment");  
});

/* Instructor Solution 
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'"); 
});
*/

app.get("/speak/:animal",function(req, res){
    var animal = req.params.animal;
    res.send("The " + animal + " says " + returnNoise(animal, res)); 
});

app.get("/repeat/:phrase/:numTimes", function(req, res){
    var phrase = req.params.phrase, numTimes = Number(req.params.numTimes); 
    res.send(repeatPhrase(phrase, numTimes)); 
});

app.get("*", function(req, res){
   res.send("Sorry, page not found ... What are you doing with your life?"); 
});

/// (Process.env.PORT is the environment variable for a PORT for the server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started."); 
}); 

/*function returnNoise(animal){
     var animalNoise = ""; 
     switch(animal){
        case "pig":
            animalNoise = "'Oink'"
            break; 
        case "cow": 
            animalNoise = "'Moo'";
            break; 
        case "dog":
            animalNoise = "'Woof'";
            break; 
        default:  
    }
    return animalNoise; 
}*/

function returnNoise(animal, res){
    var animalData = { pig: "'Oink'", 
                       cow: "'Moo'",
                       dog: "'Woof'"};
                       
    return animalData[animal];
}

function repeatPhrase(phrase, numTimes){
    var response = ""; 
   
    for(var i = 0; i < numTimes; i++){
        response += " " + phrase;
    }
    
    return response; 
}