const mongo = require('mongodb');
const express = require('express');
const app = express();
const port = 8080;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/clients";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const getclients =  db.db("mydb");
  getclients.collection("clients").find({}).toArray(function(err, result){
	if(err) throw err;
	console.log(result);
	app.get('/api', (req, res) => {
		res.send(result);
		//res.sendFile(__dirname + '/index.html');
	});
  db.close();
  });
});

// app.get('/', (req, res) => {
// 	//res.send('hello world!');
// 	res.sendFile(__dirname + '/index.html');
// });
app.listen(port, (err) => {
	if(err){
		console.log('bugs', err);
	}console.log('all good' + port);
});