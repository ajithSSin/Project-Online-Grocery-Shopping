function usercheck(req,res,next){

    if(req.role=="user"){               
        next();
    }else{
        console.log('The logged in is not user');
        res.status(401).json({msg:"Unauthorised access"})
    }
}

export default usercheck;