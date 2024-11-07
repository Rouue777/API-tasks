//imports
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";


//criando function para exportar
export const checkTask = async (req, res) => {
    try {
        //pegando dado do checkbox enviado pelo front end
        const iscompleted = req.body.checkbox
        const idTask = req.params.id

        //encontrar a task com o id cedido na requisicao
        const Taskchecked = await Tasks.findOne({ where: { id: idTask } })
        if(!Taskchecked){
            return res.status(400).json({message: "Task não encontrada"})
        }

        //verificando se usuario tem permissao para alterar task
        if (Taskchecked.userId !== req.user.id) {
            return res.status(403).json({ message: "Acesso negado a essa task" })
        }

        //logica para mudar valor no db
        if (iscompleted !== Taskchecked.completed) {
            await Taskchecked.update({
                completed: iscompleted
            })

            return res.status(200).json({message : "Status da task atualizado com sucessp"})
        }else{

            return res.status(200).json({message : "o status já estava atualizado"})
        }

    } catch (erros) {
        console.error(erros)
        return res.status(500).json({message: "Erro no servidor" + erros})
    }
}