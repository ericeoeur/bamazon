var mysql = require("mysql");
let inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password:"root",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    allData(); 
    connection.end();
  });

 







let allData = function () {

  
    connection.query('SELECT * FROM products', (err, rows) => {
        if (err) throw err;
        var choiceArray = [];

        console.log('Data received from Database:\n');
        console.log("What would you like to purchase on Bamazon? \n"); 


        for (var i = 0; i < rows.length; i++) {
           choiceArray.push(rows[i].product_name + " | $" + rows[i].price);

        let num = 1 + i; 
          
           console.log(num +". "+choiceArray[i]); 

        
        }
        //return choiceArray;






       //console.log("DOES THIS SHIT WORK??" + stupid.id); 
      });
  
    
    };