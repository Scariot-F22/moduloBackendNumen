const User = require( '../models/user') //a través de este objeto, el controlador va a tener acceso a la base de datos
const {authService} = require('../services')

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

const register = (req, res)=>{
    const { email, password } = req.body;
    const newUser = new User({ email, password });

    User.findOne({ email: newUser.email }, (error, users)=>{
        if (error) {
            return res.status(500).send({ mesagge: "Se produjo un error. Intente más tarde", error })
        }
        if (!users) {
            newUser.save((error)=>{
                if (error) {
                    return res.status(500).send({ mesagge: "Ocurrió un error al crear usuario", error })
                }
                return res.status(200).send({ mesagge: "Usuario registrado exitosamente", newUser})
            })
        }else
        return res.status(400).send({ mesagge: "El usuario ya se encuentra registrado" })
        // res.status(200).send({ mesagge: "Te registraste correctamente", token: authServices.createToken(newUser) })
        
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