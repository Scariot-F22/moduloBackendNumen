const { authService } = require('../services')

const isAuth = async (req, res, next)=>{
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({ mesagge: "El usuario no se encuentra logueado" })
        }
    
        const token = req.headers.authorization.split(" ")[1];
        const response = await authService.decodeToken(token)
        req.user = response
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send({ mesagge: "Ocurrió un error al validar el token. Intente mas tarde" })

    }
}

module.exports = {
    isAuth
}