const express = require('express');
const productoRouter = require('./prodcuto.routes');
const router = express.Router();

router.use(productoRouter);


module.exports = router;
