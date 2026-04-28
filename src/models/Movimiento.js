const mongoose = require('mongoose');
const { Schema } = mongoose;

const movimientoSchema = new Schema({
  tipo: { 
    type: String, 
    enum: ['entrada', 'salida', 'transferencia'], 
    required: true 
  },

  productoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Producto', 
    required: true 
  },

  cantidad: { 
    type: Number, 
    required: true,
    min: [1]
  },

  sucursalOrigenId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sucursal',
    required: function() { return this.tipo !== 'entrada'; } 
  },

  sucursalDestinoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sucursal',
    required: function() { return this.tipo !== 'salida'; } 
  },

  estado: { 
    type: String, 
    enum: ['pending', 'processed', 'failed'], 
    default: 'pending' 
  },

  intentos: { 
    type: Number, 
    default: 0 
  },

  error: { 
    type: String 
  }
}, 
{ timestamps: true });

const Movimiento = mongoose.model('Movimiento', movimientoSchema);
module.exports = Movimiento;