import { Router } from "express";
// import{orderModel} from "../Models/orderSchema.js";

import {productDetails,cartList,buyNow,shipment} from "../Models/model.js";

import authenticate from "../Middleware/auth.js";

import usercheck from "../Middleware/user.js";

const user=Router();

user.get("/searchProduct",authenticate,usercheck, async (req,res)=>{
    try{
        const UserName=req.name;
        const ProductName=req.query.searchValue;
        // console.log(`UserName=req.name ${UserName}:${ProductName}`); 
        const result=await productDetails.findOne({productName:ProductName},
                                                { productName: 1,
                                                    packSize:1, 
                                                    price: 1, 
                                                    _id: 0 }
                                                )
        if(result){
            // console.log("available");
            console.log(`ProductName:${result.productName}`);
            res.status(200).json({result})
        }else{
            res.status(404).json({msg:"Product is not available"})
        }       
    }
    catch(error){
        console.log(error);
    }
})


user.get("/viewAll",authenticate,async(req,res)=>{

    try{                
        const result= await productDetails.find({}, 
                                        { productName: 1,
                                            packSize:1, 
                                            price: 1, 
                                            _id: 0 });               
        if(result){
            console.log(result);
            res.status(200).json({result})
        }else{
            res.status(404).json({msg:"Empty collection"})
        }
    }catch(error){
        console.log(error);        
    }
})


// user.post("/addCart",async(req,res)=>{
user.post("/addCart",authenticate,usercheck,async(req,res)=>{
    try{     
         const UserName=req.name;           
            // const UserName="user1";
        // const UserName=req.name;///changed authentication: checks ??

        console.log(UserName);        
        const {ProductName,Quantity}=req.body;
        console.log(ProductName,Quantity);           
        let getQuantity=Quantity, getAmount=0;

        try{
            const result=await productDetails.findOne({productName:ProductName})
            if(result){
                try {
                    if(result.quantity>1 && result.quantity>Quantity){
                        try {
                            const totalAmount=result.price*Quantity;                                
                            // console.log("totalAmount",totalAmount)
                            const addProducts={
                                            productName:result.productName,
                                            category:result.category,
                                            packSize:result.packSize,
                                            price:result.price,
                                            quantity:Quantity,
                                            totalProductPrice:totalAmount,
                                            status:"added"                            
                                        }
                                // console.log("addProducts",addProducts)    
                            const getUser=await cartList.findOne({userName:UserName})
                            // console.log(getUser)
                            if(getUser){
                                console.log("get user in add_cart",getUser);                               
                                const productInCart=getUser.productList; 
                                // console.log(productInCart);
                                // console.log(getUser.productList);                                
                                let getIndex,index = 0 ;
                                let isProductListed=false;
                                productInCart.forEach((value)=>{
                                    // console.log(value.productName==ProductName);                                    
                                    if(value.productName==ProductName){
                                        isProductListed=true;
                                        getIndex = index;
                                        getQuantity+=value.quantity;
                                        getAmount=getQuantity*value.price;
                                    }
                                    index+=1;
                                });
                                try {
                                    if(isProductListed==true){
                                        await cartList.updateOne(
                                            {userName: getUser.userName,
                                            "productList.productName": getUser.productList[getIndex].productName   // pick first or loop
                                            },
                                            { $set: {
                                                    "productList.$.quantity": getQuantity ,
                                                    "productList.$.totalProductPrice": getAmount
                                                }  
                                            }
                                        );
                                        console.log("Updated to Cart"); 
                                        res.status(200).json({msg:"Quantity Updated"})          
                                    }else{
                                        await cartList.updateOne({userName:UserName},
                                                        {$push:
                                                            {productList:addProducts}
                                                        })
                                        console.log("added to cart");
                                        res.status(200).json({msg:"Product added to Cart"})                                                                                                
                                    } 
                                } catch (error) {
                                    console.log(error);
                                    // console.log("error in product check");                                    
                                }
                            }else{
                                const addNewCart=new cartList({
                                                    userName:UserName,
                                                    productList:addProducts
                                                })
                                await addNewCart.save();

                                console.log("Added to cart"); 
                                res.status(200).json({msg:"Product added to Cart"})                                
                            }                            
                        } catch (error) {
                            console.log(error);
                            console.log("error in fetching Username");                                                
                        }                           
                    }else{
                        // let temp=Quantity-result.quantity;
                        // // if(result.quantity!=0){                            
                        // // }                        
                        console.log("Requirement exceeds the available stock ");
                        res.status(404).json({msg:"Requirement exceeds the available stock"})                
                    }                    
                } catch (error) {
                    console.log(error);  
                    console.log("Error in Quantity comparison");                                      
                }            
            }else{
                console.log("Product not exist");
                res.status(404).json({msg:"Product not exist"})
            }  
        }catch(error){
            console.log(error);            
            console.log("error in fetching product name");
            res.status(404).json({msg:"not found"})
        }        
    }catch(error){
        console.log(error);    
    }    
})

// user.get('/viewCart',async(req,res)=>{
    //using req query
// // user.get('/viewCart',authenticate,usercheck,async(req,res)=>{
//     try{
//         const UserName=req.name;
//         const result= await cartList.findOne({userName:UserName});
//         if(result){
//             console.log("fetched from dB");            
//                 res.status(200).json({result})
//         }else{
//                 res.status(404).json({msg:"Empty collection"})
//         }
//     }catch(error){
//         console.log(error);
//         console.log("error in findOne");       
//     }
// })

// using req params
// user.get('/getCart',async(req,res)=>{
    
user.get('/getCartAdd',authenticate,usercheck,async(req,res)=>{
    try{
        const UserName=req.name;
        // const UserName="user1"
        // const UserName=req.params.user;         
        
        const result= await cartList.findOne({userName:UserName});
        if(result){
            console.log("cartList fetched from dB");   
            // console.log(result);
                     
                res.status(200).json(result.productList)
                
                 //res.status(200).json({
                                    //   userName: result.userName,
                                    //   productList: result.productList
                                    // });
        }else{
                res.status(404).json({msg:"Empty collection"})
        }
    }catch(error){
        console.log(error);
        console.log("error in findOne");       
    }
})



user.delete("/deleteOneCart",async(req,res)=>{
// user.delete("/deleteOneCart",authenticate,async(req,res)=>{
    try{        
        const UserName=req.name;
        const{ProductName}=req.body;
        const result= await cartList.findOne({userName:UserName});  
        try{
            if(result){                
                const productInCart=result.productList
                try{
                    if(productInCart){                        
                        for (const value of productInCart){
                            if(ProductName==value.productName){
                                
                                //reference
                            // db.users.updateOne({ _id: 2 },
                            // { $pull: { cart: { productName: "Shoes" } } }
                            //  );
                                await cartList.updateOne({userName:UserName},
                                                {$pull:{productList:
                                                        {productName:ProductName}
                                                    }
                                                }
                                );                            
                            }
                        }
                        console.log("Deleted particular document ");
                        res.status(200).json({msg:"Document Deleted"})
                    }                  
                }catch(error){
                    console.log(error)
                }
            }else{
                console.log("Product not found")
                res.status(404).json({msg:"Product not found"})
            }                
        }catch(error){
            console.log(error);
        }   
    }catch(error){
        console.log(error);        
    }
})

user.post("/buyNow",authenticate,usercheck,async(req,res)=>{

    try{     
        // console.log("am in buynow:");         
        const UserName=req.name;  
        const UserRole=req.role;               
        const {ProductName,Quantity}=req.body;                                 
        
        try{            
            const result=await productDetails.findOne({productName:ProductName})
            if(result){
                try {
                    if(result.quantity>1 && result.quantity>Quantity){
                        try {
                            const totalAmount=result.price*Quantity;                         
                            const addProducts={
                                            productName:result.productName,
                                            category:result.category,
                                            packSize:result.packSize,
                                            price:result.price,
                                            quantity:Quantity,
                                            totalProductPrice:totalAmount,
                                            status:"purchase"                            
                                        }
                            const getUser=await buyNow.findOne({userName:UserName})
                            
                            console.log("getUserDetails:",getUser);
                            console.log(typeof(getUser));                            
                            
                            if(!getUser){
                                console.log("getUser in buy_cart",getUser); 
                                const addNewCart=new buyNow({
                                                    userName:UserName,
                                                    productList:addProducts
                                                })
                                await addNewCart.save();
                                console.log("Added to cart"); 
                                res.status(200).json({msg:"Product added to Cart"})    
                            }else{
                                    const productInCart=getUser.productList;
                                    console.log("product in existing user",productInCart);
                                    
                                    await buyNow.updateOne({userName:UserName},
                                                                {$set:{productList:[]                                                                        
                                                                    }
                                                                }
                                                            );

                                                                        
                                    try {
                                        if(productInCart){ 
                                           for (const value of productInCart){
                                                if(ProductName==value.productName){
                                                    // console.log("checking product in cart,");   

                                                    /*deleting the existing cart using update and pull*/
                                                    await buyNow.updateOne({userName:UserName},
                                                                {$pull:{productList:
                                                                        {productName:ProductName}
                                                                    }
                                                                }
                                                            );
                                                    console.log("existing product deleted");                                                            
                                                }
                                           }
                                        }                                        
                                    } catch (error) {
                                        console.log("unable to pull from cart");  
                                        console.log(error);                                                                              
                                    }
                                    await buyNow.updateOne({userName:UserName},
                                                        {$push:
                                                            {productList:addProducts}
                                                        })                                    
                                    console.log("Existing User: New product added to Buycart");
                                    res.status(200).json({msg:"Product added to Buy Cart"})                                                                                                
                                }
                        }catch(error){
                            console.log("add product error");                                                        
                            console.log(error);
                        }
                    }
                }catch(error){
                    console.log("result check or quantity comparison error");  
                    req.status(400).json({msg:"Quantity exceeds"})                  
                    console.log(error);                    
                }
            }else{
                console.log("empty collection ")
            }
        }catch(error){
            console.log("fetch productName error");            
            console.log(error);           
        }
        // console.log("findOne {userName:UserName}",UserName);        
        // const resultDisplay= await buyNow.findOne({userName:UserName});
        // console.log(typeof(resultDisplay));
        // console.log(resultDisplay);      
        // if(resultDisplay){

        //     console.log("cartList fetched from dB");           
        //     res.status(200).json({msg:"Added to buyNow"})
        // }  

    }catch(error){
        console.log("declaration error");
        console.log(error);      
    }      
});

user.get('/getCartBuy',authenticate,usercheck,async(req,res)=>{
    try{
        const UserName=req.name;
        // const UserName="user1"
        // const UserName=req.params.user;         
        
        const result= await buyNow.findOne({userName:UserName});
        if(result){
            console.log("Product grabbed from dB");   
            // console.log(result);
                     
                res.status(200).json(result.productList)
                
                 //res.status(200).json({
                                    //   userName: result.userName,
                                    //   productList: result.productList
                                    // });
        }else{
                res.status(404).json({msg:"Empty collection"})
        }
    }catch(error){
        console.log(error);
        console.log("error in findOne");       
    }
})

// user.post("/placeOrder", async(req,res)=>{
user.post("/placeOrder",authenticate,async(req,res)=>{
    try{
        const UserName=req.name;
        console.log(UserName);
            // try{
        const {Location,
                    Zipcode,
                    Instruction,
                    Mode_of_Payment}=req.body;

        let payStats="pending";

                // try {
        if(Mode_of_Payment=="Credit/Debit"||Mode_of_Payment=="UPI"){
                        payStats="completed"
        }   
                    // console.log(payStats)  

                    // try {

        const result=await cartList.findOne({userName:UserName});
                    
        if(result){       
            console.log("in result check of cart list ",result);      
            const productInCart=result.productList;
                            
            // try {
            if(productInCart ||!productInCart.length === 0){  
                            
                //console.log("product avail",productInCart); 
                let setAmount=0,setItems=0;
                let getproductList=[]; 
                for (const value of productInCart) {
                                    /** updating the quantity in product list when order is placed */
                    const getProduct = await productDetails.findOne({ 
                                        productName: value.productName });
                    if (!getProduct){
                        unavailableProducts.push({
                                        productName: value.productName,
                                        reason: "Product not found"
                                        });
                        continue;
                    }
                    const getQuantity = getProduct.quantity;
                    const setQuantity = getQuantity - value.quantity;

                    if (setQuantity < 0){
                        unavailableProducts.push({
                                        productName: value.productName,
                                        reason: `Only ${getQuantity} left in stock`
                                        });
                        continue;
                    }
                    await productDetails.updateOne({ productName: value.productName },
                                                    { quantity: setQuantity });
                    console.log(`Updated: ${value.productName}, new stock: ${setQuantity}`);
                                
                    getproductList.push({getproductName: value.productName,
                                                    getquantity: value.quantity});

                    console.log("Final product array:", getproductList);
                    setAmount+=value.totalProductPrice
                    setItems+=1;
                }

                                    /**To save order */
                if(setItems>0){
                    const addDetails=new shipment({
                                        userName:result.userName,
                                        orderDate: new Date(),
                                        paymentMode:Mode_of_Payment,
                                        paymentStats:payStats,
                                        orderStats:"confirmed",
                                        items:setItems,
                                        totalAmount:setAmount,
                                        address:{
                                                location:Location,
                                                zipcode:Zipcode
                                                },
                                        instruction:Instruction                    
                                    })           
                            
                    await addDetails.save();    

                    await cartList.deleteOne({userName:UserName})
                                
                    console.log("Order placed Confirm");                    
                    res.status(201).json({message: "Order Placed Successfully",
                                                    TotalItems: setItems,
                                                    ProductList: getproductList,
                                                    TotalAmount: setAmount,
                                                    unavailableProducts});
                }else{
                    return res.status(400).json({message: "No products available ",
                                                        unavailableProducts});
                }                                  
            }else{
                console.log("Empty cart")
                return res.status(400).json({ message: "Cart is empty" })
            }
                            
                            // } catch (error) {
                            
                            // }
                        
        }else{
            console.log("Invalid entry: Items not in Cart")
            res.status(400).json({msg:"Items not in cart"})
        }
        res.status(200).json({msg:"Order placed"}) 
                        
                // } catch (error) {
                //     console.log("cart list chek error");  
                //      res.status(400).json({msg:"cart list error"}) 
                // }   
            // } catch (error) {
            //     console.log("get payment mode error");         
                
            // }
        // }catch(error){
        //     console.log(error);
        //     console.log("geterror"); 
        //     res.status(400).json({msg:"error"})          
        // } 
    }catch(error){
        console.log(error);       
        res.status(400).json({msg:"ord"}) 
    }
        
});

user.post("/placeOrderBuy",authenticate,async(req,res)=>{
    try{
        const UserName=req.name;
        console.log(UserName);
            // try{
        const {Location,
                    Zipcode,
                    Instruction,
                    Mode_of_Payment}=req.body;

        let payStats="pending";

                // try {
        if(Mode_of_Payment=="Credit/Debit"||Mode_of_Payment=="UPI"){
                        payStats="completed"
        }   
                    // console.log(payStats)  

                    // try {
                    
        const result=await buyNow.findOne({userName:UserName});
                    
        if(result){       
            console.log("in result check of cart list ",result);      
            const productInCart=result.productList;
                            
            // try {
            if(productInCart ||!productInCart.length === 0){  
                            
                //console.log("product avail",productInCart); 
                let setAmount=0,setItems=0;
                let getproductList=[]; 
                for (const value of productInCart) {
                                    /** updating the quantity in product list when order is placed */
                    const getProduct = await productDetails.findOne({ 
                                        productName: value.productName });
                    if (!getProduct){
                        unavailableProducts.push({
                                        productName: value.productName,
                                        reason: "Product not found"
                                        });
                        continue;
                    }
                    const getQuantity = getProduct.quantity;
                    const setQuantity = getQuantity - value.quantity;

                    if (setQuantity < 0){
                        unavailableProducts.push({
                                        productName: value.productName,
                                        reason: `Only ${getQuantity} left in stock`
                                        });
                        continue;
                    }
                    await productDetails.updateOne({ productName: value.productName },
                                                    { quantity: setQuantity });
                    console.log(`Updated: ${value.productName}, new stock: ${setQuantity}`);
                                
                    getproductList.push({getproductName: value.productName,
                                                    getquantity: value.quantity});

                    console.log("Final product array:", getproductList);
                    setAmount+=value.totalProductPrice
                    setItems+=1;
                }

                                    /**To save order */
                if(setItems>0){
                    const addDetails=new shipment({
                                        userName:result.userName,
                                        orderDate: new Date(),
                                        paymentMode:Mode_of_Payment,
                                        paymentStats:payStats,
                                        orderStats:"confirmed",
                                        items:setItems,
                                        totalAmount:setAmount,
                                        address:{
                                                location:Location,
                                                zipcode:Zipcode
                                                },
                                        instruction:Instruction                    
                                    })           
                            
                    await addDetails.save();    

                    await buyNow.deleteOne({userName:UserName})
                                
                    console.log("Order placed Confirm");                    
                    res.status(201).json({message: "Order Placed Successfully",
                                                    TotalItems: setItems,
                                                    ProductList: getproductList,
                                                    TotalAmount: setAmount,
                                                    unavailableProducts});
                }else{
                    return res.status(400).json({message: "No products available ",
                                                        unavailableProducts});
                }                                  
            }else{
                console.log("Empty cart")
                return res.status(400).json({ message: "Cart is empty" })
            }
                            
                            // } catch (error) {
                            
                            // }
                        
        }else{
            console.log("Invalid entry: Items not in Cart")
            res.status(400).json({msg:"Items not in cart"})
        }
        res.status(200).json({msg:"Order placed"}) 
                        
                // } catch (error) {
                //     console.log("cart list chek error");  
                //      res.status(400).json({msg:"cart list error"}) 
                // }   
            // } catch (error) {
            //     console.log("get payment mode error");         
                
            // }
        // }catch(error){
        //     console.log(error);
        //     console.log("geterror"); 
        //     res.status(400).json({msg:"error"})          
        // } 
    }catch(error){
        res.status(400).json({msg:"ewrror"})  
        console.log(error);       
    }
       
});

export default user;