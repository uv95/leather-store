const mongoose = require('mongoose');

const colorsSchema = new mongoose.Schema({
  leatherColor: {
    type: String,
    enum: ['черный', 'красный', 'синий'],
    default: 'черный',
  },
  threadsColor: {
    type: String,
    enum: ['черный', 'красный', 'синий'],
    default: 'черный',
  },
});

const Colors = mongoose.model('Colors', colorsSchema);

module.exports = Colors;
