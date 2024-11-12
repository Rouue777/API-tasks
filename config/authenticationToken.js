//import 
import jwt from 'jsonwebtoken'

//midleware de auth
const autheticationToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message : "token não fornecido"})
    }

    //validacao decodificao do token
    jwt.verify(token, 'you_jwt_secret' , (err,user) => {
        if(err) {return res.status(403).json({message : "token invalido"})}


        req.user = user;
        next();
    })
  
    
}


export default autheticationToken;