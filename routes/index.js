
var express = require('express');
var router = express.Router();
var Ticker=require('./data');
const mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios=require('axios');


mongoose.connect('mongodb://0.0.0.0/wazirx').then(result => {
  console.log("Connected to database")
}).catch(err => {
  console.log(err)
})



const fetchDataAndStoreInDatabase = async () => {
  try {
    // Fetch data from the API
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;

    // Extract top 10 tickers
    const top10Tickers = (Object.values(tickers).slice(0, 10));

    // Insert data into the MongoDB collection
    await Ticker.insertMany(top10Tickers);

    console.log('Data stored in the database successfully!');
  } catch (error) {
    console.error('Error fetching and storing data:', error.message);
  }
};
fetchDataAndStoreInDatabase();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Retrieve data from the MongoDB collection
    const data = await Ticker.find();

    // Send the data to the frontend
    res.render('index',{data});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

// async function getPosts(){
//   const myData=await fetch("https://api.wazirx.com/api/v2/tickers");
//   const response=await myData.json();
//   console.log(response['btcinr']);
//   // for(let i=0;i<10;i++){
//   //   console.log(response[i]);
//   // }
 
// }
// getPosts();

module.exports = router;
