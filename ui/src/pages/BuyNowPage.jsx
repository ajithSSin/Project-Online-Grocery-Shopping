import React from 'react'
import CartGrid from "../components/CartGrid"
// import Navbar from '../components/NavBar'
import { useParams } from 'react-router-dom'

const BuyNowpage = () => {

  const {isBuyNow} = useParams();

  console.log(isBuyNow);
  
  const isBuyNowBool = isBuyNow === "true";
  console.log(isBuyNowBool);
  console.log(typeof(isBuyNow));
  
  
  return (
    <div>
        <div>       
            <CartGrid isBuyNow={isBuyNowBool} />
        </div>
        
    </div>
  )
}

export default BuyNowpage