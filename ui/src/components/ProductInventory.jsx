import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const ProductInventory = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);      
                     
    useEffect(() => {
                
                const fetchProducts = async () => {
                try {
                    
                    const response = await fetch("/api/productsDisplay", {
                                                                method: "GET",
                                                                headers: {
                                                                  "Content-Type": "application/json",
                                                                },
                                    });
                
                                    if (!response.ok) {
                                      throw new Error(`Server error: ${response.status}`);
                                    }
                
                                    const data = await response.json();
                                    setProducts(data);
                                    console.log("Products:", data);
                                  
                                } catch (error) {
                                  console.error("Error fetching products:", error);
                                } finally {
                                  setLoading(false);
                                  console.log("Finished fetchProducts");
                                }
                              };
                
                              fetchProducts();
                            }, []);

    
    if (loading) return <p>Loading cart...</p>;

  return (
    <div>
        <div className='flex justify-between'>       

        <div className=" bg-pink-200 rounded-lg
                        p-3 mb-2 
                        font-bold text-2xl  ">
            
              <label htmlFor="">
                Product Inventory
              </label>
        </div>
        <div >
                <label >                  
                    <Link to="/dashboard" 
                            className='bg-red-400 font-serif font-bold text-white
                                    rounded text-xl hover:bg-green-400
                                    focus:outline-none focus:shadow-outline m-5'>
                        Back to admin
                    </Link>
                </label>
        </div>
                           
        </div>

        <div className="border rounded-lg m-1 p-1">
          <ul className="flex justify-between ">
            
            <li className="w-20 text-center  
                                bg-red-300                                                
                                outline rounded-lg "> 

              <label for="" className="text-xl ">Prod-Id
              </label>
            </li>
            <li className="w-80 text-center  
                                        bg-red-300 outline rounded-lg  ">
              <label for=""
                            className="text-xl ">Product name
              </label>
              </li>
            <li className="w-50 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">Category
              </label>
            </li>
            <li className="w-40 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">Brand Name
              </label>
            </li>
            <li className="w-40 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">Pack Size
              </label>
            </li>
            <li className="w-25 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                            className=" text-xl">Price
              </label>
            </li>            
            <li className="w-25 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">Quantity
              </label>
            </li>                                                      
          </ul>   
        </div>

        {products.map((item, index) => (              
          <div key={index} >

            <div className="border rounded-lg m-1 p-1">  
              <ul className="flex justify-between ">
                <li className="w-20 text-center  
                              bg-red-300 outline rounded-lg"> 
                  <label for=""
                                  className=" text-xl ">{item.productId}
                  </label>
                </li>
                <li className="w-80 text-center  
                                      bg-red-300 outline rounded-lg">
                            <label for=""
                                    className=" text-xl ">{item.productName}
                            </label>
                </li>
                <li className="w-50 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">{item.category}
              </label>
            </li>
            <li className="w-40 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">{item.brandName}
              </label>
            </li>
            <li className="w-40 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">{item.packSize}
              </label>
            </li>
            <li className="w-25 text-center  
                                      bg-red-300 outline rounded-lg">
                            <label for=""
                                  className=" text-xl ">{item.price}
                            </label>
            </li>

            <li className="w-25 text-center  
                                            bg-red-300 outline rounded-lg">
                    <label for=""
                        className=" text-xl mt-4">{item.quantity}
                    </label>
            </li>                
                                           
              </ul>
            </div>
          </div>

          ))
        }

        
    </div>
  )
}

export default ProductInventory