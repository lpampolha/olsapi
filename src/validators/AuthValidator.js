const { checkSchema } = require('express-validator')

module.exports = {
    signup: checkSchema({
        name:{
            notEmpty: true,
            isLength:{
                options:{min:3}
            },
            errorMessage: 'O nome precisa ter pelo menos três caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength:{
                options: {min: 6}
            },
            errorMessage: 'Senha precisa ter pelo menos seis caracteres'
        },
        state:{
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength:{
                options: {min: 6}
            },
            errorMessage: 'Senha precisa ter pelo menos seis caracteres'
        },
    })
}