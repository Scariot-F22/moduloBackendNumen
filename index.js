const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');


//inicializamos aplicación de express
const app = express();

//cargamos middlewares para acceder al body del request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cargamos archivo.env
dotenv.config();

app.use('/api', routes);

//levantamos server a la escucha en el puerto específico
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, (error, response)=>{
    if (error) {
        console.log(`Error al conectar a la base de datos. ${error}`)
    }
    console.log("Conexión a la base de datos Mongo establecida")
    app.listen(process.env.PORT, (error)=>{
        if (error) {
            console.log("Error al levantar el servidor")
        } else {
            console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
        }
    })
})