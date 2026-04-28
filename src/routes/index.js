const express = require('express');
const productoRouter = require('./prodcuto.routes');
const sucursalRouter = require('./sucursal.routes');
const movimientoRouter = require('./movimiento.routes');
const router = express.Router();

router.use(productoRouter);
router.use(sucursalRouter)
router.use(movimientoRouter)


module.exports = router;
