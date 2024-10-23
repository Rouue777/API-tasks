import { Sequelize, DataTypes} from "sequelize";
import sequelize from "../config/dataBase.js";
import User from "./user.js";

//criacao das tabelas
const Tasks = sequelize.define('tasks', {
    title : {
        type : DataTypes.STRING,
        allowNull: false
    },
    description : {
        type : DataTypes.STRING,
        allowNull : true
    },
    completed : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },

},{
    timestamps : true,
    tableName : 'tasks'
});


//cuidado com essa parte você pode apagar todos os dados da databases
/* sequelize.sync().then(() =>{
    console.log('tabela criada com sucesso')
}).catch(()=>{
    console.log('deu erro ao criar tabela')
}) */

export default Tasks;