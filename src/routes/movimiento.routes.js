const { registrarMovimiento,obtenerHistorial} = require('../controllers/movimiento.controller');
const express = require('express');

const movimientoRouter = express.Router();

movimientoRouter.route('/movimiento')
    .get(obtenerHistorial)
    .post(registrarMovimiento);



module.exports = movimientoRouter;