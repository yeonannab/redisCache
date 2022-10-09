const path = require('path');
const express = require('express');
const dbConfig = require('./config/database.js');
const ejs  = require('ejs');
const mysql = require('mysql');
const connection = mysql.createConnection(dbConfig);
const redisClient =  require('./redis/redis.js');

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
  redisClient.get('employees', async(err,data) => {
    if (err) console.error(err)
    if (data) {
      // cache hit
      res.json(JSON.parse(data))
      console.log('cache hit')
    } else {
      // cache miss
      console.log('cache miss')

    }
  })
  // const sql = "SELECT * FROM employees limit 10000"
  // connection.query(sql, function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result[0])
  //   // for (let i ) in result
  //   // redisClient.setEx()
  //   // res.render('index', {employees : result})
  // });
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))