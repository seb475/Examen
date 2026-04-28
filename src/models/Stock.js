const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Producto', 
    required: true
  },
  sucursalId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sucursal', 
    required: true
  },
  cantidad: { 
    type: Number, 
    required: true, 
    default: 0,
    min: [0]
  }      
});

stockSchema.index({ productoId: 1, sucursalId: 1 }, { unique: true });

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;