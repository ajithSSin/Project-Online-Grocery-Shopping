import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";

const ProductInfo = ({product,isAdmin}) => {

  const [quantity, setQuantity] = useState(1);
  const navigate=useNavigate();
  
  const addToCart = async () => {
    try {
      const response = await fetch("/api/addCart", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({           
                                    ProductName: product.productName,          
                                    Quantity: quantity,
                                  }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);        
        console.log("Added to cart successfully:");
        alert("Product added to cart!");
      } else {
        alert("Could not add to cart.. Please Login");
        console.error("Failed to add ");
        
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
      alert("Error while adding to cart");
    }
  };

  const buyNow = async () => {  
    
    try {
      
      const response = await fetch("/api/buyNow", {
                                                  method: "POST",
                                                  headers: { 
                                                    "Content-Type": "application/json" 
                                                  },
                                                  body: JSON.stringify({
                                                        ProductName:product.productName,
                                                        Quantity: quantity,
                                                      }),
                                                }
                                );
      if (response.ok) {
        
        const data = await response.json();

        console.log(data); 

        console.log("Order created:");
        
        alert("Place the order");

        navigate(`/buyNow/true`) // -> BNP

      } else {
        
        alert("Error: Unable to create order.. User not Logged in");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong;");
    }
   
  };

  return (   
    
    <div className='grid grid-cols-1
                    sm:grid-cols-1
                    lg:grid-cols-1
                    gap-5 mx-5 my-10' >

      <div className="w-127 h-75 p-2 mt-2 ">
        <span className="text-2xl text font-serif font-bold mb-2">Product Info:</span><br />     
        <span className="text-xl font-serif font-bold mt-2">{"Brand:"}{product.brandName}</span><br />      
        <span className="font-bold mt-2">
          {"Product Name & Size :"}
          {product.productName},{product.packSize}</span><br /> 

        <span className="font-bold mt-2">{"Price in Rs:"}{product.price}</span><br />          
        
        {/**No access to admin */}
        {!isAdmin && (
          <>
            <div className="mt-2">
              <label className="font-bold mr-2">Quantity:</label>
              <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border rounded px-2 w-20"/>
            </div>
            
            {/* Buttons */}
            <div className="mt-2 flex gap-10">
              <button onClick={buyNow}
                      className="bg-red-400 rounded-lg p-2 w-25 h-12 
                                hover:bg-green-400">
                Buy Now
              </button>
              
              <button onClick={addToCart} 
                      className="bg-stone-400 rounded-lg p-2 w-30 h-12 
                                  hover:bg-green-400">
                Add to cart
              </button>
            </div>
          </>
          )
        }
        
      </div>
    </div>     
  );
};

export default ProductInfo;