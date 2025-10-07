import React from 'react'
import { useState,useEffect} from 'react'
import ProceedToBuy from './ProceedToBuy';

const CartCardBuy = ({ isBuyNow }) => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);    

  useEffect(() => {        
            const fetchCart = async () => {
                            
                            try {
                                  const response = await fetch("/api/getCartBuy");// fetch from dB

                                    const data = await response.json();//json Obj

                                    console.log("response:", data); 
                                    setCartItems(data); 

                                  } catch (err) {
                                    console.error("Error fetching cart:", err);
                                    setCartItems([]);
                                  }finally{
                                    setLoading(false)
                                  }
            };

            fetchCart(); //function call
  }, []);

  if (loading) return <p>Loading cart...</p>;

  const Amt=cartItems.reduce((acc, item) => acc + item.totalProductPrice, 0) 
  
  return (

    <div className='flex justify-around'>
      
      <div className="w-220 h-auto rounded-xl bg-stone-300 p-1 "> 
        <div className=" bg-pink-200 rounded-lg
                        p-3 mb-2 
                        font-bold text-2xl ">
            
              <label htmlFor="">
                Shopping Cart
              </label>
                           
        </div>
        <div className="border rounded-lg m-1 p-1">
          <ul className="flex justify-between ">
            <li className="w-15 text-center  
                                bg-red-300                                                
                                outline rounded-lg "> 

              <label for="" className="text-xl ">sl.no
              </label>
            </li>
            <li className="w-75 text-center  
                                        bg-red-300 outline rounded-lg  ">
              <label for=""
                            className="text-xl ">Product name
              </label>
            </li>
            <li className="w-25 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className="text-xl">Quantity
              </label>
            </li>
            <li className="w-25 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                            className=" text-xl">Price
              </label>
            </li>
            <li className="w-40 text-center  
                              bg-red-300 outline rounded-lg">
              <label for=""
                          className=" text-xl">Total
              </label>
            </li>                                
          </ul>   
        </div>      

        {cartItems.map((item, index) => (              
          <div key={index} >

            <div className="border rounded-lg m-1 p-1">  
              <ul className="flex justify-between ">
                <li className="w-15 text-center  
                              bg-red-300 outline rounded-lg"> 
                  <label for=""
                                  className=" text-xl ">{index+1}
                  </label>
                </li>
                <li className="w-75 text-center  
                                      bg-red-300 outline rounded-lg">
                            <label for=""
                                    className=" text-xl ">{item.productName}
                            </label>
                </li>
                <li className="w-25 text-center  
                                            bg-red-300 outline rounded-lg">
                            <label for=""
                                    className=" text-xl mt-4">{item.quantity}
                            </label>
                </li>
                <li className="w-25 text-center  
                                      bg-red-300 outline rounded-lg">
                            <label for=""
                                  className=" text-xl ">{item.price}
                            </label>
                </li>
                <li className="w-40 text-center  
                                            bg-red-300 outline rounded-lg">
                            <label for=""
                                  className=" text-xl ">{item.totalProductPrice}
                            </label>
                </li>                            
              </ul>
            </div>
          </div>

          ))
        }
          <div className="border rounded-lg m-2 p-2 
                                  bg-pink-00 text-xl 
                                  font-bold text-center 
                                  flex justify-between  ">
            <div>         
                     Total items : {cartItems.length}
            </div>
            <div>
                    Grand Total:{" "}{Amt}                        
            </div>
          </div>
           
      </div>

      {/*  */}
       <div>
        <ProceedToBuy Items={cartItems.length} 
                      Amount={Amt}
                      isBuyNow={ isBuyNow }
                     />        
       </div>

    </div>
  );
};

export default CartCardBuy;
