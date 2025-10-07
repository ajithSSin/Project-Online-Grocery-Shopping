import mongoose from "mongoose";

import { Schema,model } from "mongoose";

const addUser=new Schema({
            firstName:String,
            lastName:String,
            userName:{type:String,required:true,unique:true},
            password:String,
            userRole:{type:String,enum:['admin','user'],required:true}
})
const signUp=model('userDetails',addUser);

const productSchema=new Schema({
                productId:{type:String,required:true,unique:true},
                productName:{type:String,required:true,unique:true},
                category:String,
                brandName:String,
                packSize:{type:String,required:true},
                price:{type:Number,required:true},
                quantity:{type:Number,required:true}, 
                description:String,                                
                image:String
            })
            
const productDetails=model('new_productDetails',productSchema)

const addproduct=new Schema({ 
    product:[{
                    // productId: { type: String, required: true },
                    productName: { type: String, required: true },
                    quantity: { type: Number, required: true, min: 1 },
                    price: { type: Number, required: true },
                    totalProductPrice: { type: Number, required: true },
                    category: String 
    }]
})
const productList=model("productlist",addproduct)

const addCart=new Schema({
        userName: { type: String, required: true },
        productList:Array
})
const cartList=model("carts",addCart);

const grab=new Schema({
        userName:{type:String, required:true},
        productList:Array
})
const buyNow=model("purchase",grab)
   

const shipCart=new Schema({
                    userName:{type:String, required:true},
                    orderDate:Date,
                    paymentMode:{type:String,required:true},
                    paymentStats:String,
                    orderStats:String,
                    items:Number,
                    totalAmount:Number,
                    address:{
                            location:{type:String, required:true},
                            zipcode:{type:String, required:true}
                        },
                    instruction:String                    
                    }) ;
const shipment=model("userorderdetails",shipCart)

export {signUp,productList,productDetails,cartList,buyNow,shipment};