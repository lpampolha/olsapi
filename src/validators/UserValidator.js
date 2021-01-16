const { checkSchema } = require('express-validator')

module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true,
        },
        name:{
            optional: true,
            notEmpty: true,
            isLength:{
                options:{min:3}
            },
            errorMessage: 'O nome precisa ter pelo menos três caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            isLength:{
                options: {min: 6}
            },
            errorMessage: 'Senha precisa ter pelo menos seis caracteres'
        },
        state:{
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),
}