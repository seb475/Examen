const { crearSucursal,obtenerSucursales } = require('../controllers/sucursal.controller');
const express = require('express');

const sucursalRouter = express.Router();

sucursalRouter.route('/')
    .get(obtenerSucursales)  
    .post(crearSucursal);    

module.exports = sucursalRouter;