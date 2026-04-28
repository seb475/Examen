const express = require('express');
const productoRouter = require('./prodcuto.routes');
const sucursalRouter = require('./sucursal.routes');
const router = express.Router();

router.use(productoRouter);
router.use(sucursalRouter)


module.exports = router;
