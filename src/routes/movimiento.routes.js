const { registrarMovimiento,obtenerHistorial} = require('../controllers/movimiento.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const movimientoRouter = express.Router();

movimientoRouter.route('/movimiento')
    .get(verifyJWT,obtenerHistorial)
    .post(verifyJWT,registrarMovimiento);



module.exports = movimientoRouter;