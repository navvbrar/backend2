const cart = require("../models/cartmodel");
const product = require("../models/product");
const joi = require("joi");
const validation = require("../validation.js/cartvalidation");
const responsehelper = require("../helpers.js/responsehelpers");
const { get } = require("mongoose");

const addtocart = async(req,res,next)=>{
try{
 await validation.addtocart(req.body,res)
const{product_id,size,quantity}=req.body;
  const product_info = await product.findById(product_id);
 if(product_info.stock<quantity){
  return res.json({
    success:false,
    message:"thier is not enough stock"
  })
  
 }

const  item =await  new cart({product_id,user_id:req.body.authuser.id,size,quantity})
  await item.save();
res.status(200).json({
 item,
 success:true 

}) 
}
catch(err){
  return responsehelper.errorresponse(err,res)
}



}






const viewcart = async(req,res,next)=>{
try{
   const getitems = await cart.find({user_id:req.body.authuser.id}).populate("product_id")
   if(!getitems){
   return responsehelper.errorresponse("cart not found ",res)
   }
   let grossprice =0;
   for(let i=0;i<getitems.length;i++){
      grossprice += getitems[i].quantity * getitems[i].product_id[0].price
      
   }
 let tax = (grossprice/100)*13
 tax = parseFloat(tax.toFixed(2))
 let totalprice = grossprice + tax
 
   res.status(200).json({
    success:true,
    getitems,
    totalprice,
    grossprice,
    tax
   })
  }
  catch(err){
    return responsehelper.errorresponse(err,res)
  }


}

const deleteitem=async(req,res,next)=>{
    try{
   const item = await cart.findByIdAndRemove(req.params.id);
   res.status(200).json({
    success:true,
    item
   })
  }
  catch(err){
    return responsehelper.errorresponse(err,res)
  }

}


const updateitem= async(req,res,next)=>{
 try{
  const getcart = await cart.findById(req.params.id).populate("product_id");
  
  const stock = getcart.product_id[0].stock;
  
 
  if(stock<req.body.quantity){
  return res.json({
     success:false,
     message:"not enough stock"
  })

  }
   const item = await cart.findByIdAndUpdate(req.params.id,{quantity:req.body.quantity},{new:true});
   await item.save()
   const fullcart= await cart.find({user_id:req.body.authuser.id}).populate("product_id");
   
   let totalprice =0;
   for(let i=0;i<fullcart.length;i++){
      totalprice += fullcart[i].quantity * fullcart[i].product_id[0].price
      
   }

   console.log(totalprice)
    res.status(200).json({
      success:true,
      item,
      totalprice
    })
 } 
 catch(err){
 return responsehelper.errorresponse(err,res)
 }


}
module.exports={addtocart,viewcart,deleteitem,updateitem}