import React, { useEffect, useState } from "react"

import { createBrowserRouter } from "react-router-dom"
import { RouterProvider, Navigate } from "react-router-dom"

import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"

import AddProductPage from "./pages/AddProductPage"
import Dashboard from "./pages/Dashboard"
import ProductDetails from "./pages/ProductDetails"

import EditProduct from "./pages/EditProduct"
import ProductGrid from "./components/ProductGrid"
import ExploreProducts from "./pages/ExploreProducts"
import DeleteProductPage from "./pages/DeleteProductPage"
import CartGrid from "./components/CartGrid"
import BuyNowPage from "./pages/BuyNow"

import AboutUs from "./pages/AboutUs"
import ContactPage from "./pages/ContactPage"
import BuyNowpage from "./pages/BuyNowPage"
import ProductInventory from "./components/ProductInventory"


const router = createBrowserRouter(
  [
    {
      path: '/', element:<Navigate to='/HomePage' replace/>,
    },
    {
      path:'/HomePage', element: <HomePage />
    }, 
    {
      path: '/login', element: <LoginPage />    
    },
     {
      path: '/signup', element: <SignUpPage/>
    },  
    {
      path: '/dashboard', element: <Dashboard />
    },  
    {
      path:'/addProduct', element:<AddProductPage/>
    },
    {
      path:"/explore/:userRole", element:<ExploreProducts/>
    },    
    {
      path:"/productGrid/:userRole", element:<ProductGrid/>
    },      
    {
      path:'/productDetails/:id', element:<ProductDetails/>
    },   
    {
      path:'/update/:id', element:<EditProduct/>
    },
    {
      path:'/delete/:id',element:<DeleteProductPage/>
    },           
    {
      path:'/cart',element:<CartGrid/>
    },   
    {
      path:"/buyNow/:isBuyNow", element:<BuyNowpage/>      
    } ,
    
    {
      path:'/about',element:<AboutUs/>
    },
    {
      path:'/contact' , element:<ContactPage/>
    },
    {
      path:'/inventory',element:<ProductInventory/>
    }
  ])

const App = () => {

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return <RouterProvider router={router} />
}

export default App

