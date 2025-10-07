import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {

                          const [firstName, setFirstName] = useState("");
                          const [lastName, setLastName] = useState("");
                          const [username, setUserName] = useState("");
                          const [password, setPassword] = useState("");
                          const [userRole, setUserRole] = useState("user");

                          const [error, setError] = useState("");
                          const navigate = useNavigate();

  const handleSignup = async (e) => {
    
    e.preventDefault();

    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          UserName: username,
          Password: password,
          UserRole: userRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Signup Failed");
      }

      alert("New User details added Successfully");
      navigate("/about");

    } catch (err) {
      setError(err.message || "Signup Failed: Please Try Again!");
    }
  };

  return (
    <div className="ml-[30%] mt-[10%] w-120 bg-pink-200 grid rounded 
                    shadow-xl/30 inset-shadow-xm">
      <div className="mt-4 text-center">
        <label className="font-serif font-bold text-4xl mx-5" 
                htmlFor="signup-form">
          Sign Up
        </label>
      </div>

      <form id="signup-form" 
          onSubmit={handleSignup}>
        <div className="mx-5">
          <div className="flex mt-3">
            <div>
              <p>First Name:</p>
              <input
                    type="text"
                    className="outline w-50 mt-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required />
            </div>
            <div>
              <p className="ml-5">Last Name:</p>
              <input
                    type="text"
                    className="outline w-45 ml-5 mt-2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required />
            </div>
          </div>

          <div>
            <p className="mt-2">User Name:</p>
            <input
                    className="outline w-100 mt-1"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User name"
                    required />

            <p className="mt-2">Password:</p>
            <input
                    className="outline w-100 mt-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required/>

            <p className="mt-2">User role:</p>
            <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="outline w-50 mt-1">
              <option value="user">User</option>
            </select>
          </div>

          <div className="mt-4 p-2 flex justify-center">
            <button
                    type="submit"
                    className="outline rounded w-45 
                              font-sans text-xl font-bold bg-red-400 
                              hover:bg-stone-400 ">
                    Create Account
            </button>            
          </div>
          <div className="mt-1 flex justify-center text-blue-900">
            <Link to ="/about">
                       Back to Login 
            </Link> 
          </div>
          <div>
             {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>        
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;