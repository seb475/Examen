const { obtenerStockPorSucursal,obtenerInventarioGeneral } = require('../controllers/stock.controller');
const express = require('express');

const stockRouter = express.Router();

stockRouter.route('/stock')
    .get(obtenerInventarioGeneral)
   

stockRouter.route('/:sucursalId')
    .get(obtenerStockPorSucursal);



module.exports = stockRouter;