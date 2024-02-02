const mongoose = require('mongoose')


var tickerSchema  = mongoose.Schema({
    name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
})


module.exports=mongoose.model('user',tickerSchema )