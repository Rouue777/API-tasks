//importacoes
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";
import Joi from "joi";



//criando  function para criar tasks
export const createTask = async (req,res) =>{
    //bloco try para function a async
    try{
        ////validar os dados de entrada input tasks
        //criar esquema joi
        const userSchema = Joi.object({
            title : Joi.string().min(4).max(50).required(),
            description : Joi.string().max(244),
            completed : Joi.boolean()
        })

        //validar se o titulo da task existe
        

        //metodo para validar
        const {error} = userSchema.validate(req.body)
        if(error){
            return res.status(400).json({message : "Preencha corretamente a task"})
        }
        

    }catch(erros){

    }
}