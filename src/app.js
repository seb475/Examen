const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');

// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

//*  RUTA TEMPORAL GENERAR TOKEN  
app.get("/get-token", (req, res) => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
        { id: "id_de_prueba" }, 
        process.env.TOKEN_SECRET, 
        { expiresIn: '7d' }
    );
    res.send(token);
});


// rutas
app.use(router);


// Middlewares después de las rutas
app.use(errorHandler);

module.exports = app;
