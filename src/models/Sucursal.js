const mongoose = require('mongoose');
const { Schema } = mongoose;

const sucursalSchema = new Schema({
   nombre: {
          type: String,
          require: true,
         } ,

    ubicacion: {
          type: String,
          require: true,
         }      

});

const Sucursal = mongoose.model('Sucursal', sucursalSchema);
module.exports = Sucursal;