var mysql = require("mysql");
let inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    allData();
    //prompt(); 

    connection.end();
});


let prompt = function () {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "Please enter the ID number of the product you would like to purchase."
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          'SELECT * FROM products', (err, rows) => 
          { if (err) throw err; 
            console.log("This is a test! I hope this works");
           
          },
          function(err) {
            if (err) throw err;
            console.log("This is a test!");
    
          }
        );
      });
  }




let allData = function () {

    connection.query('SELECT * FROM products', (err, rows) => {
        if (err) throw err;
        var choiceArray = [];

        console.log('Data received from Database:\n');
        console.log("What would you like to purchase on Bamazon? \n");


        inquirer.prompt([
            {
              name: "choice",
              type: "input",
              choices: function() {
                
                for (var i = 0; i < rows.length; i++) {
                    choiceArray.push(rows[i].product_name + " | $" + rows[i].price);
        
                    let num = 1 + i;
                    console.log(num + ". " + choiceArray[i]);
                }
                return choiceArray;
              },
              message: "Please enter the item number you would like to purchase."
            },
            {
              name: "quantity",
              type: "input",
              message: "How many would you like to purchase??"
            }
          ]).then(answers => {
                
                //console.log(JSON.stringify(answers, null, '  '));
                
                //console.log(answers.choice);
                //console.log(answers.quantity); 
                let num = 1; 
                let chosenNumParsed = parseInt(answers.choice); 
                let chosenNumber = chosenNumParsed - num; 
                let chosenQuantity = parseInt(answers.quantity);
               
                console.log("\nThis is the product you have chosen: " + rows[chosenNumber].product_name
                + " and you are wanting to buy " + chosenQuantity + " of them.\n" );



            //var chosenItem;


            /*
            console.log("This is the answer.name " + peanut);
            for (var i = 0; i < rows.length; i++) {
              if (rows[i].product_name === answer.choice) {
                chosenItem = rows[i];
                console.log("This is the answer: " + chosenItem); 
              }
            } */
           
    
          
          });

 /*
        for (var i = 0; i < rows.length; i++) {
            choiceArray.push(rows[i].product_name + " | $" + rows[i].price);

            let num = 1 + i;
            console.log(num + ". " + choiceArray[i]);
        }

        */



    });

};