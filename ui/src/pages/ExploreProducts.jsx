import React from 'react'
import ProductGrid from '../components/ProductGrid'
import { Link } from 'react-router-dom'

const ExploreProducts = () => {
  return (
    
    <div>
      <div className=''>
        <label >
          <Link to="/dashboard" 
                className='bg-red-400 font-serif font-bold text-white
                            rounded text-xl hover:bg-green-400
                            focus:outline-none focus:shadow-outline m-5'>
              Back to admin
          </Link>
        </label>
      </div>
      <ProductGrid/>       
        
    </div>
  )
}

export default ExploreProducts