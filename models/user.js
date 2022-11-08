const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({ //Este objeto recibe los mismos atributos que tiene nuestra colección en la base de datos
    email: { type: String, unique: true, lowercase: true, required: true }, //Objeto de configuración de requerimientos de Mongoose
    password: { type: String, required: true },
    regiterDate:{ type: Date, default: Date.now() }
});

UserSchema.pre('save', function(next) { //meddleware de mongo. Ejecuta antes de grabar(pre-grabar)
    let user = this;    //El this hace que user reciba los valores que le estoy pasando al hacer save en el register({ email, password })

    bcrypt.genSalt(10, (error, salt)=>{ //permite generar un hash de cierta cantidad de caracteres(10)
        if (error) {
            return next(error)
        }
        bcrypt.hash(user.password, salt, null, (error, hash)=>{
            if (error) {
                return next(error)
            }
            user.password = hash; //reasigno lo que ingresa el usuario, por un hash. Es decir, lo encripto
            next();
        })
    })
})


UserSchema.methods.comparePassword = function(password) {//compara la password ingresado por el usuario con el hash guardado en la base de datos
    let user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema); //para exportar un esquema, se hace a través de mongoose

// Con lo hecho hasta ahora, ya se puede acceder a la base de datos de Mongo a hacer consultas