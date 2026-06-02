const { crearSucursal,obtenerSucursales } = require('../controllers/sucursal.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const sucursalRouter = express.Router();

sucursalRouter.route('/sucursales')
    .get(obtenerSucursales)  
    .post(crearSucursal);    

module.exports = sucursalRouter;