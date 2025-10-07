import React from 'react'
import { useParams } from 'react-router-dom'
import CartCardBuy from '../components/CartCardBuy';

const BuyNowPage = () => {
    const {id}=useParams();
  return (
    <div>
        <CartCardBuy/>
    </div>
  )
}

export default BuyNowPage