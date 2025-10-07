import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import NavBar from "../components/NavBar";

const Dashboard = () => {

  const location = useLocation();
  
  const { user, userRole } = location.state || {};
  
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  }, [navigate]); {/*navigate*/}  


  const handleLogout = async () => {
    try {
          await fetch("/api/logout", {
            method: "POST",
            credentials: "include"  // include cookies in the request
          });
          setProfile(null)
          navigate("/HomePage",{ replace: true });

    } catch (err) {
      console.error("Logout error:", err);
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
    <div >
      
      <div className="grid bg-red-200 p-2 rounded-r-lg h-screen w-[20%]">
        <div>
          {/* display profile info if it exists */}
          {profile ? (
                      <>
                        <label className="font-sans text-xl bg-red-200 rounded-lg">
                          Welcome, {profile.userName}
                        </label>
                        <p>Role: {profile.userRole}</p>
                      </>
                    ) : (
                        <p>Loading profile...</p>
                      )
          }

          {/* Sidebar menu */}
          <nav className="bg-stone-100 mt-1 rounded-lg text-center items-center p-2">
            <ul>
              <li className="outline rounded-lg mt-2 mb-5">
                <Link
                      to="/dashboard"
                      className="rounded text-xl hover:bg-red-400">
                      Dashboard
                </Link>
              </li>

              <li className="outline rounded-lg mt-2 mb-5">
                <Link
                  to={
                      profile ? `/explore/${profile.userRole}`: 
                              "/explore" // fallback if profile not loaded
                    }
                  className="rounded hover:bg-red-400 text-xl"
                >
                  Explore Products
                </Link>
              </li>

              <li className="outline rounded-lg mt-2 mb-5">
                <Link
                      to="/addProduct"
                      className="rounded hover:bg-red-400 text-xl">
                      Add New Product
                </Link>
              </li>
              <li className="outline rounded-lg mt-2 mb-5">
                <Link
                      to="/inventory"
                      className="rounded hover:bg-red-400 text-xl">
                      Inventory
                </Link>
              </li>
            </ul>
            <button onClick={handleLogout}
                        className="w-20 h-7 mt-2 bg-red-600 hover:bg-red-700 
                                text-white font-semibold rounded-lg ">
                        Logout
            </button>
          </nav>
        </div>
      </div>

      {/* {error && <p className="text-red-500">{error}</p>} */}

      {error && !profile && <p className="text-red-500">{error}</p>}

    </div>
  );
};

export default Dashboard;
