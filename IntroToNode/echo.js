/// Node Exercise 

/// Using the Command Line, create a file called "echo.js" 
/// Inside the file write a function named echo that takes 2 arguments: 
/// a string a and a number. It should print out the string the number of times. 

function echo(str, num){
    for(var i = 0; i < num; i++){
        console.log(str); 
    }
}

echo("Echo", 10);
console.log();
echo("Tater Tots", 3); 
