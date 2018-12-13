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
  showProducts();
  });

//Show table of products to customer
function showProducts(answer) {
      var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
      connection.query(query,  function(err, res) {
        var showTable = new Table({
          head: ['Item ID', 'Product Name', 'Price', 'Quantity'],

            colWidths: [10, 50, 10, 10]
          });

          for (var i = 0; i < res.length; i++) {
             showTable.push(
              [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
              );
           }
              console.log(showTable.toString());


        pickProduct();
      });
}
//Customer chooses product and quantity
function pickProduct(answer) {
    inquirer.prompt([
      {
        name: "item",
        type: "input",
        message: "Enter the ID of the item you would like to buy"
      },
      {
        name: "count",
        type: "input",
        message: "How many would you like to buy?"
      }

      ]).then(function(answer) {
          connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE ?",
            {item_id: answer.item},  function(err, res) {

              //console.log("count " + answer.count);

              if (parseInt(answer.count) > res[0].stock_quantity) {

                console.log("sorry, there are only " + res[0].stock_quantity + " left");
                pickProduct();

              }

              else {
                console.log("Your purchase of " + answer.count + ' ' + res[0].product_name +"/s total cost is: $ " + parseInt(res[0].price) * parseInt(answer.count));
               var quantityLeft = res[0].stock_quantity - answer.count;
                      console.log(quantityLeft);
                      connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: quantityLeft
                          },
                          {
                            item_id: answer.item
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                         
                         
                        }); 
                      console.log("Inventory updated. There are  " + quantityLeft + "in stock"); 
                      showProducts();
               }


            })
      });

}; 