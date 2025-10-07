import React from 'react'
import logo from "../assets/logo.png"

const Banner = () => {
  return (
    <div>
        <div className='flex justify-center '>
            <img src={logo} alt="Logo" className="h-75 w-320" />            
        </div>
    </div>
  )
}

export default Banner