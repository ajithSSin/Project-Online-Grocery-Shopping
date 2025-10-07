import React from 'react'
import Banner from "../assets/Banner.png"

const HeroSection = () => {
  return (
    <div>
      <div className='flex  '>
          <img src={Banner} alt="Logo" className="h-100 w-324" />  
      </div>   

        <div className="py-4 bg-white">
          <div className=" mx-auto px-4 ">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800 
                              mb-2">
                  Explore Our <span> </span> 
                <span className="text-transparent bg-clip-text 
                                  bg-gradient-to-r from-red-400 to-pink-600" >
                  Everyday Essentials</span>
              </h2>
              <p className=" bg-gradient-to-r from-red-300 to-pink-400 
                              w-90 rounded-lg
                              text-xl text-white font-semibold mx-auto mb-2">
                  Category: BreakFast cereals
              </p>
              
            </div>
          </div>
          <button className="bg-gradient-to-r from-red-300 to-pink-400 
                              text-white 
                              px-8 ml-2 rounded-full 
                              font-semibold text-lg shadow-lg  ">
              Start Shopping Now {"->"}
            </button>
          </div>   
    </div>
  )
}

export default HeroSection

