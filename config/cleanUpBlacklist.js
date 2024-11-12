//imports
import sequelize from "./dataBase.js";
import JwtBlacklist from "../models/jwt_blacklist.js";

const CLEANUP_PERIOD = 7 * 24 * 60 * 60 * 1000; // Limpar após 7 dias

// Função para limpar tokens expirados da blacklist
const cleanupBlacklist = async () => {
  const threshold = new Date(Date.now() - CLEANUP_PERIOD);
  await JwtBlacklist.destroy({ where: { createdAt: { [Op.lt]: threshold } } });
};

// Agendar a limpeza a cada 7 dias
setInterval(cleanupBlacklist, CLEANUP_PERIOD);