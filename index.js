
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// Directorio publico
// El use en express es conocido como un middleware, que no es mas que una función
// que se ejecuta en el momento en que alguien hace una petición a mi servidor.
app.use( express.static('public') );

// Lectura y parseo del body
app.use(express.json())


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// app.get('/*', function(req,res) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT} `)
} )