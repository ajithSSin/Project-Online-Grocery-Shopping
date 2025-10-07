function admincheck(req,res,next){

    if(req.role=="admin"){
        console.log('Logged in as admin ');        
        next();
    }else{
        console.log('The logged in is not admin');        
        res.status(401).json({msg:"Unauthorised access"})
    }
}

export default admincheck;