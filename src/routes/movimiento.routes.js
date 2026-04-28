const { registrarMovimiento,obtenerHistorial} = require('../controllers/movimiento.controller');
const express = require('express');

const movimientoRouter = express.Router();

movimientoRouter.route('/')
    .get(obtenerHistorial)
    .post(registrarMovimiento);



module.exports = movimientoRouter;