const Movimiento = require('../models/Movimiento')
const catchError = require('../utils/catchError')

const registrarMovimiento = catchError(async (req, res) => {
    const { tipo, productoId, cantidad, sucursalOrigenId, sucursalDestinoId } = req.body;
    
    const movimiento = await Movimiento.create({
        tipo,
        productoId,
        cantidad,
        sucursalOrigenId,
        sucursalDestinoId,
        estado: 'pending', 
        reintentos: 0      
    });
    return res.status(202).json({
        mensaje: "Movimiento registrado. Procesando en segundo plano...",
        movimiento
    });
});

const obtenerHistorial = catchError(async (req, res) => {
    const historial = await Movimiento.find()
        .sort({ createdAt: -1 }) 
        .populate('productoId', 'nombre SKU')
        .populate('sucursalOrigenId', 'nombre')
        .populate('sucursalDestinoId', 'nombre');
    return res.status(200).json(historial);
});

module.exports = {
    registrarMovimiento,
    obtenerHistorial
};