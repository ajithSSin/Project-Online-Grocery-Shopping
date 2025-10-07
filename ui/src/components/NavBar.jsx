import React, { useState , useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Navbar() {

  const navigate = useNavigate();  

  // const [user, setUser] = useState();
  const [profile, setProfile] = useState(null);

  const [error, setError] = useState("");
  
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {

      const fetchProfile = async () => {

                      try {
                        const response = await fetch("/api/profile", {
                                                    method: "GET",
                                                    credentials: "include", 
                                                  });

                        if (!response.ok) {
                          throw new Error("Unauthorized Access!");
                        }

                        const data = await response.json();
                        setProfile(data); // set profile>> object

                      } catch (err) {
                        setError(err.message || "Error fetching Profile");
                        navigate("/HomePage", { replace: true });
                      }finally{
                        setLoading(false);
                      }
                    };

    fetchProfile();
    
  }, [navigate]);   

  const handleCart = (e) => {

    e.preventDefault();

    if (!profile) {

      alert("You must be logged in to access the cart!");
    } else {
      navigate("/cart");
    }
  };  

  const onLogout = async () => {
    try {
      const res = await fetch("/api/logout", 
                          { method: "POST" }); // logout using POST
      if (res.ok) {
        // setUser(null);
        // toast.success("Logout Success");
        alert("Logout Success")

        navigate("/", { replace: true }); // prevent going back

      } else {
        alert("Logout failed")
        // toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

   if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-4 bg-white shadow">
      <div className="flex items-center justify-between font-serif">
        <div className="flex items-center space-x-8">

          {
            profile?.userRole==="admin"?(
                              <Link to='/dashboard'>
                                <span className="text-gray-700 font-medium">Home</span>
                              </Link>):(
                              <Link to="/">
                                <span className="text-gray-700 font-medium">Home</span>
                              </Link>)
          }          

          <Link to="/contact">
            <span className="text-gray-500">Contact</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">

          {/* <Link to="/cart" > 
            <span className="text-gray-700">Cart</span>
          </Link> */}

          {
            profile?.userRole==="admin"?(
                              <Link to='/dashboard'>
                                <span className="text-gray-700 font-medium">Dashboard</span>
                              </Link>):(
                              <Link to="#" onClick={handleCart}>
                                <span className="text-gray-700">Cart</span>
                              </Link>)
          }           

          {/* <Link to="#" onClick={handleCart}>
            <span className="text-gray-700">Cart</span>
          </Link> */}

          {
            profile ?  (
                    <div>
                        <span className="text-sm text-gray-600">Hi, {profile.userName}</span>

                        <button
                                onClick={onLogout}
                                className="text-sm text-red-600 border rounded px-2 py-1 ml-2">
                          Logout
                        </button>
                    </div>
                  ) : (
                        <Link to="/about">
                          <span className="text-gray-700 font-medium">User/Login</span>
                        </Link>
                      )
          }
        </div>
      </div>
       {/* {error && !profile && <p className="text-red-500">{error}</p>} */}
    </div>
  );
}