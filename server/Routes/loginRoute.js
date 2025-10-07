import { Router } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import authenticate from "../Middleware/auth.js";

import { signUp } from "../Models/model.js"

const router=Router();

/**wake up call */
//route and call back fn;req=>for requesting, from the front end;
//res to the frontend
router.get('/route1',(req,res)=>{   
    console.log("Hello world");         
    res.send("Hello World");
})

router.post('/signUp',async(req,res)=>{
    try{
        const {FirstName,
                LastName,
                UserName,
                Password,
                UserRole}=req.body;        
            
        const result= await signUp.findOne({userName:UserName});
            // console.log(result)
        if(result){
            console.log("User name already exist");
            res.status(400).json({msg:"User name already exist"})         
        }else{
            try{
                const newPassword=await bcrypt.hash(Password,10);            
                const newUser=new signUp({
                        firstName:FirstName,
                        lastName:LastName,
                        userName:UserName,
                        password:newPassword,
                        userRole:UserRole                                    
                })   
                await newUser.save();  
            }catch(error){
                console.log(error)
            }    
            console.log("New User details added Successfully");
            res.status(201).json({msg:"New User details added"})
        }
    }catch(error){
        console.log(error)
    }    
})

router.post("/login",async(req,res)=>{
    try{
        const {UserName,Password}=req.body;
        const result=await signUp.findOne({userName:UserName});

        console.log(UserName);
        console.log(Password);
        console.log("DB document:", result.userRole,result.userName);
        
        if(!result){
            console.log("UserName not found")
            res.status(404).json({msg:"Username not found "})
        }else{
            try{
                const valid=await bcrypt.compare(Password,result.password);               
                              
                    if(valid){
                        const token=jwt.sign({UserName, UserRole:result.userRole},
                                            process.env.SECRET_KEY,
                                            {expiresIn:"1h"})               
                        
                            if(token){
                                res.cookie("authToken",token,{httpOnly:true});//(??)
                                console.log("Successfully token generated:");   

                                // res.status(200).json({msg:"Logged in"} );    
                                res.status(200).json({msg: "Logged in",
                                                    user: {userName: result.userName,
                                                            userRole: result.userRole,
                                                             },
                                                    });
                            }else{
                                console.log("issue in token generation");
                                res.status(400).json({msg:"User not found"})
                            }
                        
                    }else{
                      console.log("Invalid UserName or Password...");   
                      res.status(400).json({msg:"User not found"});    
                    }               
                
            }catch(error){
                console.log(error)
            }        
        }
    }catch{
        console.log("fetching username and password");        
        console.log(error)
    }
})

// router.get("/logOut",authenticate,(req,res)=>{
//     res.clearCookie("authToken");
//     res.status(200).json({msg:"Logged out Successfully"})
// })

//

router.post('/logout',(req,res) => {
    const cookieOpts = {
                        httpOnly: true,
                        sameSite: 'lax',                               // match your login
                        secure: process.env.NODE_ENV === 'production',  //for production environment
                        path: '/',                                     // match path
                        // domain: '.yourdomain.com',                  // include if you set it at login
                    };

  res.clearCookie('authToken', cookieOpts);
  
  res.cookie('authToken', '', { ...cookieOpts, expires: new Date(0) });
  res.set('Cache-Control', 'no-store, private');
  res.status(200).json({ msg: 'Successfully logged out' });
});

//userauth-logout for useProfile hook
// router.post('/logout1',(req,res) => {
//     try {
//         res.cookie('authToken', '', { httpOnly: true,
//                                     sameSite: 'lax', // match your login
//                                     secure: false, 
//                                     expires: new Date(0) 
//                                 });
//     res.status(200).json({ msg: 'Successfully logged out' });
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({msg:"Internal Server Error"});         
//     } 
// })

/**to fetch userRole and userName */
router.get('/profile',authenticate,(req,res)=>{

    console.log("fetching profile details",req.name, req.role);

    res.status(200).json({userName:req.name,userRole:req.role})
});

// router.get('/profile', authenticate, (req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     console.log("fetching profile details", req.user.name, req.user.role);

//     res.status(200).json({
//         userName: req.user.name,
//         userRole: req.user.role
//     });
// });

export {router}