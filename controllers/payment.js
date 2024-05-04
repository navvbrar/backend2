const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" })
const KEY = process.env.STRIPE_KEY ;

const stripe = require("stripe")(`${KEY}`)
 const YOUR_DOMAIN="https://frontend-six-tau-40.vercel.app"

const payments = async (req,res)=>{
    try{
    const getitems = req.body.getitems
    
 let line_items = [];
 for(i=0;i<getitems.length;i++){
    
   line_items.push ({
    price_data: {
    currency: 'usd',
    product_data: {
      name: getitems[i].product_id[0].name,
    },
    unit_amount: getitems[i].product_id[0].price * 100,
  },
  quantity: getitems[i].quantity,
})  

 }
 console.log(line_items)
const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
   line_items:line_items,
    mode: 'payment',
    automatic_tax: {
        enabled: true,
      },
    success_url: `${YOUR_DOMAIN}/thankyou`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,

})

return res.json({
    success:true,
    id:session.id
})


    }
    catch(err){
        res.json({
            success:false,
            message:"route failed",
            error:err.message
        })
    }
}

module.exports = payments