const mongoose = require("mongoose");
const order =  require("./ordermodel");
const payment_model =  mongoose.model({
 
   order_id :{
    type: mongoose.Schema.Types.ObjectId,
    ref:order

   },
   payment_id:{
   type:String,
   }
, amount:{
  type:Number,

   },
  paymnet_method:{
 type:String
   },
   date:{
    type:String,
    default: Date.now()
   },
   success:{
    type:Boolean

   }


})

module.exports = mongoose.model("payment",payment_model);