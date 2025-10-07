import { Router } from "express";
import { productDetails } from "../Models/model.js";
import upload from "../Middleware/upload.js";
import sharp from "sharp";

const admin=Router();

const convertToBase64=(buffer)=>{
	return buffer.toString("base64")
};

admin.post("/addProduct",upload.single("ProductImage"),async(req,res)=>{
   
     console.log('req.body =', req.body);
    // console.log('req.file =', req.file);
    try{
        const { ProductId,
                ProductName,
                Category,
                BrandName,
                PackSize,
                Price,
                Quantity,
                Description  
                //ProductImage                          
        }=req.body        
        
        const result=await productDetails.findOne({productName:ProductName})

        if(result){
            console.log("Product Name already exist");
            res.status(400).json({msg:"Product already exist"})
        }else{
            try{
                let imageBase64=null; //variable declaration

				if(req.file){
					imageBase64=convertToBase64(req.file.buffer)
					//convert the image into base64 
				}
                try{
                    const newProduct=new productDetails({
                                productId:ProductId,
                                productName:ProductName,
                                category:Category,
                                brandName:BrandName,
                                packSize:PackSize,
                                price:Price,
                                quantity:Quantity, 
                                description:Description,                          
                                image:imageBase64
                    })
                    
                    try{
                        await newProduct.save();
                        console.log("Product added");
                        res.status(200).json({msg:"Product added "})
                    }catch(error){
                        console.log("unable to save to db");
                        console.log(error);  
                        res.status(400).json(error)
                        // res.status(400).json({msg:"Unable to add,Check again"})
                    } 
                }catch{
                console.log("error in adding new data");                
            }
            }catch(error){
                console.log(error)
            }
        } 
    }catch(error){
        console.log(error);
    }
})

admin.get('/viewAllProducts',async(req,res)=>{
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

// using query
admin.get('/viewOne',async(req,res)=>{

    try{
        const ProductName=req.query.getProductName;   

        const result=await productDetails.findOne({productName:ProductName})
        if(result){
            console.log(result);   
            res.status(200).json({result})   
        }else{
            console.log("Product name given is not available")
        }
    }catch(error){
        console.log(error);        
    }
})

///using params
admin.get('/getProduct/:id', async (req, res) => {
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


/*** updation using param with value as{ _id} */

admin.put("/updateAll/:id",upload.single("ProductImage"), async(req,res)=>{

    try{
        const id=req.params.id; 
        console.log(id);       

        const { 
                ProductId,
                PackSize,
                Price,
                Quantity,
                Category,
                BrandName,
                Description
            } = req.body;
        
        if (!id) {
            return res.status(400).json({ msg: "Product id missing" });
        }                   
        const result = await productDetails.findOne({ _id: id });

        console.log(result);        
        
        if (result) {
             
            let imageBase64=null; //variable declaration

			if(req.file){
				imageBase64=convertToBase64(req.file.buffer) //convert the image into base64 
			}
            await productDetails.updateOne(
                                { _id: id },
                                {
                                    $set: {
                                        productId: ProductId,
                                        category: Category,
                                        brandName: BrandName,
                                        packSize: PackSize,
                                        price: Price,
                                        quantity: Quantity,
                                        description: Description,
                                        image:imageBase64
                                    }
                                }
                            );                     
        } else {
            console.log("Product not found");
            res.status(404).json({ msg: "Not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
    console.log("Product details Updated");
    res.status(200).json({ msg: "Updated Successfully" });
});

/*** updation using product name */
admin.put("/updateAll",async(req,res)=>{
    try{
        const { ProductId,
                ProductName,
                PackSize,
                Price,
                Quantity,
                Category,
                BrandName,
                Description,                
        }=req.body

        const result=await productDetails.findOne({productName:ProductName})
        // const result=await productDetails.findOne({productName:ProductName})
        if(result){
            await productDetails.updateOne(
                            {productName:ProductName},
                            {$set:
                                {
                                productId:ProductId,                                
                                category:Category,
                                brandName:BrandName,
                                packSize:PackSize,
                                price:Price,
                                quantity:Quantity, 
                                description:Description
                                //     packSize:PackSize,
                                // price:Price,
                                // quantity:Quantity,
                                // category:Category,
                                // brandName:BrandName,
                                // description:Description,
                                // dateofPack:DateofPack,
                                // dateofExpiry:DateofExpiry,
                                // origin:Origin,
                                // fssaiId:FssaiId,
                                // address:Address
                                }})
            console.log("Product details Updated");
            res.status(200).json({msg:"Updated Successfully"})
        }else{
            console.log("The given product name not exist");
            res.status(404).json({msg:"Not found"})            
        }
    }catch(error){
        console.log(error);        
    }
})
// admin.patch("/patch")
/** */

/**using useParams */
admin.delete("/deleteOne/:id",async(req,res)=>{
    try{
        // const{ProductName}=req.body;
        const {id}=req.params;
        console.log(id);

        // const result=await productDetails.findOne({productName:ProductName})
        // const result=await productDetails.findByIdAndDelete(id)
        const result=await productDetails.findOne({productId:id})

        if(result){
            await productDetails.deleteOne({productId:id})
            console.log("Deleted particular document ");
            res.status(200).json({msg:"Document Deleted"})
        }else{
            console.log("Product not found")
            res.status(404).json({msg:"Product not found"})
        }
    }catch(error){
        console.log(error);        
    }
})

admin.delete("/deleteOne",async(req,res)=>{
    try{
        const{ProductName}=req.body;
        const result=await productDetails.findOne({productName:ProductName})
        if(result){
            await productDetails.deleteOne({productName:ProductName})
            console.log("Deleted particular document ");
            res.status(200).json({msg:"Document Deleted"})
        }else{
            console.log("Product not found")
            res.status(404).json({msg:"Product not found"})
        }
    }catch(error){
        console.log(error);        
    }
})
export default admin;
