import jwt from 'jsonwebtoken';

const authenticationToken = (req, res, next) => {
    // Obter o cabeçalho Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('Token não fornecido');
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Extrair o token do cabeçalho
    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Token ausente no cabeçalho Authorization');
        return res.status(401).json({ message: 'Token ausente no cabeçalho Authorization' });
    }

    // Verificar e decodificar o token
    jwt.verify(token, process.env.JWT_SECRET || 'you_jwt_secret', (err, user) => {
        if (err) {
            console.log('Token inválido:', err.message);
            return res.status(403).json({ message: 'Token inválido' });
        }

        console.log('Token validado com sucesso:', user);
        req.user = user; // Associar os dados do usuário à requisição
        next();
    });
};

export default authenticationToken;