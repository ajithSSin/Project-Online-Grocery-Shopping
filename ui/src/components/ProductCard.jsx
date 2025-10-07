import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import alt from "../assets/images/BreakfastCereals.png"


const ProductCard = ({ product, onDelete, isAdmin }) => {

    const navigate = useNavigate()

  return (        
        <div className=" w-60 rounded-xl bg-white outline">    
            <div>        
                <div className=''>
                    <img className="w-60 h-60  rounded-lg outline" 
                        src={product.image?`data:image/jpeg;base64,${product.image}`:alt} 
                        alt={"product image"}/>
                                
                </div>
                <div className="grid justify-center items-center ">                            
                    <div>
                        <p className="bg-red-200 p-1 m-1 rounded-lg text-center ">
                            {product.productName}
                        </p>
                    </div>
                    <div>
                        <p className="bg-red-200 p-1 m-1 rounded-lg text-center">
                            {product.packSize} 
                        </p>
                    </div>
                    <div>
                        <p className="bg-red-200 p-1 m-1 rounded-lg text-center">
                            {"Rs. "}{product.price}
                        </p>
                    </div>  
                </div>
            </div>  
                                        
            <div className='grid gap-1 p-1 justify-center'>               
                                
                <button className="bg-red-400 flex rounded-md px-3 py-1
                                    hover:bg-green-400 text-white " 
                        type="submit"
                        onClick={()=>navigate(`/productDetails/${product._id}`, {state:{isAdmin}})}> 

                    View Details                    
                </button>
            </div>    

             {/* profile check? conditonal rendering*/}             

            {   isAdmin && (
                            <div className="flex justify-center gap-1 m-2">
                                <button 
                                    // onClick={() => onUpdate(product._id)}
                                    onClick={()=>navigate(`/update/${product._id}`)}
                                    className="px-3 py-1 
                                                bg-blue-500 text-white rounded-md
                                                hover:bg-blue-600">
                                    Update
                                </button>                        
                                <button 
                                    // onClick={()=>navigate(`/delete/${product._id}`)} 
                                    onClick={() => onDelete(product._id)}
                                    className="px-3 py-1 
                                                bg-red-500 text-white rounded-md 
                                                hover:bg-red-600">
                                    Delete
                                </button>                         
                            </div>                   
                        )
            }
           
        </div>
  )
  
}
export default ProductCard
