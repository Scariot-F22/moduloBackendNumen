const { authService, userService } = require('../services');
const { validationResult } = require('express-validator');
const User = require( '../models/user');


const register = async (req, res)=>{
    try {
        const resultValidation = validationResult(req); //esto va a validar el email y la password, que está definido en el schema
        const hasError = !resultValidation.isEmpty()
        const { email, password } = req.body;
        
        if (hasError) {
            return res.status(400).send(resultValidation)
        }

        //CON EXPRESS VALIDATOR LAS SIGUIENTES VALIDACIONES YA NO SON NECESARIAS
        // if (!email) {
        //     res.status(403).send({ mesagge: "El campo email es requerido"})
        // }
        // if (!password) {
        //     res.status(403).send({ mesagge: "El campo password es requerido"})
        // }
        // CON ASYNC AWAIT
        const result = await userService.register(email, password).catch(error => error);
        res.status(result.status).send(result)
    
        //CON THEN Y CATCH
        // userService.register(email, password)
        //     .then(result=>{
        //         res.status(200).send(result)
        //     })
        //     .catch(error=>{
        //         res.status(500).send(error)
        //     })
        
    } catch (error) {
        res.status(500).send(error)
    }

    //CÓDIGO MODULADO, LLEVADO A userService.js
    // const newUser = new User({ email, password });

    // User.findOne({ email: newUser.email }, (error, users)=>{
    //     if (error) {
    //         return res.status(500).send({ mesagge: "Se produjo un error. Intente más tarde", error })
    //     }
    //     if (!users) {
    //         newUser.save((error)=>{
    //             if (error) {
    //                 return res.status(500).send({ mesagge: "Ocurrió un error al crear usuario", error })
    //             }
    //             return res.status(200).send({ mesagge: "Usuario registrado exitosamente", newUser})
    //         })
    //     }else
    //     return res.status(400).send({ mesagge: "El usuario ya se encuentra registrado" })
    //     // res.status(200).send({ mesagge: "Te registraste correctamente", token: authServices.createToken(newUser) })
    //     userService.register()
    // })
}

const login = (req, res)=>{
    const { email, password } = req.body;
    if(!email){
        return res.status(400).send({ mesagge: "El campo email es requerido" })
    }
    User.findOne({ email }, (error, users)=>{
        if (error) {
            return res.status(500).send({ mesagge: "Se produjo un error. Intente más tarde", error })
        }
        if (!users) {
            return res.status(400).send({ mesagge: "No se encontró el usuario con el email ingresado" })
        }
        if ( !email || !password || !users.comparePassword(password)) { 
            return res.status(401).send({ mesagge: "Usuario o Contraseña incorrecta"} )
        }
        res.status(200).send({ mesagge: "Te logueaste correctamente", token: authService.createToken(users) })
    })
}

const sayHi = (req, res)=>{
    res.status(200).res(`Bienvenido usuario de id ${req?.users?._id}`) //tiene acceso al _id, porque antes pasó por el middleware
}

module.exports={
    login,
    register,
    sayHi
}