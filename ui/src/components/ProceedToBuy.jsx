import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const ProceedToBuy = ({Items,Amount,isBuyNow }) => {

    const[charge]=useState(25);   

    const[location, setlocation]=useState("");
    const[zipCode,setZipCode]=useState("");
    const[instruction, setInstruction]=useState("");
    const[modePayment,setModePayment]=useState("")

    const navigate=useNavigate();

    console.log("place order call",isBuyNow);    
   
    const placeOrder = async () => {
        try {
          let response;
          if(!isBuyNow){
                        response=await fetch("/api/placeOrder",{
                                  method:"POST",
                                  headers:{
                                    "Content-Type":"application/json",
                                  },
                                  body:JSON.stringify({
                                    Location:location,
                                    Zipcode:zipCode,
                                    Instruction:instruction,
                                    Mode_of_Payment:modePayment
                                  }),

        });
        const data=await response.json();
        alert("Order Placed");
        navigate("/")

      }else{
          response = await fetch("/api/placeOrderBuy", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({    
                                    Location:location,
                                    Zipcode:zipCode,
                                    Instruction:instruction,
                                    Mode_of_Payment:modePayment
                                  }),
                              });

      const data = await response.json();

      // console.log(data);      

      // if (response.ok) {
        
      //   // console.log(data);        
      //   console.log("Order placed");
      //   alert("Order Placed");
      // } else {
      //   alert("Could not place order.. ");
      //   console.error("Failed to place order ");
      //   navigate("/")
        
      // }

      alert("Order Placed");
      navigate("/");        
      }   
      
    } catch (error) {
      console.error("Error while adding to cart:", error);
      alert("Error while placing order");
    }
  }   

  return (
    <>
        <div className=" w-80 h-auto rounded-xl bg-stone-300 p-1 ">
            <div className="bg-pink-200 rounded-lg 
                            p-1 mb-2 
                            font-bold text-2xl ">                
                    <label>Proceed to Buy</label>
                    <div>
                        <span className='text-xl'>Items#{Items}</span>
                    </div>
            </div>
            {/* <div className="bg-pink-200 rounded-xl p-1
                            text-xl">
                <label >Amount#{Amount}<br/>                        
                </label>  
                                    
            </div> */}
            {/* Payment Summary */}
            <div>
                <div className="">
                <span className=" text-xl font-serif font-bold">
                    Bill Details</span>
                </div>        
        
                <div className="w-auto mx-5 p-1
                                bg-red-200  rounded-lg
                                shadow-2xl flex justify-between ">
                <div>
                    <span className=''>Product Cost:</span> <span className='ml-10'>{Amount}</span><br />
                    <span>Delivery Charge:</span><span className='ml-5'>{charge}</span><br />
                    {/* <span>Total Amount:</span><span>{"10.00"}</span><br /> */}
                    {/* <span>Promotion Applied:</span><span>{""}</span><br /> */}
                    <span>Order Total:</span><span className='ml-15'>{Number(Amount) + charge}</span>
                </div>            
        </div>      
      </div>

        {/* Delivering To */}

            <div className="m-5  bg-pink-200 ml-2 font-serif p-2 rounded-xl">
                    <span className="text-xl text-bold p-2"> 
                        Delivering to User#</span><br/>
                    <span className="text-bold p-2">Address</span><br/>

                    <textarea                                                
                            className="outline outline-gray-500 ml-2"
                            placeholder="Kazhakoottam"
                            value={location}
                            onChange={(e) => setlocation(e.target.value)}
                            >
                                
                    </textarea><br/>
                    <input
                            className="outline outline-gray-500 mt-1 ml-2"
                            type="text"
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            />
                        <br />
                            <span className="text-sm ml-2">
                            Add delivery instruction <i>(if any)</i>
                            </span>
                            <input
                            className="outline outline-gray-500 ml-2"
                            type="text"
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}/>
            </div>
             {/* Payment Method */}

            <div className="m-2 bg-pink-200 ml-2 font-serif p-2 rounded-xl">
                <div className="">                    
                        <span className=" text-xl font-serif font-bold">
                                Payment Method</span> 
                    <div>
                            <input type="radio" 
                            name="payment" 
                            value="CashOnDelivery"
                            onChange={(e) => setModePayment(e.target.value)}/>
                            Cash/Pay on Delivery <br/>
                    </div> 
                    <div>
                        <input type="radio" 
                            name="payment" 
                            value="Credit/Debit"
                            onChange={(e) => setModePayment(e.target.value)}/>                            

                            Credit/Debit Card <br/>

                            {/* <select className="ml-5 outline outline-gray-500"name="" id="">
                            <option value="">Bank Name#1</option>
                            </select> */}
                    </div>
                    <div>
                            <input type="radio" 
                                    name="payment" value="UPI"
                                    onChange={(e) => setModePayment(e.target.value)}/>Other UPI Apps
                            <br/>
                            {/* <label className= "ml-5"for="">Please enter your UPI ID</label><br/>
                            <input className="ml-5 outline outline-gray-500 rounded"
                                    type="text" placeholder="Enter UPI id"/> */}
                    </div>
                </div>                
            </div>

            <div className="flex justify-center">  
                      <button onClick={placeOrder}>
                        <span className="bg-red-500 
                                rounded
                                text-stone-50 font-bold text-xl" >
                        Place Order
                        </span>
                      </button>        
            </div>
        </div>
    </>
  )
}

export default ProceedToBuy