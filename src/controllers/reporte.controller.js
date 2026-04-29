const Movimiento = require('../models/Movimiento');
const Stock = require('../models/Stock');
const catchError = require('../utils/catchError');

const obtenerDashboard = catchError(async (req, res) => {
    const stock = await Stock.find()
        .populate('productoId', 'nombre SKU')
        .populate('sucursalId', 'nombre');
    
    return res.json(stock);
});

const obtenerReporteFechas = catchError(async (req, res) => {
    const { inicio, fin } = req.query;
    const filtro = {};
    if (inicio && fin) {
        filtro.createdAt = {
            $gte: new Date(inicio),
            $lte: new Date(fin)
        };
    }

    const reporte = await Movimiento.aggregate([
        { $match: filtro },
        {
            $group: {
                _id: {
                    tipo: "$tipo",
                    sucursal: "$sucursalDestinoId" 
                },
                totalMovimientos: { $sum: 1 },
                cantidadTotal: { $sum: "$cantidad" }
            }
        }
    ]);

    return res.json(reporte);
});

module.exports = {
    obtenerDashboard,
    obtenerReporteFechas
};