const { crearSucursal,obtenerSucursales } = require('../controllers/sucursal.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const sucursalRouter = express.Router();

sucursalRouter.route('/sucursales')
    .get(obtenerSucursales)  
    .post(verifyJWT,crearSucursal);    

module.exports = sucursalRouter;