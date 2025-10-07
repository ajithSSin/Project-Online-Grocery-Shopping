import React, { useEffect, useState } from 'react'
import { useNavigate, useParams , Link} from 'react-router-dom'

import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';

const EditProduct = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true);   
    const navigate = useNavigate();

            // const[productName,setProductName]=useState("")
       
               const [productId, setProductId] = useState("")         
               const [category, setCategory] = useState("")
               const [brandName, setBrandName]=useState("")
               const [packSize,setPackSize]=useState("25 gms")
               const [price, setPrice] = useState("")
               const [quantity, setQuantity]=useState("")
               const [description, setDescription] = useState("")
               
               const [productImage, setProductImage] = useState(null)
       
               const [pName, setPName] = useState("")              
   
    useEffect(() => {
   
       const fetchProduct = async () => {
       try {
         const response = await fetch(`/api/getProduct/${id}`);
   
         const data = await response.json();
   
         console.log("Fetched product:", data);
   
          if(!data || !data.productName){
                throw new Error("Product Not found!");
            }

            setPName(data.productName); 
            
            setProductId(data.productId);
            setCategory(data.category);
            setBrandName(data.brandName);
            setPackSize(data.packSize);
            setPrice(data.price)
            setQuantity(data.quantity);
            setDescription(data.description || ""); 
            setProductImage(data.productImage);
   
       } catch (error) {
         console.log(error);
       }finally{
         setLoading(false)
       }
     }
     fetchProduct();
   }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();
            
        try{
            
            const formData = new FormData();
                // formData.append("ProductName",pName);  
                formData.append("ProductId",productId);                              
                formData.append("Category", category);
                formData.append("BrandName",brandName);
                formData.append("PackSize",packSize);
                formData.append("Price",price);
                formData.append("Quantity",quantity);
                formData.append("Description", description);
                
                if(productImage){
                    formData.append("ProductImage",productImage);
                }
                const response = await fetch(`/api/updateAll/${id}`, {
                                   method: "PUT",                               
                                   credentials: "include",
                                   body: formData,
                                   });    
                const data = await response.json();
   
                if(!response.ok){
                    throw new Error(data || "failed to update product");
                }
                // toast.success("Product Updated Successfully!");
                alert("Product Updated Successfully!")
   
                navigate("/dashboard");

                } catch(error){
                    console.error("Update Error:", error);
                    toast.error(error.message);
                }
    } 
    // const handleClick = () => {
    //             if (window.confirm("Back to Dashoard?")) {                    
    //                 navigate("/dashboard");
    //             }
    //         }; 

  return (
    <>
    <div>
         {/* <NavBar/>  */}
    
        <div className="flex justify-between m-5">        
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
       
            <div className="m-auto ">              
                    {/* To update details */}
                <div className='flex justify-center'>    
                    <div className="div1">
                        <div className=''>
                            <div className="">
                                <h3 >Update Product Details</h3>   
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4" 
                                    encType="multipart/form-data">
                                <div className="prod_space">
                                    <label className="prod_space_text" >
                                        Product Id
                                    </label><br/>
                                    <input 
                                        className='border '
                                        type="text" placeholder=""
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}/>
                                </div>
                                <div className="prod_space">
                                    <label className="prod_space_text" >
                                        Product Name
                                    </label><br/>
                                    <input 
                                        className='border '
                                        type="text" placeholder="Chocos"
                                        value={pName}
                                        onChange={(e) => setPName(e.target.value)}/>
                                </div>                        
                                <div className="prod_space">
                                    <label className="prod_space_text" >
                                        Category
                                    </label> <br/>                            
                                    <input 
                                        className='border '
                                        type="text" placeholder="Breakfast Cereals"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}/>
                                </div>
                                <div className="prod_space">
                                    <label className="prod_space_text">
                                            Brand Name
                                    </label><br/>                            
                                    <input 
                                        className='border'
                                        type="text" placeholder="Kellogs"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}/>
                                </div> 
                                <div className="prod_space">
                                    <label className="prod_space_text">
                                        Size
                                    </label><br/>
                                    <select
                                                value={packSize}
                                                onChange={(e) => setPackSize(e.target.value)}
                                                className="border "
                                                required
                                                >
                                            <option value="25gms">25gms</option>
                                            <option value="50gms">50gms</option>
                            
                                    </select> 
                                </div>
                                <div className="prod_space">
                                    <label className="prod_space_text">
                                        Rate
                                    </label><br/>
                                    <input 
                                            className='border'
                                            type="text" placeholder="10.00"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}/>
                                </div>

                                <div className="prod_space">
                                    <label className="prod_space_text"  >
                                        Quantity
                                    </label><br/>
                                    <input 
                                            className='border'
                                            type="number" placeholder="25"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}/>
                                </div> 
                                <div className="prod_space">
                                    <label className="prod_space_text">
                                        Description
                                    </label><br/>
                                    <textarea 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className='border'
                                        name="" id="" rows="4" 
                                        placeholder="Kelloggs Chocos offers a great range of 
                                        breakfast items which offer perfect health and taste">.
                                    </textarea>
                                </div>  
                                <div className="prod_space">
                                    <label className="prod_space_text" >Image</label><br/>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        onChange = {(e) => {if(e.target.files && e.target.files[0]){
                                                    setProductImage(e.target.files[0]);}}}/>
                                </div>
                                <button className="bg-red-500 
                                                hover:bg-green-400 my-10  
                                                text-white font-bold py-2 px-4 
                                                rounded-full w-full 
                                                focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Save
                                </button>                
                            </form>

                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    </>    
  )
}

export default EditProduct