//importacoes
import sequelize from "../../config/dataBase.js";
import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";
import Joi from "joi";
import autheticationToken from "../../config/authenticationToken.js";



//criando  function para criar tasks
export const createTask = async (req, res) => {
    //bloco try para function a async
    try {
        ////validar os dados de entrada input tasks
        //criar esquema joi
        const userSchema = Joi.object({
            title: Joi.string().min(4).max(50).required(),
            description: Joi.string().max(244),
            completed: Joi.boolean()
        })

        const { error } = userSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: "Preencha corretamente a task" })
        }

        //validar se o titulo da task existe
        const tasks = await Tasks.findAll({ where: { userId: req.user.id } }) //retorna tasks do usuario atual
        let titleExists = false
        //iterando sobre o array para checar todas tarefas
        for (const task of tasks) {
            if (task.title === req.body.title) {
                titleExists = true;
                break;
            }
        }
        //verificando existenc
        if (titleExists) {
            return res.status(400).json({ message: "Titulo já existe" })
        }

        //criar tabela no banco de dados
        const newTask = await Tasks.create({
            title : req.body.title,
            description : req.body.description,
            completed : req.body.completed,
            userId : req.user.id

        })

        return res.status(201).json({message : "Task criada com sucesso", task: newTask})



    } catch (erros) {
        console.error(erros)
        return res.status(500).json({message: "Erro ao criar tarefas"})
    }
}