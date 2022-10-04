const express = require('express');
const app = express();
const port = 3000;


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("node_practice");
  dbo.collection("cats").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("node_practice");
  dbo.collection("cats").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.email);
    db.close();
  });
});


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => console.log(`app listening on port ${port}!`))
