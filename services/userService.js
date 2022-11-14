const authService = require('./authService');
const User = require( '../models/user') //a través de este objeto, el controlador va a tener acceso a la base de datos

const register = (email, password)=> {
    return new Promise((resolve, reject) => {
        const newUser = new User({ email, password });

        User.findOne({ email: newUser.email }, (error, users)=>{
            if (error) {
                reject({ status: 500, mesagge: "Se produjo un error. Intente más tarde", error })
            }
            if (!users) {
                newUser.save((error)=>{
                    if (error) {
                        // return res.status(500).send({ mesagge: "Ocurrió un error al crear usuario", error })
                        reject({ status:500, mesagge: "Ocurrió un error al crear usuario", error })
                    }
                    // return res.status(200).send({ mesagge: "Usuario registrado exitosamente", newUser})
                    resolve({ status: 200, token: authService.createToken(newUser) })
                })
            }else
            // return res.status(400).send({ mesagge: "El usuario ya se encuentra registrado" })
            reject({ status:400, mesagge: "El usuario ya se encuentra registrado" })
        })    
    })
}

module.exports = {
    register
}