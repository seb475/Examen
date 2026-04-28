const Stock = require('../models/Stock');
const catchError = require('../utils/catchError');

const obtenerStockPorSucursal = catchError(async (req, res) => {
    const { sucursalId } = req.params;
    const inventario = await Stock.find({ sucursalId })
    .populate('productoId', 'nombre SKU precio');
    return res.status(200).json(inventario);
})

const obtenerInventarioGeneral = catchError(async (req, res) => {
    const inventario = await Stock.find()
    .populate('productoId', 'nombre SKU')
     .populate('sucursalId', 'nombre');
    return res.status(200).json(inventario);
})

module.exports = {
    obtenerStockPorSucursal,
    obtenerInventarioGeneral
};
