//importacoes
import express from 'express';
import User from '../../models/user.js';
import Tasks from '../../models/tasks.js';
import sequelize from '../../config/dataBase.js';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';


//criar funcionalidade para exportacao
export const loginFunction = async (req, res) => {
    try { ///validando inputs
        //criando schema
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        })

        //validando schema e retornando erro em caso de erros
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Preencha de forma correta as credenciais" })
        }

        //verificar se o usuario existe
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.status(400).json({ message: "Usuario não encontrado" })
        }

        //verificar se a senha esta correta
        const hashedPassword = user.password //senha hasheada
        const isPasswordValid = await bcrypt.compare(req.body.password, hashedPassword)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Credencias invalidas" })
        }

        //gerar o token jwt
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'you_jwt_secret', { expiresIn: '1h' })

        //enviar token ao cliente
        return res.status(200).json({ 
            message: "Login realizado com sucesso!", // Mensagem de sucesso
            token// Retornando o token
        });


    } catch (erros) {
        console.error(erros); // Para debugar
        return res.status(500).json({ message: "Erro interno do servidor" });
    }

}