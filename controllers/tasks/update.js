//importacoes
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";
import Joi from "joi";


//function para atualizar 
export const updateTasks = async (req,res) => {
    try{

        //validar dados de entrada
        const taskSchema = Joi.object({
            newtitle : Joi.string().min(4).max(30).required(),
            newdescription : Joi.string().max(244),
            newcompleted : Joi.boolean()
        })
        //validacao do schema
        const {error} =  taskSchema.validate(req.body)
        if(error){
            return res.status(400).json({message : "Preencha de forma correta as tasks"})
        }

        //acessando a task que ira ser atualizada
        const taskOld = await Tasks.findOne({where:{id : req.params.id}})
        if(!taskOld){
            return res.status(404).json({message : "Nenhuma task encontrada", type : "essa task n existe para esse usuario"})
        }

        //validar se a task e do usuario
        if(req.user.id !== taskOld.userId){
            return res.status(403).json({message : "Acesso negado", type : "Task não pertence á esse usuario"})
        }

        //salvando dados antigos para enviar ao cliente
        const oldTask = { ...taskOld.dataValues }
        //atualizando tasks
        await taskOld.update({
            title : req.body.newtitle,
            description : req.body.newdescription,
            completed : req.body.newcompleted
        })

        //retorno para task atualizada
        return res.status(200).json({message : "task atualizada com sucesso", newTask : taskOld, oldTask : oldTask})

    }catch(erros){
        console.error(erros)
        return res.status(500).json({message : "server error" + erros})
    }
}