import { DataTypes } from 'sequelize';
import sequelize from '../config/dataBase.js'; 

const JwtBlacklist = sequelize.define('JwtBlacklist', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Impede que o mesmo token seja adicionado várias vezes
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }
}, {
  // Configuração da tabela
  tableName: 'jwt_blacklist', // Nome da tabela no banco de dados
  timestamps: false, // Evita que o Sequelize adicione automaticamente colunas createdAt e updatedAt
});

/*
sequelize.sync().then(() =>{
    console.log('tabela criada com sucesso')
}).catch(()=>{
    console.log('deu erro ao criar tabela')
})*/

export default JwtBlacklist;