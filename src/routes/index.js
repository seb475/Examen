const express = require('express');
const productoRouter = require('./prodcuto.routes');
const sucursalRouter = require('./sucursal.routes');
const movimientoRouter = require('./movimiento.routes');
const stockRouter = require('./stock.routes');
const router = express.Router();

router.use(productoRouter);
router.use(sucursalRouter)
router.use(movimientoRouter)
router.use(stockRouter)


module.exports = router;
