const Sucursal = require('../models/Sucursal');
const catchError = require('../utils/catchError');

const crearSucursal = catchError(async (req, res) => {
    const { nombre, ubicacion } = req.body;
    const nuevaSucursal = await Sucursal.create({ nombre, ubicacion });
    return res.status(201).json(nuevaSucursal);
});

const obtenerSucursales = catchError(async (req, res) => {
    const sucursales = await Sucursal.find();
    return res.status(200).json(sucursales);
});

module.exports = {
    crearSucursal,
    obtenerSucursales
};