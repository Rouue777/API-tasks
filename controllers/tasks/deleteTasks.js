//imports
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";


//criando funcao para exportacao
export const deleteTasks = async (req, res) => {
    try {
        ///
        const idDelete = req.params.id //pegando id da url

        //buscando task no db
        const taskToDelete = await Tasks.findOne({ where: { id: idDelete } });
        //verificar se existe task para ser deletada
        if(!taskToDelete){
            return res.status(404).json({message : "Tarefa não encontrada"})
        }

        //verificar se a task pertence ao usuario conectado
        if (taskToDelete.userId !== req.user.id) {
            return res.status(403).json({ message: "Você não tem permissão para deletar essa task", type: "Essa task não pertence a esse usuario" })
        }

        //deletando
        const taskDeleted = await Tasks.destroy({ where: { id: idDelete } })//metodo de delete retorna quanto items foram deletados
        if (!taskDeleted) {
            return res.status(400).json({ message: "Erro ao deletar task"})
        }

        return res.status(200).json({ message: `Task ${taskToDelete.title} deletada com sucesso` })

    } catch (erros) {
        console.error(erros);
        return res.status(500).json({ message: "Erro de servidor" });
    }

}