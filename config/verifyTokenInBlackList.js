//imports 
import sequelize from "./dataBase.js";
import JwtBlacklist from "../models/jwt_blacklist.js";


//criando fucntion para exportacao
export const verifyTokenBlackList = async (req,res,next) => {
    try{
        const token = req.headers['authorization']?.split(' ')[1];//pegando token no header

        //cerificando token
        if(!token){
            return res.status(400).json({message: "token não fornecido"})
        }

        //verificar se o token esta na biblioteca
        const blacklistedToken = await JwtBlacklist.findOne({where:{token : token}})

        if(blacklistedToken){
            return res.status(200).json({message: "token revogado, faça login novamente"})
        }

        //caso o token nao esteja na blacklist entao pode continuar com o processo
        next()

    }catch(erros){
        console.error(erros)
        return res.status(500).json({message : "erro de servidor" + erros})
    }
}