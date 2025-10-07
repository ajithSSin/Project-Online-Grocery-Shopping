import React from 'react'
import CartCardBuy from './CartCardBuy'
import CartCard from './CartCard'
import Navbar from './NavBar';
// import { useLocation } from 'react-router-dom';

const CartGrid = ({ isBuyNow }) => {  

  // const { user, userRole } = location.state || {};

  // console.log(isBuyNow);
  
  return (
    <div>     

      <Navbar />   

      {isBuyNow ? <CartCardBuy isBuyNow={isBuyNow}/> : <CartCard />}          
      
    </div>
  )
}

export default CartGrid

