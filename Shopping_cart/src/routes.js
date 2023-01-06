//routes.js
//this is our simple Nodejs server

//require('dotenv').config(); //instatiate environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  //connectionLimit : CONFIG.db_connectionlimit,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'pointDb'
});

// Starting our app.
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// Creating a POST route that writes data to the 'users_info' table.
app.post('/newUser', function (req, res) {
  console.log(req.body.email);
  console.log(req.body.password)
  console.log(req.body.address);
  console.log(req.body.fullName);

  console.log("at post");

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var gmail = req.body.gmail;
    var password = req.body.password;
    var address =req.body.address;
    var fullName =req.body.fullName;
    connection.query(`INSERT INTO user_info (Name,Gmail,Password,Address) values("${fullName}","${gmail}","${password}","${address}")`, function (error, results, fields) {

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/newUserPointsAccount', function (req, res) {
  console.log(req.body.userId);
  console.log(req.body.totalPoints)
  console.log(req.body.pointsSpent);

  console.log("at post");

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var userId = req.body.userId;
    var totalPoints =req.body.totalPoints;
    var pointsSpent =req.body.pointsSpent;
    connection.query(`INSERT INTO user_points(UserID, TotalPoints, PointsSpent) VALUES ("${userId}","${totalPoints}","${pointsSpent}");`, function (error, results, fields) {

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/addTransaction', function (req, res) {

  console.log("at post");
    console.log
    console.log(req.body.userId);
    console.log(req.body.price);
    console.log(req.body.points);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var userId = req.body.userId;
    var price = req.body.price;
    var points = req.body.points;

    connection.query(`INSERT INTO transactions (UserID, Price, Points) values("${userId}","${price}","${points}")`, function (error, results, fields) {

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});
app.post('/addStoreTransaction', function (req, res) {

  console.log("at post");
    console.log
    console.log(req.body.itemId);
    console.log(req.body.transactionId);
    console.log(req.body.quantity);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var itemId = req.body.itemId;
    var transactionId = req.body.transactionId;
    var quantity = req.body.quantity;

    connection.query(`INSERT INTO store_receipt_items (ItemId, TransactionId, Quantity) values("${itemId}","${transactionId}","${quantity}")`, function (error, results, fields) {

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/addRewardTransaction', function (req, res) {

  console.log("at post");
    console.log
    console.log(req.body.itemId);
    console.log(req.body.transactionId);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var itemId = req.body.itemId;
    var transactionId = req.body.transactionId;

    connection.query(`INSERT INTO reward_receipt (RewardID, TransactionID) values("${itemId}","${transactionId}")`, function (error, results, fields) {

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/updatePointsSpent', function (req, res) {

  console.log("at post for points spent");
    console.log("points spent",req.body.pointsSpent);
    console.log(req.body.userId);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var pointsSpent = req.body.pointsSpent;
    var userId = req.body.userId;
    connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+"${pointsSpent}"
                          WHERE UserID="${userId}"`, function (error, results, fields) {
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID="${userId}"`, function (error, results, fields) {*/
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID=1`, function (error, results, fields) {*/


      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/updateTotalPoints', function (req, res) {

  console.log("at post for points spent");
    console.log("points spent",req.body.pointsRemoved);
    console.log(req.body.userId);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var pointsRemoved = req.body.pointsRemoved;
    var userId = req.body.userId;
    connection.query(`UPDATE user_points SET TotalPoints= TotalPoints-"${pointsRemoved}"
                          WHERE UserID="${userId}"`, function (error, results, fields) {
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID="${userId}"`, function (error, results, fields) {*/
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID=1`, function (error, results, fields) {*/


      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/addToTotalPoints', function (req, res) {

  console.log("at post for adding to total points");
    console.log("points spent",req.body.pointsAdded);
    console.log(req.body.userId);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var pointsAdded = req.body.pointsAdded;
    var userId = req.body.userId;
    connection.query(`UPDATE user_points SET TotalPoints= TotalPoints+"${pointsAdded}"
                          WHERE UserID="${userId}"`, function (error, results, fields) {
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID="${userId}"`, function (error, results, fields) {*/
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID=1`, function (error, results, fields) {*/


      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

app.post('/deleteTransaction', function (req, res) {

    console.log("transactionId",req.body.transactionId);
    console.log(req.body.userId);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var transactionId = req.body.transactionId;
    var userId = req.body.userId;
    connection.query(`DELETE FROM transactions WHERE (TransactionID="${transactionId}" AND UserID="${userId}")`, function (error, results, fields) {
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID="${userId}"`, function (error, results, fields) {*/
    /*connection.query(`UPDATE user_points SET PointsSpent= PointsSpent+2
                      WHERE UserID=1`, function (error, results, fields) {*/


      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});


app.post('/addGasTransaction', function (req, res) {

  console.log("at post");
  console.log(req.body.transactionId);
  console.log(req.body.itemPrice);
  console.log(req.body.itemName);
  console.log(req.body.quantity);

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {
    var transactionId = req.body.transactionId;
    var itemPrice = req.body.itemPrice;
    var itemName = req.body.itemName;
    var quantity = req.body.quantity;

    connection.query(`INSERT INTO gas_receipt (TransactionId,Price,GasType,Gallons) values("${transactionId}","${itemPrice}","${itemName}","${quantity}")`, function (error, results, fields) {

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});
// Creating a GET route that returns data from the 'users_points' table.
app.get('/readPoints', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM user_points', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      console.log("connected");
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});



app.get('/readTransactionIds', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM transactions', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      console.log("connected");
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/readUsers', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM user_info', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      console.log("connected");
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/readPoints so you can see the data.');
 console.log('Go to http://localhost:3000/readUsers so you can see the data.');
 console.log('Go to http://localhost:3000/readTransactionIds so you can see the data.');

});
