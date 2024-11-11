//import 
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";

//criando funciton para exportacao
export const returnUserData = async (req,res) =>{
try{
    const idUser = req.user.id//pegando id do usuario autenticado

    //procurando pelos dados correspondentes ao id autenticado
    const userData = await User.findOne({
        where: { id: idUser },
        attributes: { exclude: ['password', 'otherSensitiveField'] } // Exclui campos sensíveis
      });

    //checando existencia dos dados
    if(!userData){
        return res.status(400).json({message : "Usuario não encontrado"})
    }

    //retornando sucesso
    return res.status(200).json({message : "Dados encontrados", userData})

}catch(erros){
    console.error(erros)
    return res.status(500).json({message: "erro no servidor" + erros})
}
}