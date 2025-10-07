import React, { useEffect, useState } from "react";
import ProductInfo from "../components/ProductInfo";
import { useParams, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";


const ProductDetails = () => {

    const{id}=useParams(); 
    const location = useLocation();
    const { isAdmin } = location.state || {};  

    const [product,setProduct]=useState({});
    const [loading, setLoading] = useState(true);   

    console.log(isAdmin);
    

    useEffect(() => {

                    const fetchProduct = async () => {

                            try {
                            // const response = await fetch(`/api/getProduct/${id}`);
                            
                            const response = await fetch(`/api/getProductInfo/${id}`);                         

                            const data = await response.json();

                            console.log("Fetched product:", data);

                            setProduct(data);

                          } catch (error) {
                            console.log(error);
                          }finally{
                            setLoading(false)
                          }
                    }
                    fetchProduct();

                    }, [id]);

 if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

 if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  return (
    <>  
      <div>
        <NavBar/>
      </div>     

      <div className="flex justify-between h-screen 
                      bg-red-200">                         

        <div className="w-100 h-150 m-auto">          
          <div className="flex outline mt-5 ">            
        
          {/* Main image */}
            <div className="m-1 outline">
              <img className="w-100 h-100" 
              src={`data:image/jpeg;base64,${product.image}`} />
            </div>
          </div> 

          {/* About product description */}
          <div className="text-justify pt-4">
            <span className="text-xl">About the Product</span><br />
            <span>{product.description}  </span>
          </div>
        </div>

        {/* About product info */}    
        <div className="grid items-center">            

          <ProductInfo product={product} isAdmin={isAdmin}/>    
                
        </div>    

      </div>
  </>
  );
};

export default ProductDetails;