import User from './user.js';
import Tasks from './tasks.js';

// Relações de 1 usuario para muitas tasks
User.hasMany(Tasks, {
    foreignKey: 'userId',
    as: 'tasks'
});

Tasks.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});