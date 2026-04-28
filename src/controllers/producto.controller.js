const Producto = require('../models/Producto');
const catchError = require('../utils/catchError');

const create = catchError(async (req, res) => {
    const { SKU, nombre, precio, categoria } = req.body;
    const nuevoProducto = await Producto.create({ SKU, nombre, precio, categoria });
    return res.status(201).json(nuevoProducto);
});

const getAll = catchError(async (req, res) => {
    const productos = await Producto.find();
    return res.status(200).json(productos);
});

module.exports = {
    create,
    getAll
};