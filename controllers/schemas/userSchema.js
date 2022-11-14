const { check } = require('express-validator');

module.exports = [
    check('email')
        .exists()
        .notEmpty()
        .withMessage("campo email requerido")
        .custom((value)=> value.includes("@") && value.includes(".com"))
        .withMessage("Email ingresado inválido")
    ,
    check('password')
        .exists()
        .notEmpty()
        .withMessage("campo password requerido")
];