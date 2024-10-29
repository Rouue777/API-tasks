//importacoes
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";

//function para mostrar tasks
 export  const  showTasks = async (req,res) => {
    try{ 
        const tasksUser = await Tasks.findAll({where:{userID : req.user.id}})//capturar array com as tasks
        if(tasksUser.length === 0){
            return res.status(400).json({message : "Nenhuma Tarefa encontrada", type: "Usuario não possui tarefas"})
        }

        return res.status(200).json({message: "Tarefas encontradas", tasks : tasksUser})

    }catch(erros){
        console.error(erros)
        return  res.status(500).json({message: "erro ao buscar tarefas"})
        

    }
}