import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import Tasks from "./tasks.js";

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, 
    tableName: 'users' 
});


//cuidado com essa parte você pode apagar todos os dados da databases
 /*sequelize.sync().then(() =>{
    console.log('tabela criada com sucesso')
}).catch(()=>{
    console.log('deu erro ao criar tabela')
})*/

export default User;