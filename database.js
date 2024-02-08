const mongoose = require("mongoose");
const URI= "mongodb+srv://navdeepsinghmkt0:4jqf05lZDFwlArzF@cluster1.rfj14h1.mongodb.net/?retryWrites=true&w=majority"
const connectdb = async()=>{
await mongoose.connect(URI,{
    useNewUrlParser:true,
   
    useUnifiedTopology: true,
  
}).then(()=>{
    console.log("connected to database")
 }).catch((err)=>{
  console.log(err)
 })

}
module.exports = connectdb
