const mongoose = require('mongoose');
const { Schema } = mongoose;

const EvasorSchema = new Schema({
  adelante: {
    type: Number,
    required: true
  },
  atras: {
    type: Number,
    required: true
  },
  izquierda: {
    type: Number,
    required: true
  },
  derecha: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Evasor', EvasorSchema);
