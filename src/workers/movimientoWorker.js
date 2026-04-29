const Movimiento = require('../models/Movimiento');
const Stock = require('../models/Stock');

const procesarMovimientosPendientes = async () => {
    const pendientes = await Movimiento.find({ 
        estado: 'pending', 
        reintentos: { $lt: 2 } 
    });

    for (const movimientos of pendientes) {
        try {
            const { tipo, productoId, cantidad, sucursalOrigenId, sucursalDestinoId } = movimientos;
            console.log(`Procesando movimiento: ${movimientos._id} - Tipo: ${tipo}`);

            if (tipo !== 'entrada') {
                const origen = await Stock.findOne({ productoId, sucursalId: sucursalOrigenId });
                
                if (!origen || origen.cantidad < cantidad) {
                    throw new Error("Stock insuficiente");
                }
            }

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
            movimientos.estado = 'processed';
            await movimientos.save();
            console.log(`✅ Movimiento ${movimientos._id} completado.`);

        } catch (error) {
            movimientos.reintentos += 1;
            movimientos.errorLog = error.message;

            if (movimientos.reintentos >= 2) {
                movimientos.estado = 'failed';
                console.log(`❌ Movimiento ${movimientos._id} falló tras 2 reintentos.`);
            } else {
                console.log(`⚠️ Reintentando movimiento ${movimientos._id}...`);
            }
            await movimientos.save();
        }
    }
};

const startWorker = () => {
    setInterval(procesarMovimientosPendientes, 10000);
    console.log('Worker de movimientos iniciado...');
};

module.exports = startWorker;