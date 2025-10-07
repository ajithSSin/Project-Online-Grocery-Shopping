import { Router } from "express";

import {productDetails} from "../Models/model.js";

const homerouter=Router();


homerouter.get('/productsDisplay',async(req,res)=>{
    try{
        const viewAllProduct=await productDetails.find();
        if(!viewAllProduct){
            console.log("Products not exist");
            res.status(400).json({msg:"Product not exist"})
        }else{
            res.status(200).json(viewAllProduct)
            //console.log(viewAllProduct);            
        }
    }catch(error){
        console.log(error);        
    }
})

///using params
homerouter.get('/getProductInfo/:id', async (req, res) => {
    try {        
        const Id = req.params.id;  
        console.log("Requested-ID:", Id);

        const result = await productDetails.findOne({ _id: Id });
        // console.log(result);        

        if (result) {
            console.log("Result fetched from DB");
            res.status(200).json(result);
        } else {
            console.log("Product with the given ID is unavailable");
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default homerouter;