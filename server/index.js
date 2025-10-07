import express, {json} from "express";
import dotenv from "dotenv"

import mongoose from "mongoose";
import {router} from "./Routes/loginRoute.js"
import admin from "./Routes/adminRoutes.js";
import user from "./Routes/userRoutes.js"

import authenticate from "./Middleware/auth.js";
import admincheck from "./Middleware/admin.js";

import cors from 'cors';
import homerouter from "./Routes/homeRoute.js";

dotenv.config()

const app=express();
app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json());

app.use("/",homerouter)
app.use("/",user);
app.use('/',router);

app.use('/',authenticate,admincheck,admin);
// app.use('/',admin);

//container name:mongodb

mongoose.connect("mongodb://mongodb:27017/onlineGrocery").then(()=>{
    console.log("MongoDb connects to database onlineGrocery")}).catch(error=>{
    console.log("Not connected to Database");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port:${process.env.PORT}`)
})
