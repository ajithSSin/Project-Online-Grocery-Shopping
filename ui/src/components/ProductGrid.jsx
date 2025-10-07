import React,{useState, useEffect} from 'react'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom';


const ProductGrid = ({isHome=false}) => {  

  const {userRole} = useParams();  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productList = isHome ? products.slice(0,4) : products; 

  useEffect(() => {

              const fetchProducts = async () => {
                try {
                  // let response;      
                    // console.log("Fetching products for non-admin...");
                    const response = await fetch("/api/productsDisplay", {
                                                method: "GET",
                                                headers: {
                                                  "Content-Type": "application/json",
                                                },
                    });

                    if (!response.ok) {
                      throw new Error(`Server error: ${response.status}`);
                    }

                    const data = await response.json();
                    setProducts(data);
                    console.log("Products:", data);
                  
                } catch (error) {
                  console.error("Error fetching products:", error);
                } finally {
                  setLoading(false);
                  console.log("Finished fetchProducts");
                }
              };

              fetchProducts();
            }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm("Confirmation to delete this product?")) {
      try {
        const response = await fetch(`/api/deleteOne/${id}`, {
                         method: "DELETE",
                        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          setProducts(products.filter((p) => p._id !== id));//creates a new array
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete product");
      }
    }
  };
    
   if (!products) return <h2 className="text-center mt-10">
    Product not found</h2>;

  return (
    <>   
      <div>      
      </div>
      
      {
        loading ? (
                    <h1>Loading</h1>
                  ) : (
                        <div className='grid grid-cols-1 
                                        sm:grid-cols-2 
                                        lg:grid-cols-4
                                        gap-10 mx-15 my-10 m-auto'>
                        {
                          productList.map((product) => (
                            <ProductCard key={product.productId} 
                              
                                              product={product} 
                                              // onUpdate={() => handleUpdate(product.productId)} 
                                              onDelete={() => handleDelete(product.productId)} 
                                              isAdmin={userRole === "admin"} 
                            />
                          ))
                        }
                        </div>
                      )
      }   

</>
    
  )
}

export default ProductGrid