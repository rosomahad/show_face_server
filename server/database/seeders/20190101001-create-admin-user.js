
const { User } = require('..');

const admin = {
    fullName: 'Главный администратор',
    email: 'admin@gmail.com',
    phone: '0634206192',
    password: 'admin',
    isAdmin: true
};

module.exports = {
    up: () => {
        return User.addNewUser(admin);
    },

    down: (queryInterface) => {
        return queryInterface.delete('User', {
            email: admin.email
        }, {});
    }
};