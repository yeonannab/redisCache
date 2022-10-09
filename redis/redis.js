const redis = require("redis");
const redisClient =  redis.createClient({legacyMode: true});
const redisConfig = require('../config/redis.js');


redisClient.on("error", (err) => {
    console.log(err);
  });
  redisClient.on("ready", ()=> {
    console.log("redis is ready")
  })
  redisClient.connect().then(()=> {
    redisClient.auth(redisConfig);
  
  }).catch((err)=>{
    console.log(err);
  });

module.exports = redisClient;