import React from 'react'
import ContactPage from "./ContactPage"
import LoginPage from './LoginPage';
import Banner from "../components/Banner"
import ContactCard from '../components/ContactCard';


const AboutUs = () => {
    const lists = [        
     { 
        number: "1", 
        title: "Login", 
        desc: "Login to ur account" },
    { 
        number: "2", 
        title: "Browse", 
        desc: "Explore our products" 
    },
    { 
        number: "3", 
        title: "Add", 
        desc: "Add items to your cart" },       
    { 
        number: "4", 
        title: "Order", 
        desc: "Place the order" }
  ];
  return (
    <div >
        <Banner/>

        {/**Getting Startted */}

        <div className="py-5 
                        bg-gradient-to-r from-pink-200 to-red-300">
            <div className=" px-4 ">    
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                    Getting Started
                </h2>
                <p className="text-xl text-gray-600 text-center mb-12">
                    Ready to transform the Online grocery shopping experience?
                </p>
            
                <div className="grid grid-cols-4 gap-6">

                    {lists.map((list, index) => (
                        <div key={index} >          {/* className="relative*/}
                            <div className="bg-white p-3 rounded-xl shadow-lg text-center 
                                        hover: shadow-xl transition-shadow">

                                <div className="w-12 h-12 
                                            bg-gradient-to-r from-pink-200 to-red-400 
                                            text-white font-bold text-xl  
                                            flex items-center justify-center 
                                            rounded-full mx-auto mb-4">
                                    {list.number}
                                </div>
                                <h3 className="text-lg text-stone-700 font-semibold  mb-2">
                                    {list.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {list.desc}
                                </p>
                            </div>
                            {/* {index < steps.length - 1 && (
                                <span className="hidden md:block absolute top-1/2 -right-3 
                                            transform -translate-y-1/2 text-gray-400 w-6 h-6">
                                </span>)
                            } */}
                        </div>
                    ))}
                </div>
            </div>      
        </div>  
        <div className='flex justify-around '>           
            <ContactCard/>
            <LoginPage/>
        </div>
        <div>
            {/**footer */}
        </div>
    
    </div>
  )
}

export default AboutUs