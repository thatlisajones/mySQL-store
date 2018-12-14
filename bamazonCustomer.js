//Dependencies

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//Connect to db created with MySQL Workbench

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
  });

//Show table of products to customer
function displayProducts(answer) {
      var query = "SELECT id, product_name, department_name, customer_cost, stock_qty FROM products";
      connection.query(query,  function(err, res) {
        var displayTable = new Table({
          style: {head: ['green']},
          head: ['id','Product', 'Department', 'Price', 'In stock'],

            colWidths: [10, 25, 25, 10, 10]
          });

          for (var i = 0; i < res.length; i++) {
             displayTable.push(
              [res[i].id, res[i].product_name, res[i].department_name, res[i].customer_cost, res[i].stock_qty]
              );
           }
              console.log(displayTable.toString());


        pickProduct();
      });
}
//Customer chooses product and quantity
function pickProduct(answer) {
    inquirer.prompt([
      {
        name: "item",
        type: "input",
        message: "Type the ID # of the product you want to buy:"
      },
      {
        name: "count",
        type: "input",
        message: "How many would you like to buy?"
      }

      ]).then(function(answer) {
          connection.query("SELECT id, product_name, department_name, customer_cost, stock_qty FROM products WHERE ?",
            {id: answer.item},  function(err, res) {

              //console.log("count " + answer.count);

              if (parseInt(answer.count) > res[0].stock_qty) {

                console.log("Sorry, we have only " + res[0].stock_qty + " in stock.");
                pickProduct();

              }

              else {
                console.log("Your purchase of " + answer.count + ' ' + res[0].product_name +"/s total cost is: $ " + parseInt(res[0].customer_cost) * parseInt(answer.count));
               var quantityLeft = res[0].stock_qty - answer.count;
                      console.log(quantityLeft);
                      connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_qty: quantityLeft
                          },
                          {
                            product_name: answer.item
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                         
                         
                        }); 
                      console.log("Inventory updated. There are " + quantityLeft + " units in stock"); 
                      displayProducts();
               }


            })
      });

}; 