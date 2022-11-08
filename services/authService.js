const jwt = require('jwt-simple');
const {DateTime} = require('luxon')

const createToken = (users)=>{ //user que entra por parámetro, se encuentra en la base de datos de mongo
    const payload = {
        sub: users._id, 
        iat: DateTime.now().toMillis(), //fecha de generación del token
        exp: DateTime.now().plus({ days: 14 }).toMillis() //fecha de expiración del token
    }
    return jwt.encode(payload, process.env.SECRET_KEY)
}

const decodeToken = (token)=>{
    const decode = new Promise((resolve, reject)=>{
        try{
            const payload = jwt.decode(token, process.env.SECRET_KEY);
            if (payload.exp <= DateTime.now().toMillis()) {
                reject ({ status: 401, mesagge: "Token expirado"})
            }
            resolve(payload.sub);
        }catch(error){
            reject({
                status: 500,
                mesagge: "Token invalido"
            }) 
        }
    })
    return decode;
}

module.exports = {
    createToken,
    decodeToken
}