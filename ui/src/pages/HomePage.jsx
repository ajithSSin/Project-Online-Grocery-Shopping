import React from 'react'
// import ProductsPage from './ProductsPage'
import NavBar from "../components/NavBar"
import ProductGrid from '../components/ProductGrid'
import HeroSection from '../components/HeroSection'
import { useLocation } from 'react-router-dom'


const HomePage = () => {
  const location = useLocation();
  const { user, userRole } = location.state || {};

  return (
    <div>
      <NavBar />
      <HeroSection/>          
      <ProductGrid/>  
    </div>
  )
}

export default HomePage