import jwt from 'jsonwebtoken';
const checkAccessToken = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        console.log("check token",token)
        if(token){
            token = token.split(" ")[1];
            let user  = jwt.verify(token,process.env.ACCESS_TOKEN_SECRECT);
            req.user_id = user._id;
            next();
        }else{
            res.status(401).json({
                msg:"Unauthrized User"
            })
        }
    
    }catch(erro){
        res.status(500).json({
            msg:"err authentication",
            err: erro.message
        })
    }
}
export default checkAccessToken