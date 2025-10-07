import jwt from "jsonwebtoken";

/*token is required, while routing to another file*/
function authenticate(req,res,next)
{
    const cookie=req.headers.cookie;//(req.cookie)retrieving from cokie:?? 
                                    // (cross check if error occurs for front end)
    console.log(cookie);
    if(cookie){
        const[name,token]=cookie.trim().split('=')
        console.log("Token Name:",name);
        console.log("Token",token);

        /**check token name and token are valid or not ; using jwt.verify(token, secret_key) */
        if(name=="authToken")
        {
            const decode=jwt.verify(token,process.env.SECRET_KEY);
            //returns payload values in decode;
            console.log(decode);  
            req.name=decode.UserName;
            req.role=decode.UserRole;
            next();
            // to return back to the: admin.post('/addCourse',authenticate,(req,res)
        }else
        {
            res.status(401).json({msg:"Unauthorized client"})
        }           
    }else{
        res.status(404).json({msg:"Cookie not found"})
    }
}
export default authenticate;