const path = require('path');
const express = require('express');
const dbConfig = require('./config/database.js');
const ejs  = require('ejs');
const mysql = require('mysql');
const connection = mysql.createConnection(dbConfig);
const redis = require("redis");
const redisClient = redis.createClient({url: `redis://127.0.0.1:6379`});

const port = 3000;

const app = express();

// configuration
app.set('view engine', 'ejs');
app.set('views', './view');
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'html/form.html')))


// get data from MySQL
app.get('/employees', (req, res) => {
  const sql = "SELECT * FROM employees limit 100000"
  console.time();
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('index', {employees : result})
  });
  console.timeEnd();
})

// get data from Redis
app.get('/employeesCached', (req, res)=> {
  const sql = "SELECT * FROM employees limit 10000"
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0])
    // for (let i ) in result
    // redisClient.setEx()
    // res.render('index', {employees : result})
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))