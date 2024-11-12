//imports
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import JwtBlacklist from "../../models/jwt_blacklist.js";

//criando function para exportar
export const logOut = async (req,res) => {
    try{
        const token = req.headers['authorization']?.split(' ')[1];//pegando token no cabecalho da requisicao

        //conferindo existencia do token
        if(!token){
            return res.status(400).json({message : "token não encontrado"})
        }

        //adicionando token da requisicao a blacklist
        await JwtBlacklist.create({ token })

        return res.status(200).json({message: "logout feito com sucesso"})
    }catch(erros){
        
        console.error(erros)
        return res.status(500).json({message: "erro no servidor " + erros})
    }
}