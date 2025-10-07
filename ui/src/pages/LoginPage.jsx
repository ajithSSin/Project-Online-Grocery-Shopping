import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin= async (e)=>{
        e.preventDefault();
            try{
            const response=await fetch('/api/login',{
                                                      method:'POST',
                                                      credentials:'include',
                                                      headers:{
                                                                "Content-Type":"application/json",
                                                              },                                                      
                                                      body: JSON.stringify({UserName:username,Password:password})
                                                      }
                                        );  
            const data = await response.json()
            console.log(data);      
            // console.log(typeof(data.user.userName));
            
            const user=data.user.userName;
            const userRole=data.user.userRole

            if(!response.ok){                
                throw new Error(errData.msg ||"Login failed");
            }     
            if(user==="admin" && userRole==="admin"){
              navigate('/dashboard', { state: { user, userRole } })    /**navigate(`/explore/${profile.userRole}`) */
            }else{
              navigate(`/HomePage`, { state: { user, userRole } })     ///${user}
            }            
            
        }catch(error){
            setError(error.message || "Invalid, Please try again...")
        }
    }
    
  return (    
        <div >                            
            <div className="bg-white mt-10 ml-10 py-5 w-95
                            rounded-xl shadow-xl/30 inset-shadow-sm ">

                <form onSubmit={handleLogin}>
                    
                    <div>
                            <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
                                Login
                            </h2>
                    </div>

                    <div>                    
                        <input type="text" 
                                name="userName" 
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}

                                placeholder="UserName" required
                                className="w-80 h-10 mt-5 ml-7 
                                            font-sans text-xl font-bold text-indigo-400                                                   
                                        outline rounded "/>
                    </div>
                    <div>
                        <input type="password" name="" id="" placeholder="Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="w-80 h-10 mt-5 ml-7 
                                            font-sans text-xl font-bold text-indigo-400                                                   
                                        outline rounded "/>
                    </div>
                    <div>
                        <button type="submit"
                                className="w-80 h-10 mt-5 ml-7 
                                            font-sans text-xl font-bold text-indigo-400                                                   
                                        outline rounded-4xl ">            
                                Log in
                        </button>
                    </div>
                </form>

                <div className="mt-5 text-blue-800 text-center text-sm">
                    <p>Don't have an account?</p>  

                        <Link to="/signUp" className='text-blue-500'>
                            Sign Up
                        </Link>
                    
                </div>                 
                    {error && <p className='text-red-500 mb-4'> {error}</p>}                
                </div>  
        </div>
    )
}

export default LoginPage