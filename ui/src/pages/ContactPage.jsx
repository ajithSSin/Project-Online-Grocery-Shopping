import React from 'react'
import { Link } from 'react-router-dom'
import ContactCard from '../components/ContactCard'


const ContactPage = () => {
  return (
    <div>
        <div className='flex'>
        <label >                  
            <Link to="/HomePage" 
                className='rounded ml-5
                            text-xl text-stone-800 
                            hover:bg-red-400'>
                        Home
            </Link>
        </label>
      </div> 
      <ContactCard/>
        
        
    </div>
  )
}

export default ContactPage
