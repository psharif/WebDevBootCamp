var fake = require('faker'); 

console.log("=========================\n      Product List\n=========================");

for(var i =0; i < 10; i ++){
    console.log(fake.commerce.productName() + " - " + fake.commerce.price()); 
}
