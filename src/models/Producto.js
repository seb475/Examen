const mongoose = required('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
    SKU: {
          type: String,
          require: true,
          unique: true
         }  ,
   nombre: {
          type: String,
          require: true,
         } ,

    precio: {
          type: String,
          require: true,
         },
   categoria: {
          type: String,
          require: true,
         }        

});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;