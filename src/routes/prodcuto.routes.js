const { create, getAll } = require('../controllers/producto.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productoRouter = express.Router();

productoRouter.route('/productos')
    .get(getAll)
    .post(create);


module.exports = productoRouter;