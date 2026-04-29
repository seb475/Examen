const Movimiento = require("../models/Movimiento");
const Stock = require("../models/Stock");

const procesarMovimientosPendientes = async () => {
  const pendientes = await Movimiento.find({
    estado: "pending",
    intentos: { $lt: 2 },
  });

  for (const movimientos of pendientes) {
    try {
      const {
        tipo,
        productoId,
        cantidad,
        sucursalOrigenId,
        sucursalDestinoId,
      } = movimientos;
      console.log(`Procesando movimiento: ${movimientos._id} - Tipo: ${tipo}`);

      if (tipo !== "entrada") {
        const origen = await Stock.findOne({
          productoId,
          sucursalId: sucursalOrigenId,
        });

        if (!origen || origen.cantidad < cantidad) {
          throw new Error("Stock insuficiente");
        }
      }

      if (tipo === "entrada" || tipo === "transferencia") {
        await Stock.findOneAndUpdate(
          { productoId, sucursalId: sucursalDestinoId },
          { $inc: { cantidad: cantidad } },
          { upsert: true },
        );
      }

      if (tipo === "salida" || tipo === "transferencia") {
        await Stock.findOneAndUpdate(
          { productoId, sucursalId: sucursalOrigenId },
          { $inc: { cantidad: -cantidad } },
        );
      }

      movimientos.estado = "processed";
      movimientos.error = null;
      await movimientos.save();
      console.log(`✅ Movimiento ${movimientos._id} completado.`);
    } catch (error) {
      movimientos.intentos += 1;
      movimientos.error = error.message;
      if (movimientos.intentos >= 2) {
        movimientos.estado = "failed";
        console.log(`❌ Movimiento ${movimientos._id} falló tras 2 intentos.`);
      } else {
        console.log(
          `⚠️ Reintentando movimiento ${movimientos._id}... (Intento ${movimientos.intentos})`,
        );
      }
      await movimientos.save();
    }
  }
};

const startWorker = () => {
  setInterval(procesarMovimientosPendientes, 5000);
  console.log("Worker de movimientos iniciado...");
};

module.exports = startWorker;
