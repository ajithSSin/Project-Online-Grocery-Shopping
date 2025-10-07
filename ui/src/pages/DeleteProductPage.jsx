import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const DeleteProductPage = () => {

  const {id} = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const deleteProduct = async (id) => {
              
      try {
        const response = await fetch(`/api/deleteOne/:id/${id}`, {
                                      method: 'DELETE'
                                    });

        if(!response.ok) {      
          
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }finally{
        setLoading(false)
      }
    };

  deleteProduct()

  },[])   

  return (
    <div>

      
    </div>
  )
}

export default DeleteProductPage