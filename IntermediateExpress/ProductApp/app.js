/// Required Libraries and frameworks for app. 
var express = require("express"),
    bodyParser = require("body-parser"),
    fake = require("faker"); 
    
var app = express(); 

/// Sets the body parser to the correct settings.
app.use(bodyParser.urlencoded({extended: true})); 
/// Registers the public directory with express to be able to use in the web app. 
app.use(express.static("public"));
/// Sets EJS as the default view engine for the application.
app.set("view engine","ejs"); 

/// Array to hold products. 
var products = []; 

/// Adds Initial Products to the Home Page, use Faker to create fake products and prices. 
function init(){
   for(var i=0; i < 6; i++){
        var newProduct = { name: fake.commerce.productName(), 
                          price: fake.commerce.price()};
                          
        products.push(newProduct); 
   }
}
/// Initialize App with products from init() function
init(); 

/// Renders the home page of shop website
app.get("/", function(req, res){
    res.render("shop", {products: products}); 
});

/// Adds a new product with POST through a form and then Adds it to product list. 
/// Redirects to home page. 
app.post("/add", function(req, res){
   products.push({name: req.body.name, price: req.body.price + ".00"});  
   res.redirect("/"); 
});

/// Listens to connect to server on environment designated PORT and IP address. 
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Shop Server Has Started");  
});