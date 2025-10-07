import React, {useState} from 'react'
import "../styles/styleSheet.css"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from '../components/NavBar';
import { useNavigate, Link } from 'react-router-dom';

const AddProductPage = () => {
    const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")  
    const [category, setCategory] = useState("")
    const [brandName, setBrandName]=useState("")
    const [packSize,setPackSize]=useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity]=useState("")
    const [description, setDescription] = useState("")
    
    const [productImage, setProductImage] = useState(null)

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
            e.preventDefault();

            try{
                const formData = new FormData();

                formData.append("ProductId",productId);
                formData.append("ProductName",productName);                
                formData.append("Category", category);
                formData.append("BrandName",brandName);
                formData.append("PackSize",packSize);
                formData.append("Price",price);
                formData.append("Quantity",quantity);
                formData.append("Description", description);
                
                if(productImage){
                    formData.append("ProductImage",productImage);
                }
                try{
                const res = await fetch("/api/addProduct", {
                                        method: "POST",
                                        credentials: "include",
                                        body: formData,
                                    });
                const data = await res.json()

                // toast.error("Error adding Product");                   
                if(!res.ok){
                    throw new Error(data.msg || "Error adding Product");
                    //toast.error("Error adding Product");

                }
                alert(data.msg)
                toast.success(data.msg)
                }   catch(error){
                    //toast.error("Error adding Product");
                    alert(error.message)
                    console.log("error in fetching")
                }

                toast.success("Product added Successfully");
                //alert("Product added Successfully");

                //reset form fields
                // setProductId("");
                // setProductName("");                
                // setCategory("");
                // setBrandName("")
                // setPackSize("");
                // setPrice("");
                // setDescription("");                
                // setProductImage(null);

                } catch(err){
                console.log(err)
                toast.error("Something went wrong");
                // alert("Something went wrong: "+ err.message);
                }
            navigate("/dashboard");   
            
            };  
    // const handleClick = () => {
    //     if (window.confirm("Back to Dashoard?")) {                    
    //         navigate("/dashboard");
    //     }           
    // } 

  return (
    <>
    <div>
        {/* <NavBar/>     */}
          {/* <SideBar/>     */} 
        <div className="flex justify-between mt-5">     

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
                <div className="div1">  
                    <div >
                        <h3>Add New Product Details</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                        <div className="prod_space">
                            <label className="prod_space_text" htmlFor="productId">
                                    Product Id
                            </label><br/>
                            <input 
                                    className='border '
                                    type="text" placeholder="eg:p-1"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}/>
                        </div>
                        <div className="prod_space">
                            <label className="prod_space_text" htmlFor="productName">
                                    Product Name

                            </label><br/>
                            <input 
                                    className='border '
                                    type="text" placeholder="Chocos"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}/>
                        </div>                        
                        <div className="prod_space">
                                <label className="prod_space_text" htmlFor="category">
                                    Category
                                </label><br/>                            
                                <input 
                                className='border '
                                type="text" placeholder="Breakfast Cereals"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}/>
                        </div>

                        <div className="prod_space">
                                <label className="prod_space_text" htmlFor="brandName">
                                    Brand Name</label><br/>                            
                                <input 
                                className='border'
                                type="text" placeholder="Kellogs"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}/>
                        </div> 
                        <div className="prod_space">
                                <label className="prod_space_text" htmlFor="size">
                                    Size
                                </label><br/>
                                <select
                                    value={packSize}
                                    onChange={(e) => setPackSize(e.target.value)}
                                    className="border "
                                    required
                                    >
                                    <option value="25gms" >25gms</option>
                                    <option value="50gms">50gms</option>                  
                                </select> 
                        </div>

                        <div className="prod_space">
                                <label className="prod_space_text" for="">Rate</label><br/>
                                <input 
                                    className='border'
                                    type="text" placeholder="10.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className="prod_space">
                                <label className="prod_space_text" for="" >Quantity</label><br/>
                                <input 
                                    className='border'
                                    type="number" placeholder="25"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}/>
                        </div> 
                        <div className="prod_space">
                                <label className="prod_space_text" for="">Description</label><br/>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='border'
                                    name="" id="" rows="4" 
                                    placeholder="Kelloggs Chocos offers a great range of breakfast items which offer perfect health and taste">.
                             </textarea>
                        </div>  
                        <div className="prod_space">
                                <label className="prod_space_text" for="">Image</label><br/>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange = {(e) => {if(e.target.files && e.target.files[0]){
                                                setProductImage(e.target.files[0]);}}}/>
                        </div>
                        
                            <button className="bg-red-500 
                                hover:bg-green-400   
                                text-white font-bold py-2 px-4 
                                rounded-full w-full"
                                type="submit"
                                // onClick={handleClick}
                                >
                               Save 
                               
                               {/* focus:outline-none focus:shadow-outline  my-5*/}
                            </button>                                           
                    </form>
                </div>
            </div>                 
        </div>
    </div>                
    </>    
  )
}

export default AddProductPage