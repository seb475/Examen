const Movimiento = require('../models/Movimiento');
const Stock = require('../models/Stock');
const catchError = require('../utils/catchError');

const registrarMovimiento = catchError(async (req, res) => {
    const { tipo, productoId, cantidad, sucursalOrigenId, sucursalDestinoId } = req.body;
    if (tipo !== 'entrada') {
        const origen = await Stock.findOne({ productoId, sucursalId: sucursalOrigenId });
        if (!origen || origen.cantidad < cantidad) {
            return res.status(400).json({ mensaje: "Stock insuficiente" });
        }
    }

    const movimiento = await Movimiento.create({
        tipo, productoId, cantidad, sucursalOrigenId, sucursalDestinoId, estado: 'procesado'
    });

    if (tipo === 'entrada' || tipo === 'transferencia') {
        await Stock.findOneAndUpdate(
            { productoId, sucursalId: sucursalDestinoId },
            { $inc: { cantidad: cantidad } },
            { upsert: true }
        );
    }
    
    if (tipo === 'salida' || tipo === 'transferencia') {
        await Stock.findOneAndUpdate(
            { productoId, sucursalId: sucursalOrigenId },
            { $inc: { cantidad: -cantidad } }
        );
    }

    return res.status(201).json(movimiento);
});

const obtenerHistorial = catchError(async (req, res) => {
    const historial = await Movimiento.find()
        .populate('productoId', 'nombre SKU')
        .populate('sucursalOrigenId', 'nombre')
        .populate('sucursalDestinoId', 'nombre');
    return res.status(200).json(historial);
});

module.exports = {
    registrarMovimiento,
    obtenerHistorial
};